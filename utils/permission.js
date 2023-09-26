const checkPermission = (userId, userInfo) => {
  if (userInfo.role === "admin" || userId === userInfo.userId) return true;
  return false;
};

module.exports = {
  checkPermission,
};
