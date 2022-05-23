import $HTTP from '../index';
export const searchDefault = (): Promise<any> => {
  return $HTTP({
    url: '/search/default',
  });
};
