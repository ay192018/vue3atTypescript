import { defineStore } from 'pinia';
import { Name } from './config/moduleName';
import type { audio } from '@/types/index';
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

export const Audio = defineStore(Name.audio, {
  state: (): audio => {
    return {
      element: null,
      songData: {
        url: '',
        playing: false,
        duration: '00:00',
        currentTime: '00:00',
        index: 0,
      },
      songs: [],
    };
  },
  actions: {
    AudioPlay() {
      console.log(this);
    },
  },
  getters: {},
});
export {};
