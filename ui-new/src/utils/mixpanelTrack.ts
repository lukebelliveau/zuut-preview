import mixpanel from 'mixpanel-browser';

const mixpanelTrack = (eventName: string, properties: { [key: string]: any }) => {
  // if (process.env.NODE_ENV === 'production') {
  console.log('ahh');
  mixpanel.track(eventName, properties);
  // }
};

export default mixpanelTrack;
