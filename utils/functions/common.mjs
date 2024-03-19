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

const getRandomNumerV1 = (valuesArr) => {
  const x = Math.floor(Math.random() * 90 + 1);
  if (valuesArr.includes(x)) {
    return getRandomNumer(valuesArr);
  }
  return x;
};

const getRandomNumer = (valuesArr) => {
  if (valuesArr.length === 0) {
    return {
      number: -1,
      box: [],
    };
  }
  const box = shuffleArray(valuesArr);
  const number = box[1];
  box.shift();
  return {
    number: number,
    box: box,
  };
};

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements at i and j indices
  }
  return arr;
};

export { generateUUID, getRandomNumer, generateGameCode };
