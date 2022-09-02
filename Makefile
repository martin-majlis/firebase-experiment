login:
	firebase login

backend-build:
	cd functions; \
	npm run build

backend-deploy:
	firebase deploy --only functions

backend-emulator-init:
	firebase init emulators

backend-emulator-start:
	firebase emulators:start

frontend-run:
	npm start

frontend-build:
	npm run build

frontend-deploy:
	firebase deploy --only hosting


pre-commit-run-all:
	pre-commit run -a -v

pre-commit-install:
	pre-commit install
