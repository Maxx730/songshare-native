import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export async function SaveValue(key,value) {
  console.log(key,value);
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
  return new Promise(async (resolve,reject) => {
    try {
      const value = await AsyncStorage.getItem(key);
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
      console.log(value);
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
      AsyncStorage.removeItem(key);
      resolve(true);
    } catch(err) {
      reject(err);
    }
  });
}

export async function SaveSecure(key,value) {
  return SecureStore.setItemAsync(key,value);
}

export async function GetSecure(key) {
  return SecureStore.getItemAsync(key);
}

export async function DeleteSecure(key) {
  return SecureStore.deleteItemAsync(key);
}
