'use strict';

module.exports = function (Task) {
  Task.observe('before save', function (ctx, next) {
    console.log(JSON.stringify(ctx.instance))
    next();
  });
};
