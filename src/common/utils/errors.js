
export const fromYupErrors = (err) => {
  const errout = {};
  err.inner.forEach(inner => {
    errout[inner.path] = inner.message;
  });
  return errout;
};

export const fromGqlErrors = (err) => {
  const errout = {};
  for (var i=0;i<err.length;i=i+2) {
    errout[err[i]] = err[i+1];
  }
  return errout;
};