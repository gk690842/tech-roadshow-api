python -c "import feedparser; f=feedparser.parse('https://www.reddit.com/r/nottheonion/rising/.rss', agent='ufd-agent/1.0'); [print('•', e.title[:70]) for e in f.entries[:5]]"

open -e test_setup.py

import os, requests, boto3, feedparser, ollama

check("Reddit RSS", lambda: [e.title[:50] for e in feedparser.parse(
    "https://www.reddit.com/r/nottheonion/rising/.rss", agent="ufd-agent/1.0").entries[:2]])

python test_setup.py

step 4:

open -e config/sources.yaml	

reddit_rss:
  - https://www.reddit.com/r/nottheonion/rising/.rss
  - https://www.reddit.com/r/interestingasfuck/rising/.rss
  - https://www.reddit.com/r/Damnthatsinteresting/rising/.rss
  - https://www.reddit.com/r/india/rising/.rss
  - https://www.reddit.com/r/worldnews/rising/.rss
  - https://www.reddit.com/r/IndiaSpeaks/rising/.rss
poll_minutes: 10
