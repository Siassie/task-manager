const sendMissingFieldError = (res, fieldName) => {
  return res.status(400).json({
    error: true,
    message: `${fieldName} is required`,
  });
};

module.exposes = { sendMissingFieldError };