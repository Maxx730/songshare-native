import { AuthSession } from 'expo';
import { encode as btoa } from 'base-64';
import { SaveValue } from '../Storage';

//Grab the spotify authorization code after the user grants access.
export async function GetSpotCode(secrets,scopes) {
  try {
    const result = await AuthSession.startAsync({
      authUrl: 'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      secrets.clientId +
      (scopes ? '&scopes=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(secrets.redirectUrl)
    });
    return result.params.code;
  } catch (error) {
    return error
  }
}

//Grab the OAuth tokens.
export async function GetTokens(credentials,authorizationCode) {
  return new Promise(async (resolve,reject) => {
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    await fetch(`https://accounts.spotify.com/api/token`,{
      method: 'POST',
      headers: {
        Authorization: `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${credentials.redirectUrl}`
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

}
