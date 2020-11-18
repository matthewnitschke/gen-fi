import { Application } from 'deps.ts';

const app = new Application();

app.use((ctx) => {
  ctx.response.body = { hey: 'heyheyhey' }
});

await app.listen({ port: 8000 });