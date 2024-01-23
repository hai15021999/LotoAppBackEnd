/**
 * @name generateUUID
 * @description Generates a GUID-like string, used in OData HTTP batches.
 * @returns {string} - A GUID-like string.
 */
const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
    }
  );
  return uuid;
};

const getRandomNumer = (valuesArr) => {
  let result = 0;
  if (valuesArr.length > 0) {
    let check = false;
    do {
      result = Math.floor(Math.random() * 90 + 1);
      check =
        valuesArr.filter((item) => {
          return parseInt(item) === result;
        }).length > 0;
    } while (check);
  } else {
    result = Math.floor(Math.random() * 91);
  }
  return result;
};

export { generateUUID, getRandomNumer };
