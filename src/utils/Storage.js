import { AsyncStorage } from 'react-native';

export async function SaveValue(key,value) {
  return new Promise(async (resolve,reject) => {
    try {
      AsyncStorage.setItem(key,value);
      resolve({
        STATUS: 'SAVED'
      });
    } catch(err) {
      reject(err);
    }
  });
}

export async function GetValue(key) {
  return new Promise((resolve,reject) => {
    try {
      const value = AsyncStorage.getItem(key);
      if(value !== null) {
        resolve(value);
      }
    } catch(err) {
      reject(err);
    }
  });
}

export async function HasValue(key) {
  return new Promise(async (resolve,reject) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if(value !== null) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch(err) {
      console.error(err);
      reject(err);
    }
  });
}

export function DeleteValue(key) {
  return new Promise(async (resolve,reject) => {
    try {
      await AsyncStorage.removeItem(key);
      resolve(true);
    } catch(err) {
      console.error(err);
      reject(err);
    }
  });
}
