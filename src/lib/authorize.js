export const authorizeRoles = (userRole, allowedRoles = []) => {
  if (!allowedRoles.includes(userRole)) {
    return {
      error: "Access denied",
      status: 403,
    };
  }

  return { allowed: true };
};
