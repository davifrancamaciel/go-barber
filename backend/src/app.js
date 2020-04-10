import espress from 'express';
import routes from './routes';

import './database'

class App {
  constructor() {
    this.server = espress();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(espress.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
