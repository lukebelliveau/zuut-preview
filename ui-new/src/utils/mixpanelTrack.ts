import mixpanel from 'mixpanel-browser';
import { mixpanelTracking } from 'src';

const mixpanelTrack = (eventName: string, properties: { [key: string]: any }) => {
  if (mixpanelTracking) {
    mixpanel.track(eventName, properties);
  }
};

export default mixpanelTrack;
