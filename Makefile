format:
	(cd server && yarn format)

dev:
	docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up

prod:
	docker-compose up