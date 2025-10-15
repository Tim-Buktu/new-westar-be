import { app } from "./app.js";
import { env } from "./config/env.js";

const start = () => {
  app.listen(env.port, () => {
    const origins = env.allowedOrigins.join(", ");

    console.log(
      `Server ready on port ${env.port} (env: ${env.nodeEnv}) with CORS origins: ${origins}`
    );
  });
};

start();
