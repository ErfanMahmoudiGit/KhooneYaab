import Cookies from 'js-cookie';

const cookieService = {
  // Set a cookie
  setCookie: (name, value, options = {}) => {
    Cookies.set(name, value, { ...options });
  },

  // Get a cookie
  getCookie: (name) => {
    return Cookies.get(name);
  },

  // Remove a cookie
  removeCookie: (name) => {
    Cookies.remove(name);
  }
};

export default cookieService;