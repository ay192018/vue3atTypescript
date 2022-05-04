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
