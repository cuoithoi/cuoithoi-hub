// // add user

// export const addUserToLocalStorage = (user) => {
//   localStorage.setItem('user', JSON.stringify(user))
// }

// // remove user
// export const removeUserFromLocalStorage = () => {
//   localStorage.removeItem('user')
// }

// // get user
// export const getUserFromLocalStorage = () => {
//   const result = localStorage.getItem('user')
//   const user = result ? JSON.parse(result) : null
//   return user
// }

// // get  token
// export const getLocalAccessToken = () => {
//   const user = getUserFromLocalStorage()
//   if (!user) return null
//   return user?.token
// }
// export const getLocalRefreshToken = () => {
//   const user = getUserFromLocalStorage()
//   return user.tokens.refreshToken
// }

// export const updateLocalAccessToken = (newAccessToken) => {
//   const user = getUserFromLocalStorage()
//   user.tokens.accessToken = newAccessToken
//   addUserToLocalStorage(user)
// }

// export const getItemFromLocalStorage = (item) => {
//   const result = localStorage.getItem(item)
//   const data = result ? JSON.parse(result) : null
//   return data
// }

// add user

export const addUserToLocalStorage = (user) => {
  setStorage('user', JSON.stringify(user), 86400)
}

// remove user
export const removeUserFromLocalStorage = () => {
  removeStorage('user')
}

// get user
export const getUserFromLocalStorage = () => {
  return getStorage('user')
}

// get  token
export const getLocalAccessToken = () => {
  const user = getUserFromLocalStorage()
  if (!user) return null
  return user?.token
}
export const getLocalRefreshToken = () => {
  const user = getUserFromLocalStorage()
  return user.tokens.refreshToken
}

export const updateLocalAccessToken = (newAccessToken) => {
  const user = getUserFromLocalStorage()
  user.tokens.accessToken = newAccessToken
  addUserToLocalStorage(user)
}

export const getItemFromLocalStorage = (item) => {
  return getStorage(item)
}

export function removeStorage(name) {
  try {
      localStorage.removeItem(name);
      localStorage.removeItem(name + '_expiresIn');
  } catch(e) {
      console.log('removeStorage: Error removing key ['+ name + '] from localStorage: ' + JSON.stringify(e) );
      return false;
  }
  return true;
}

export function getStorage(key) {

  var now = Date.now();  //epoch time, lets deal only with integer
  // set expiration for storage
  var expiresIn = localStorage.getItem(key+'_expiresIn');
  if (expiresIn===undefined || expiresIn===null) { expiresIn = 0; }

  if (expiresIn < now) {// Expired
      removeStorage(key);
      return null;
  } else {
      try {
          var value = localStorage.getItem(key);
          var result = value ? JSON.parse(value) : null
          return result;
      } catch(e) {
          console.log('getStorage: Error reading key ['+ key + '] from localStorage: ' + JSON.stringify(e) );
          return null;
      }
  }
}

export function setStorage(key, value, expires) {

  if (expires===undefined || expires===null) {
      expires = (24*60*60);  // default: seconds for 1 day
  } else {
      expires = Math.abs(expires); //make sure it's positive
  }

  var now = Date.now();  //millisecs since epoch time, lets deal only with integer
  var schedule = now + expires*1000; 
  try {
      localStorage.setItem(key, value);
      localStorage.setItem(key + '_expiresIn', schedule);
  } catch(e) {
      console.log('setStorage: Error setting key ['+ key + '] in localStorage: ' + JSON.stringify(e) );
      return false;
  }
  return true;
}