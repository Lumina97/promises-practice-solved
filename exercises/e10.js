export const getFirstResolvedPromise = (promises) => {
  //*  write code to pass test ⬇ ️
  return Promise.any(promises).then((result) => result);
};

export const getFirstPromiseOrFail = (promises) => {
  //*  write code to pass test ⬇ ️
  return Promise.race(promises)
    .then((result) => result)
    .catch((error) => Promise.reject(error));
};

export const getQuantityOfRejectedPromises = (promises) => {
  //*  write code to pass test ⬇ ️
  return Promise.allSettled(promises).then((results) => {
    return results.reduce((count, result) => {
      return result.status === "rejected" ? count + 1 : count;
    }, 0);
  });
};

export const getQuantityOfFulfilledPromises = (promises) => {
  //*  write code to pass test ⬇ ️
  return Promise.allSettled(promises).then((results) => {
    return results.reduce((count, result) => {
      return result.status === "fulfilled" ? count + 1 : count;
    }, 0);
  });
};

//!  ⬇ ⬇ ⬇ ⬇ Don't Edit This Array ⬇ ⬇ ⬇ ⬇
export const allCharacters = [
  { id: 1, name: "billy" },
  { id: 2, name: "mandy" },
  { id: 3, name: "grim" },
];
//! ⬆  ⬆  ⬆  ⬆ do not edit this array   ⬆  ⬆  ⬆  ⬆ ️

//!  ⬇ ⬇ ⬇ ⬇ Don't Edit This Function ⬇ ⬇ ⬇ ⬇
export const fetchCharacterById = (id) => {
  // This function simulates an API, although most api's will return
  // simple data like this quickly, we want you to practice concurrent programming
  // so we're forcing each call to take one second

  const validIds = allCharacters.map((character) => character.id);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!validIds.includes(id))
        reject(`we do not have a character with the id of ${id}`);

      return resolve(allCharacters.find((character) => character.id === id));
    }, 1000);
  });
};
//! ⬆  ⬆  ⬆  ⬆ do not edit this function   ⬆  ⬆  ⬆  ⬆ ️

export const fetchAllCharactersByIds = async (ids) => {
  // To solve this you must fetch all characters passed in the array at the same time
  // use the `fetchCharacterById` function above to make this work
  //*  write code to pass test ⬇ ️
  const promises = [];

  for (let i = 0; i < ids.length; i++) {
    promises.push(fetchCharacterById(ids[i]));
  }

  return Promise.all(promises)
    .then((result) => result)
    .catch(() => []);
};
