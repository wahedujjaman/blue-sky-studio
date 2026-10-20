# worker.py - Blue Sky Studio Kaggle Worker
# No Token in Code! Token will be in Kaggle Secrets!
import os
import time
import json
import requests

# Token গুলো Kaggle Secrets থেকে আসবে
UPSTASH_URL = os.environ.get("UPSTASH_REDIS_REST_URL")
UPSTASH_TOKEN = os.environ.get("UPSTASH_REDIS_REST_TOKEN")

def get_job_from_queue():
    try:
        url = f"{UPSTASH_URL}/rpop/blue-sky-queue"
        headers = {"Authorization": f"Bearer {UPSTASH_TOKEN}"}
        r = requests.get(url, headers=headers, timeout=10)
        result = r.json().get('result')
        if result:
            return json.loads(result)
    except Exception as e:
        print(f"Queue Error: {e}")
    return None

def update_job(job_id, status, video_url=""):
    try:
        headers = {"Authorization": f"Bearer {UPSTASH_TOKEN}", "Content-Type": "application/json"}
        # Get old job
        get_url = f"{UPSTASH_URL}/get/job:{job_id}"
        old = requests.get(get_url, headers=headers).json().get('result')
        if old:
            job = json.loads(old)
            job['status'] = status
            if video_url:
                job['videoUrl'] = video_url
            # Save new
            requests.post(f"{UPSTASH_URL}", headers=headers, json=["SET", f"job:{job_id}", json.dumps(job)])
            print(f"Updated {job_id} -> {status}")
    except Exception as e:
        print(f"Update Error: {e}")

print("🔥 Blue Sky Worker Started! Waiting for jobs in blue-sky-queue...")
while True:
    job = get_job_from_queue()
    if job:
        job_id = job.get('id')
        prompt = job.get('prompt')
        print(f"🚀 NEW JOB: {job_id} | Prompt: {prompt}")
        update_job(job_id, "processing")
        
        # ===== এখানে তোমার ComfyUI Video Generation Code বসবে ভাই =====
        # এখন Test এর জন্য 10 sec wait করছি
        time.sleep(10) 
        fake_video_url = "https://example.com/video.mp4"
        # =================================================================
        
        update_job(job_id, "completed", fake_video_url)
        print(f"✅ DONE: {job_id}")
    else:
        print("...No job, waiting 5s")
        time.sleep(5)
