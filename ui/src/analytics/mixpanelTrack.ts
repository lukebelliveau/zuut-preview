import mixpanel, { Callback, Dict, RequestOptions } from 'mixpanel-browser';

export const mixpanelTrack = (
  event_name: string,
  properties?: Dict,
  optionsOrCallback?: RequestOptions | Callback,
  callback?: Callback
) => {
  console.log('mixpanelTrack called...');
  console.log('mixpanelToken:' + process.env.REACT_APP_MIXPANEL_TOKEN);
  if (process.env.REACT_APP_MIXPANEL_TOKEN) {
    console.log('token found, calling mixpanel.track');
    mixpanel.track(event_name, properties, optionsOrCallback, callback);
  }
};
