import { AsyncStorage } from 'react-native';

export async function SaveValue(key,value) {
  try {
    await AsyncStorage.setItem(key,value);
  } catch(err) {
    console.log(err);
  }
}

export async function GetValue(key) {
  try {
    const value = AsyncStorage.getItem(key);
    if(value !== null) {
      return value;
    }
  } catch(err) {
    console.log(err);
  }
}
