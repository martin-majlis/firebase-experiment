# Firebase Experiment

- frontend: https://fir-experiment-e213a.web.app/
- backend: https://us-central1-fir-experiment-e213a.cloudfunctions.net/app

## Hosting

- https://firebase.google.com/docs/hosting/quickstart
- `firebase init hosting`
-

## Frontend

- https://create-react-app.dev/docs/adding-typescript/
  - `npm uninstall -g create-react-app`
  - `npx create-react-app my-app --template typescript`

## Backend

- https://firebase.google.com/docs/functions/get-started
  - `firebase init functions`
  - `firebase init functions`
- https://blog.logrocket.com/rest-api-firebase-cloud-functions-typescript-firestore/
  - https://github.com/ebenezerdon/journal-rest-api

## Authentication

- https://github.com/firebase/functions-samples/tree/main/authenticated-json-api
- https://blog.logrocket.com/user-authentication-firebase-react-apps/

# Useful Links

- https://github.com/firebase/functions-samples/

# API

- Get all entries:
  - `curl -X GET http://localhost:5001/fir-experiment-e213a/us-central1/app/entries | jq '.'`
- Insert entry:
  - `curl -X POST -H "Content-Type: application/json" -d '{"title": "title-1", "text": "text-1"}' http://localhost:5001/fir-experiment-e213a/us-central1/app/entries | jq '.'`
  - `curl -X POST -H "Content-Type: application/json" -d '{"title": "title-4", "text": "text-4"}' http://localhost:5001/fir-experiment-e213a/us-central1/app/entries | jq '.'`
- Get entry:
  - `curl -X GET http://localhost:5001/fir-experiment-e213a/us-central1/app/entries/2o9QK5CNMu27Z01hrD8u | jq '.'`
- Update entry:
  - `curl -X PATCH -H "Content-Type: application/json" -d '{"title": "text-10", "text": "text-10"}' http://localhost:5001/fir-experiment-e213a/us-central1/app/entries/2o9QK5CNMu27Z01hrD8u`
