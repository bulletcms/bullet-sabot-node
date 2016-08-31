import Router from 'koa-router';
import {Authenticator} from 'middleware';

const Sector = 'Config';

const authentication = Authenticator(false, ['editor']);

const config = new Router();

config
  .get('/', authentication, async (ctx, next)=>{
    const {repository} = ctx.services;
    const retrievedConfigs = await repository.retrieveSector(Sector);
    if(!retrievedConfigs){
      ctx.status = 404;
    } else {
      ctx.body = retrievedConfigs;
    }
    await next();
  })
  .get('/:configId', async (ctx, next)=>{
    const {repository} = ctx.services;
    const retrievedConfig = await repository.retrieve(Sector, ctx.params.configId);
    if(!retrievedConfig){
      ctx.status = 404;
    } else {
      ctx.body = retrievedConfig;
    }
    await next();
  })
  .post('/', authentication, async (ctx, next)=>{
    const {repository} = ctx.services;
    const storedConfig = await repository.store(Sector, ctx.request.body.configid, ctx.request.body);
    if(!storedConfig){
      ctx.status = 403;
    } else {
      ctx.body = {configid: storedConfig.configid, status: true};
    }
    await next();
  })
  .put('/:configId', authentication, async (ctx, next)=>{
    if(ctx.request.body.configid !== ctx.params.configId){
      ctx.status = 409;
    } else {
      const {repository} = ctx.services;
      const updatedConfig = await repository.update(Sector, ctx.request.body.configid, ctx.request.body);
      if(!updatedConfig){
        ctx.status = 404;
      } else {
        ctx.body = {configid: updatedConfig.configid, status: true};
      }
    }
    await next();
  })
  .del('/:configId', authentication, async (ctx, next)=>{
    if(ctx.request.body.configid !== ctx.params.configId){
      ctx.status = 409;
    } else {
      const {repository} = ctx.services;
      const removedConfig = await repository.remove(Sector, ctx.request.body.configid);
      if(!removedConfig){
        ctx.status = 404;
      } else {
        ctx.body = {configid: removedConfig.configid, status: true};
      }
    }
    await next();
  });

export {config};