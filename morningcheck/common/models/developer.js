'use strict';

module.exports = function (Developer) {
  Developer.observe('before save', function (ctx, next) {
    console.log(JSON.stringify(ctx.instance))
    next();
  });
};
