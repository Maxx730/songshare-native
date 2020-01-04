const API_KEY = 'a80365f50b3561a99e5eaf9949d58f22';
const DOMAIN = 'http://ws.audioscrobbler.com';

export function LastFmSearchTracks(searchTerm) {
  return new Promise(async (resolve,reject) => {
    await fetch(`${DOMAIN}/2.0/?method=track.search&track=${searchTerm}&api_key=${API_KEY}&format=json`).then((response) => {
      return response;
    }).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}
