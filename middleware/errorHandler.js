const { CustomApiError } = require("./../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) return res.status(err.statusCode).json({ message: err.messsage });
  return res.status(500).json({ message: 'Something went wrong, please try again' });
};

modules.exports = errorHandlerMiddleware;
