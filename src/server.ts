import { app } from './app';

async function main() {
  try {
    const host = await app.listen({ port: 8080 });
    console.log(`Server listening at ${host} 🚀`);
  } catch (error) {
    console.error(error);
  }
}

main();
