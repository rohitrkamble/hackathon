'use strict';

module.exports = function (Task) {
  Task.observe('before save', function (ctx, next) {
    ctx.instance.time = new Date()
    if (ctx.options.accessToken) ctx.instance.submitBy = ctx.options.accessToken.userId
    next();
  });
};
