LONG=$(curl -s -G "https://graph.facebook.com/v25.0/oauth/access_token" --data-urlencode "grant_type=fb_exchange_token" --data-urlencode "client_id=$APP_ID" --data-urlencode "client_secret=$APP_SECRET" --data-urlencode "fb_exchange_token=$SHORT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('access_token') or d)")

echo "${LONG:0:10}... length ${#LONG}"

curl -s -G "https://graph.facebook.com/v25.0/me/accounts" --data-urlencode "fields=name,access_token,instagram_business_account{id,username}" --data-urlencode "access_token=$LONG" | python3 -m json.tool
