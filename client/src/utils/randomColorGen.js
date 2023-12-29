import { colorArray } from '../constants/colorArray';

export const randomColorGenerator = () => {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
};
