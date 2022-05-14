export interface AsideData {
  name: string;
  url: string;
}
export interface Item {
  alg: null | any;
  at: number;
  id: number;
  rcmdReason: string;
  sc: null | any;
  t: number;
  uid: number;
  v: number;
}
export interface audio {
  element: unknown;
  songData: songData;
  songs: any[];
}
export interface songData {
  url: string;

  playing: boolean;
  duration: number | string;
  currentTime: number | string;
  index: number;
}
