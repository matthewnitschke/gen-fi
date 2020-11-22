build:
	(cd client && yarn build)

serve:
	deno run --allow-net --allow-read server/app.ts