import { 
  Application,
  isHttpError,
  Status, 
  Router,
  send,
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";

import makeloc from 'https://cdn.deno.land/dirname/versions/1.1.2/raw/mod.ts';

import * as path from "https://deno.land/std/path/mod.ts";

const router = new Router();

async function serveStaticContent(context: RouterContext) {
  const { __dirname } = makeloc(import.meta)
  const staticContent = path.join(__dirname, '..', 'client/dist');
  console.log('Static content: ' + staticContent);
  await send(context, context.request.url.pathname, {
    root: staticContent,
    index: "index.html",
  });
}

router
  .get('/budget/:date', (context) => {
    console.log('received');
    if (context.params && context.params.date) {
      const date = new Date(context.params.date);

      const month = date.getMonth();
      // let year = date.getFullYear();

      console.log(month);

      if (month == 11) {
        context.response.body = {
          items: {
            'a': {
              label: 'Some budget',
              value: { type: 'static', amount: 3 }
            }
          },

          transactions: {},
          borrows: {}
        }
      } else if (month == 12) {
        context.response.body = {
          items: {
            'a': {
              label: 'SOME DIFFERENT LABEL',
              value: { type: 'static', amount: 999 }
            }
          }
        }
      } else {
        context.response.body = {
          items: {},
          transactions: {},
          borrows: {}
        }
      }
    } else {
      throw Error('date is required');
    }
  })
  .get('/:file(.*\\.js.map)', serveStaticContent)
  .get('/:file(.*\\.js)', serveStaticContent)
  .get('/:file(.*\\.css)', serveStaticContent)
  .get('/:file(.*\\.css.map)', serveStaticContent)
  .get('/', serveStaticContent)

const app = new Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });