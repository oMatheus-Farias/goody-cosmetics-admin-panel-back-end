import { app } from './app';
import { env } from './configs/env';

async function main() {
  try {
    const PORT = env.PORT;

    const host = await app.listen({ port: PORT });
    console.log(`Server listening at ${host} 🚀`);
  } catch (error) {
    console.error(error);
  }
}
main();
