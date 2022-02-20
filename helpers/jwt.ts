import jwt from 'jsonwebtoken';

export const encode = (payload: any, jwtSecret: any) => {
  const access_token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
  return access_token;
};

export const decode = (access_token: string, jwtSecret: any) => {
  const payload = jwt.verify(access_token, jwtSecret);
  return payload;
};
