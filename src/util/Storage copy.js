
export function setUserCresentials(loginPerson) {
  const {token, userId, name, photo, lastName, level} = loginPerson;

  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('name', `${name} ${lastName}`);
  localStorage.setItem('photo', photo);
  localStorage.setItem('level', level);
};

export function logoutPersonST() {
  localStorage.setItem('token', '');
  localStorage.setItem('userId', '');
  localStorage.setItem('name', '');
  localStorage.setItem('photo', '');
  localStorage.setItem('level', 0);
}

export function getUserDataST() {
  const userId = localStorage.getItem('userId');
  console.log('=userId==========', userId)
  const data = {
    userId: false,
    photo: '',
    name: '',
    level: 0
  };
  if (userId && userId.length) {
    data.userId = userId;
    data.photo = localStorage.getItem('photo');
    data.name = localStorage.getItem('name');
    data.level = localStorage.getItem('level');
  }
  return data;
}

export function isRegisteredUserST() {
  const userId = localStorage.getItem('userId');
  return userId && userId.length ? true: false;
}

export function addNavigation(path, index) {
  const oldPath = localStorage.getItem('path');
  if(oldPath && oldPath.length > 15) {
    const oldPathArry = JSON.parse(oldPath);
    const currentPath = oldPathArry.slice(0, index)
    currentPath.push(path);
    localStorage.setItem('path', JSON.stringify( currentPath).toString());
  } else {
    localStorage.setItem('path', JSON.stringify([{name:'Eventos', uri:'/event'}]).toString());
  }
  const res = JSON.parse(localStorage.getItem('path')).slice(0, index);
  return res;
}
