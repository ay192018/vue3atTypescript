import { defineStore } from 'pinia';
import { Name } from './config/moduleName';
export const mian = defineStore(Name.mian, {
  state: () => {
    return {
      name: 'mian',
    };
  },
});
interface theme {
  backgroundColor: string;
}
export const theme = defineStore(Name.theme, {
  state: () => {
    return {
      color: '#EC4141',
      fontSizeColor: '#fff',
    };
  },
});
interface audio {
  element: unknown;
  songData: songData;
  songs: any[];
}
interface songData {
  url: string;
  songName: string;
  singerName: string;
  picUrl: string;
  playing: boolean;
  duration: number | string;
  currentTime: number | string;
}
export const Audio = defineStore(Name.audio, {
  state: (): audio => {
    return {
      element: null,
      songData: {
        url: '',
        songName: '',
        singerName: '',
        picUrl: '',
        playing: false,
        duration: '00:00',
        currentTime: '00:00',
      },
      songs: [],
    };
  },
  actions: {
    AudioPlay() {
      console.log(1);
    },
  },
  getters: {
    ComcurrentTime(state) {
      console.log(state);
    },
  },
});
export {};
