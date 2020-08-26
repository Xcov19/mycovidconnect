/**
 * Repeats a given string a certain number of times.
 *
 * @param {string} text - Text to repeat
 * @param {number} count - Number of times
 * @returns {Array.<number|string>} - Returns a repeated string
 */
const repeatStr = (text, count) => {
  return Array(count + 1).join(text);
};

const getAuth = () => {
  const isLoggedIn = window.localStorage.isLoggedIn
    ? JSON.parse(window.localStorage.isLoggedIn)
    : false;

  return {
    isLoggedIn,
  };
};

const getAuthData = () => {
  return {
    isLoggedIn: window.localStorage.getItem("isLoggedIn"),
  };
};

const getWindowSize = () => {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHei;

  return {
    width: x,
    height: y,
  };
};

export { getAuth, getAuthData, getWindowSize, repeatStr };
