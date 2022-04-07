import mixpanel, { Callback, Dict, RequestOptions } from 'mixpanel-browser';

export const mixpanelTrack = (
  event_name: string,
  properties?: Dict,
  optionsOrCallback?: RequestOptions | Callback,
  callback?: Callback
) => {
  if (process.env.REACT_APP_MIXPANEL_TOKEN) {
    mixpanel.track(event_name, properties, optionsOrCallback, callback);
  }
};
