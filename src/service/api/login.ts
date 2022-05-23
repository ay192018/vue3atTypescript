import $HTTP from '../index';
export const QrCode = (): Promise<any> => {
  return $HTTP({
    url: '/login/qr/key',
  });
};
type CreateQrCode = {
  key: string;
  qrimg: boolean;
};
export const CreateQrCode = (
  params: CreateQrCode,
): Promise<any> => {
  return $HTTP({
    url: '/login/qr/create',
    params,
  });
};
type QrCodeStatus = {
  key: string;
  timerstamp: number;
};
export const QrCodeStatus = (
  params: QrCodeStatus,
): Promise<any> => {
  return $HTTP({
    url: '/login/qr/check',
    params,
  });
};

export const refreshStatus = (): Promise<any> => {
  return $HTTP({
    url: '/login/refresh',
  });
};

type loginStatus = {
  timerstamp: number;
  cookie: string;
};
export const loginStatus = (
  params: loginStatus,
): Promise<any> => {
  return $HTTP({
    url: '/login/status',
    params,
  });
};
type login = {
  phone: string;
  password: string;
};
export const Login = (params: login): Promise<any> => {
  return $HTTP({
    url: '/login/cellphone',
    params,
  });
};
