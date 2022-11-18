import mixpanel from 'mixpanel-browser';

const mixpanelTracking = true;

const mixpanelTrack = (
  eventName: string,
  properties: { [key: string]: any }
) => {
  if (mixpanelTracking) {
    mixpanel.track(eventName, properties);
  }
};

export default mixpanelTrack;
