import { Analytics, PageHit, Event } from 'expo-analytics';
const analytics = new Analytics('UA-85720731-3');

export function RecordEvent(context,action,data) {
  analytics.event(new Event(context,action,data))
  .then(() => console.log("success"))
  .catch(e => console.log(e.message));
}
