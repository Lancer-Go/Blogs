'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const checkToken = app.middleware.checkToken();
  router.post('/blog', checkToken, controller.upart.uploadFn);
  router.post('/goLogin', controller.login.loginFn);
  router.post('/goRegistry', controller.registry.registryFn);
};
