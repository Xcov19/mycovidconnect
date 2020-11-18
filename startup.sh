# remove package-lock.json if present;
if [ -f "package-lock.json" ]; then rm package-lock.json; fi;
if [ -d "node_modules" ]; then rm -rf node_modules; fi;
if [ -d "~/.npm/_cacache" ]; then rm -rf ~/.npm/_cacache; fi;

# export keys to env file
echo "REACT_APP_GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY" > .env;
echo "REACT_APP_FIREBASE_API_KEY=$FIREBASE_API_KEY" >> .env;
echo "REACT_APP_FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN" >> .env;
echo "REACT_APP_FIREBASE_DB_URL=$FIREBASE_DB_URL" >> .env;
echo "REACT_APP_FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID" >> .env;
echo "REACT_APP_FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET" >> .env;
echo "REACT_APP_FIREBASE_MSG_SENDER_ID=$FIREBASE_MSG_SENDER_ID" >> .env;
echo "REACT_APP_FIREBASE_APP_ID=$FIREBASE_APP_ID" >> .env;
echo "REACT_APP_FIREBASE_MEASUREMENT_ID=$FIREBASE_MEASUREMENT_ID" >> .env;
echo "REACT_APP_COOKIEBOT_CONSENT_HEAD=$COOKIEBOT_CONSENT_HEAD" >> .env;
echo "REACT_APP_COOKIEBOT_CONSENT_DECLARATION=$COOKIEBOT_CONSENT_DECLARATION" >> .env;
echo "REACT_APP_TAWKTO=$TAWKTO" >> .env;
echo "REACT_APP_COOKIEBOT_CONSENT_HEAD_DATA_CBID=$COOKIEBOT_CONSENT_HEAD_DATA_CBID" >> .env;
