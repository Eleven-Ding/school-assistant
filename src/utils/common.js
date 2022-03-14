export function sum(arr) {
  return arr.reduce(function (acr, cur) {
    return acr + cur;
  });
}

export function isImgage(url) {
  const reg = /\.(png|jpe?g|gif|svg)(\?.*)?$/;
  return reg.test(url);
}
