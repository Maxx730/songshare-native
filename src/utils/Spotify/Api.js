import { AuthSession } from 'expo';
import { encode as btoa } from 'base-64';
import { SaveValue,GetValue } from '../Storage';
import { ApiRequest } from '../Network';
import Scopes from './Scopes';

//Sends a request to the Spotify API after we have gotten a auth token.
export async function SpotifyRequest(url) {
  return new Promise(async (resolve,reject) => {
    //Check if we need to refresh the token.
    await GetValue('experationTime').then(async value => {
      if(!parseInt(value) || new Date().getTime() > parseInt(value)) {
        console.log('GRABBING NEW SPOTIFY API TOKENS')
        await GetTokens(true).then(async data => {
          await SaveValue('accessToken',data.access_token);
        });
      }

        await GetValue('accessToken').then(token => {
          fetch(url,{
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then(response => {
            return response.json();
          }).then(data => {
            resolve(data);
          }).catch(err => {
            reject(err);
          });
        });
    });
  });
}

//Grab the spotify authorization code after the user grants access.
export async function GetSpotCode(username,password) {
  return new Promise(async (resolve,reject) => {
    ApiRequest(username,password,'/authorize').then(async creds => {
      await SaveValue('clientId',creds.clientId);
      await SaveValue('clientSecret',creds.clientSecret);
      await SaveValue('redirectUrl',creds.redirectUrl);

      //Here we are going to need to grab the credentials.
      const result = await AuthSession.startAsync({
        authUrl: 'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        creds.clientId +
        (Scopes ? '&scopes=' + encodeURIComponent(Scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(creds.redirectUrl)
      });

      //Save this auth code the local storage
      await SaveValue('authCode',result.params.code);

      resolve(result.params.code);
    }).catch(error => {
      reject(error);
    });
  });
}

//Grab the OAuth tokens.
//Spotify access token expires after six minutes meaning we need to refresh the tokens every six minutes.
export async function GetTokens(refresh = false) {
  return new Promise(async (resolve,reject) => {
    const clientId = await GetValue('clientId');
    const clientSec = await GetValue('clientSecret');
    const redirectUrl = await GetValue('redirectUrl');
    const refreshToken = await GetValue('refreshToken');
    const authorizationCode = await GetValue('authCode');

    const credsB64 = btoa(`${clientId}:${clientSec}`);
    await fetch(`https://accounts.spotify.com/api/token`,{
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: !refresh ? `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${redirectUrl}` : `grant_type=refresh_token&refresh_token=${refreshToken}`
    }).then(resp => {
      return resp.json();
    }).then(data => {
      resolve(data);
    }).catch(error => {
      reject(error);
    });
  });
}

//Saves the Spotify info into local storage.
export async function SaveApiInfo(data) {
  return new Promise(async (resolve,reject) => {''
      await SaveValue('accessToken',data.access_token);
      await SaveValue('refreshToken',data.refresh_token);
      await SaveValue('experationTime',(new Date().getTime() + data.expires_in * 1000).toString());

      resolve({
        RESULT: 'SUCCESS'
      })
  });
}
