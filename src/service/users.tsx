import users from '../api/users.json';

export  function getAllUsers(){
    return Promise.resolve(users);
}