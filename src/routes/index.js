import Router from 'koa-router';

import {users} from './users';
import {pages} from './pages';
import {config} from './config';
import {login} from './login';

const api = new Router();

api
  .use('/users', users.routes(), users.allowedMethods())
  .use('/pages', pages.routes(), pages.allowedMethods())
  .use('/config', config.routes(), config.allowedMethods())
  .use('/login', login.routes(), login.allowedMethods());

export default api;
