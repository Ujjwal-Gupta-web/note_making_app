const logger=require('../utility/logger')

const loggerMiddleware=((req, res, next) => {
    logger.info(`Received a ${req.method} request for ${req.originalUrl}`);
    next();
  });

  module.exports=loggerMiddleware;