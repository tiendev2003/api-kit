const createResponse = ({
  message,
  status,
  ok = true,
  statusText = "",
  redirected = false,
  ...args
}) => {
  return { message, status, ok, statusText, redirected, ...args };
};
module.exports = { createResponse };
