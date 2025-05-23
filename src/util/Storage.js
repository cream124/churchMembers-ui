export function setUserCresentials(loginPerson) {
  const {token, _id, name, photo, lastName, level} = loginPerson;
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('userId', _id.toString());
  sessionStorage.setItem('name', `${name} ${lastName}`);
  sessionStorage.setItem('photo', photo);
  sessionStorage.setItem('level', level);
};

export function logoutPersonST() {
  sessionStorage.clear()
}

export function getUserDataST() {
  const userId = sessionStorage.getItem('userId');
  // console.log('=userId==========', userId)
  const data = {
    userId: false,
    photo: '',
    name: '',
    level: 0
  };
  if (userId && userId.length) {
    data.userId = userId;
    data.photo = sessionStorage.getItem('photo');
    data.name = sessionStorage.getItem('name');
    data.level = sessionStorage.getItem('level');
  }
  return data;
}

export function setLastPathSS(path) {
  sessionStorage.setItem('lastPath', path);
}

export function getLastPathSS() {
  return sessionStorage.getItem('lastPath');
}

export function isRegisteredUserST() {
  const userId = sessionStorage.getItem('userId');
  return userId && userId.length ? true: false;
}

export function getUserIdST() {
  return sessionStorage.getItem('userId');
}

export function addNavigation(path, index) {
  const oldPath = sessionStorage.getItem('path');
  if(oldPath && oldPath.length > 15) {
    const oldPathArry = JSON.parse(oldPath);
    const currentPath = oldPathArry.slice(0, index)
    currentPath.push(path);
    sessionStorage.setItem('path', JSON.stringify( currentPath).toString());
  } else {
    sessionStorage.setItem('path', JSON.stringify([{name:'Eventos', uri:'/event'}]).toString());
  }
  const res = JSON.parse(sessionStorage.getItem('path')).slice(0, index);
  return res;
}
