import mixpanel, { Callback, Dict, RequestOptions } from 'mixpanel-browser';

export const mixpanelTrack = (
  event_name: string,
  properties?: Dict,
  optionsOrCallback?: RequestOptions | Callback,
  callback?: Callback
) => {
  if (process.env.NODE_ENV !== 'test') {
    mixpanel.track(
      event_name,
      {
        ...properties,
        node_env: process.env.NODE_ENV,
      },
      optionsOrCallback,
      callback
    );
  }
};
