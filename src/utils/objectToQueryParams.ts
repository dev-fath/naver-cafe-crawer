export const objectToQueryParams = (obj) => {
  const keys = Object.keys(obj);
  let queryString = '';
  keys.forEach((key, i) => {
    if (i === 0) {
      queryString += `${key}=${obj[key]}`;
    } else {
      queryString += `&${key}=${obj[key]}`;
    }
  });
  return queryString;
};
