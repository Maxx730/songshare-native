const base64 = require('base-64');
import { Buffer } from 'buffer';
const API_ENDPOINT = 'https://songshare.mobi';


  //Send a test request to the backend.
  export async function TestNetwork(username,password) {
    return new Promise(async (resolve,reject) => {
      await fetch(`${API_ENDPOINT}/users/`,{
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'withCredentials': true,
          'Authorization': `Basic ${new Buffer(`${username}:${password}`).toString('base64')}`,
        })
      }).then(response => {
        response.text();
      }).then(data => {
          resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  export async function CheckAccess(username,password) {
    return new Promise(async (resolve,reject) => {
        await fetch(`${API_ENDPOINT}/user/login`,{
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'withCredentials': true,
            'Authorization': `Basic ${new Buffer(`${username}:${password}`).toString('base64')}`
          })
        }).then(response => {
          return response.json();
        }).then(data => {
          resolve(data);
        }).catch(error => {
          reject(error);
        });
    });
  }
