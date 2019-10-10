
export const SSRCallback = (callback) => {
  return async (req, res, next) => {
    const retval = callback(
      req,
      res,
      next,
      res.locals.urqlClient);
    if (retval) return retval;
  };
};
