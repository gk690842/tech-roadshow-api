step 1:

CODE=$(python3 -c "import sys,urllib.parse as u; print(u.parse_qs(u.urlparse(sys.argv[1]).query)['code'][0])" "$URL")

step 2:

echo "Code length: ${#CODE}"; echo "App ID: $APP_ID"; echo "Secret length: ${#APP_SECRET}"

step 3:

curl -s -G "https://graph.facebook.com/v25.0/oauth/access_token" --data-urlencode "client_id=$APP_ID" --data-urlencode "client_secret=$APP_SECRET" --data-urlencode "redirect_uri=https://www.google.com/" --data-urlencode "code=$CODE"
