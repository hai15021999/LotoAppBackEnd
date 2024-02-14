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

const generateGameCode = (excludeCodes) => {
  let d = new Date().getTime();
  const code = "xxxxxx".replace(/[x]/g, (c) => {
    const r = (d + Math.random() * 10) % 10 | 0;
    d = Math.floor(d / 10);
    return r;
  });
  if (excludeCodes.includes(code)) {
    return generateGameCode(excludeCodes);
  } else {
    return code;
  }
};

const getRandomNumer = (valuesArr) => {
  const x = Math.floor(Math.random() * 90 + 1);
  if (valuesArr.includes(x)) {
    return getRandomNumer(result);
  }
  return x;
};

export { generateUUID, getRandomNumer, generateGameCode };
