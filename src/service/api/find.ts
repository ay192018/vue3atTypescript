import $HTTP from '../index';
export const Banner = (): Promise<any> => {
  return $HTTP({
    url: '/banner',
  });
};
interface Limit {
  limit: string | number;
}
export const Recommended = (
  params: Limit,
): Promise<any> => {
  return $HTTP({
    url: '/personalized',
    params,
  });
};
interface PlaylistDetail {
  id: string | number;
  s?: number;
}
export const PlaylistDetail = (
  params: PlaylistDetail,
): Promise<any> => {
  return $HTTP({
    url: '/playlist/detail',
    params,
  });
};
interface idList {
  ids: string;
}
export const AllSongList = (
  params: idList,
): Promise<any> => {
  return $HTTP({
    url: '/song/detail',
    params,
  });
};
interface SongUrl {
  id: string | number;
}
export const SongUrl = (params: SongUrl): Promise<any> => {
  return $HTTP({
    url: '/song/url',
    params,
  });
};
interface Subscribers {
  id: number;
  limit: number;
  offset: number;
}
export const subscribers = (
  params: Subscribers,
): Promise<any> => {
  return $HTTP({
    url: '/playlist/subscribers',
    params,
  });
};
