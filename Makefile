# build:
# 	(cd client && yarn build)

# serve:
# 	# deno run --allow-net --allow-read server/app.ts
# 	(cd server-v2 && yarn serve)

format:
	(cd server && yarn format)

dev:
	docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up

prod:
	docker-compose up