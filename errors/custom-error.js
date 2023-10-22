class CustomApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (status, message) => {
  return new CustomApiError(status, message);
};

module.exports = { createCustomError, CustomApiError };
