import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

import { encode } from '../../../helpers/jwt';
import prisma from '../../../lib/prisma';
import withSignInValidation from '../../../middlewares/validations/with_signin_validation';

config();

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      const checkUser: any = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      const checkPassword = bcrypt.compareSync(password, checkUser.password);

      if (!checkUser || !checkPassword) {
        return res.status(401).json({
          status: 'failed',
          error: 'unauthorized',
          data: {},
        });
      }

      const access_token = encode(checkUser, process.env.JWT_SECRET);

      delete checkUser.password;

      res.status(200).json({
        status: 'ok',
        message: 'Logged in successfully!',
        access_token,
        data: checkUser,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'Invalid credentials',
        data: error,
      });
    }
  }
};

export default withSignInValidation(signIn);
