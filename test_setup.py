import os, requests, boto3, feedparser, ollama
from dotenv import load_dotenv

load_dotenv()
E = os.getenv
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"}


def check(name, fn):
    try:
        print(f"✅ {name}: {fn()}")
    except Exception as e:
        print(f"❌ {name}: {e}")


def instagram():
    host = E("IG_GRAPH_HOST") or "https://graph.facebook.com/v25.0"
    r = requests.get(f"{host}/{E('IG_USER_ID')}",
                     params={"fields": "username,name", "access_token": E("IG_ACCESS_TOKEN")},
                     timeout=20).json()
    if "error" in r:
        raise Exception(r["error"].get("message"))
    return r


def r2():
    s3 = boto3.client("s3",
                      endpoint_url=f"https://{E('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com",
                      aws_access_key_id=E("R2_ACCESS_KEY"),
                      aws_secret_access_key=E("R2_SECRET_KEY"),
                      region_name="auto")
    s3.put_object(Bucket=E("R2_BUCKET"), Key="test.txt", Body=b"UFD OK")
    return requests.get(f"{E('R2_PUBLIC_URL').rstrip('/')}/test.txt", timeout=20).text


def google_trends():
    f = feedparser.parse(requests.get("https://trends.google.com/trending/rss?geo=IN",
                                      headers=UA, timeout=20).content)
    return [e.title for e in f.entries[:3]]


def telegram():
    r = requests.post(f"https://api.telegram.org/bot{E('TELEGRAM_BOT_TOKEN')}/sendMessage",
                      data={"chat_id": E("TELEGRAM_CHAT_ID"), "text": "🌍 UFD Agent connected ✅"},
                      timeout=20).json()
    if not r.get("ok"):
        raise Exception(r.get("description"))
    return "Message sent to your phone"


def youtube():
    r = requests.get("https://www.googleapis.com/youtube/v3/videos",
                     params={"part": "snippet", "chart": "mostPopular", "regionCode": "IN",
                             "maxResults": 2, "key": E("YOUTUBE_API_KEY")},
                     timeout=20).json()
    if "error" in r:
        raise Exception(r["error"].get("message"))
    return [v["snippet"]["title"][:50] for v in r["items"]]


def ai():
    return ollama.chat(model=E("OLLAMA_MODEL") or "llama3.2:3b",
                       messages=[{"role": "user", "content": "Reply with exactly: UFD ready"}])["message"]["content"]


check("Instagram", instagram)
check("Cloudflare R2", r2)
check("Google Trends", google_trends)
check("Telegram", telegram)
check("YouTube", youtube)
check("Ollama", ai)
