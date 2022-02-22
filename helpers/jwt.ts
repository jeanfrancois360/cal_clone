import jwt from 'jsonwebtoken';

export const extract_token = (header:string) => {
    if(!header || !header.startsWith('Bearer')) throw new Error('Unauthorized');
    const access_token = header.split(' ')[1];
    if(!access_token) throw new Error('Authentication token not found');
    return access_token;
}

export const encode = (payload: any, jwtSecret: any) => {
  const access_token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
  return access_token;
};

export const decode = (access_token: string, jwtSecret: any) => {
  const payload = jwt.verify(access_token, jwtSecret);
  return payload;
};
