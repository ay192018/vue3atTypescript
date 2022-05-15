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

/* import { SongUrl } from '@/service/api/find';

  import { Audio } from '@/global/index';

  const { element, songData, songs } = storeToRefs(Audio());

export const playAudio = async (
  id: number,
  index: number,
  nextTick: Function,
) => {
  const { data } = await SongUrl({
    id,
  });
  if ((element.value as HTMLAudioElement).paused) {
    songData.value.index = index;
    songData.value.url = data.data[0].url;
    songData.value.songName = songs.value[index].name;
    songData.value.singerName =
      songs.value[index].ar[0].name;
    songData.value.picUrl = songs.value[index].al.picUrl;
    nextTick(() => {
      songData.value.playing = true;
      (element.value as HTMLAudioElement).play();
    });
  } else {
    songData.value.index = index;
    songData.value.url = data.data[0].url;
    songData.value.songName = songs.value[index].name;
    songData.value.singerName =
      songs.value[index].ar[0].name;
    songData.value.picUrl = songs.value[index].al.picUrl;
    nextTick(() => {
      (element.value as HTMLAudioElement).play();
    });
  }
};
 */
/* 封装Ajax */
class myAjax {
  constructor() {}
}
