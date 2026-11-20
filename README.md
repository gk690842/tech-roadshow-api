python -c "
import feedparser, requests
UA={'User-Agent':'Mozilla/5.0 (Macintosh) Chrome/124.0'}
for u in ['https://trends.google.com/trending/rss?geo=IN',
          'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',
          'https://news.google.com/rss/search?q=bizarre+OR+weird+OR+viral&hl=en-IN&gl=IN&ceid=IN:en',
          'https://feeds.bbci.co.uk/news/world/rss.xml',
          'https://feeds.feedburner.com/ndtvnews-top-stories',
          'https://hnrss.org/frontpage']:
    try:
        f=feedparser.parse(requests.get(u,headers=UA,timeout=15).content)
        print('✅' if f.entries else '❌', len(f.entries), 'items -', u[:60])
    except Exception as e: print('❌', u[:60], e)
"
