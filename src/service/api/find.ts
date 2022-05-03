import $HTTP from '../index';
export const Banner = (): Promise<any> => {
  return $HTTP({
    url: '/banner',
  });
};
interface Limit {
  limit: string | number;
}
export const Recommended = (params: Limit): Promise<any> => {
  return $HTTP({
    url: '/personalized',
    params,
  });
};
interface PlaylistDetail {
  id: string | number;
  s?: number;
}
export const PlaylistDetail = (params: PlaylistDetail): Promise<any> => {
  return $HTTP({
    url: '/playlist/detail',
    params,
  });
};
