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
  process.on('uncaughtException', function (err) {//捕获uncaughtException，暂未了解透彻
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack)
  });
};
