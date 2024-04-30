export { transformVKBridgeAdaptivity } from './transformVKBridgeAdaptivity';

export const timeConverter = (unixTime: number) => {
  const a = new Date(unixTime * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + (min < 10 ? `0${min}` : min);
  return time;
};
