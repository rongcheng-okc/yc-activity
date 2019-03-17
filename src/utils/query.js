export function getQueryObj(urlString) {
  let obj = {};
  let objSafe = {
      userId: '15757172660',
      activityId: '1299',
      date: '20190318'
  }
  if (!urlString) return objSafe;
  let arr1 = urlString.split('?');
  if (arr1.length === 1) return objSafe;
  let arr2 = arr1[1].split('&');
  for (let i = 0; i < arr2.length; i++) {
    let res = arr2[i].split('=');
    obj[res[0]] = res[1];
  }
  return obj;
}
