import interests from '../api/interests.json';

export  function getAllInterests(){
    return Promise.resolve(interests);
}