// 过滤数字
export const count = (num: number) => {
  if (num > 100000000) {
    return (num / 100000000).toFixed(0) + '亿';
  } else if (num > 10000) {
    return (num / 10000).toFixed(0) + '万';
  } else {
    return num;
  }
};
// 过滤 时间戳
export const time = (time: string) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? 0 : ''}${month}-${
    day < 10 ? 0 : ''
  }${day} `;
};

export const formatTime = (time: number) => {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);
  return `${minute}:${second < 10 ? 0 : ''}${second}`;
};
/* 节流 */
export const throttle = (fn: Function, delay: number) => {
  let timer: NodeJS.Timer | null = null;
  return (...arg: any[]) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn().apply(this, arg);
        timer = null;
      }, delay);
    }
  };
};
/* 毫秒级转换成00:00格式 */
export const formatTime2 = (time: number): string => {
  return `${
    Math.floor(time / 1000 / 60) < 10 ? 0 : ''
  }${Math.floor(time / 1000 / 60)}:${
    (Math.floor(time / 1000) / 60 -
      Math.floor(Math.floor(time / 1000) / 60)) *
      60 <
    10
      ? 0
      : ''
  }${(
    (Math.floor(time / 1000) / 60 -
      Math.floor(Math.floor(time / 1000) / 60)) *
    60
  ).toFixed(0)}`;
};
