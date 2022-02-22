import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma';
import { config } from 'dotenv';

config()

const add_event = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
     const events: any = await prisma.event.findMany({
      orderBy: { 
        id: 'desc',
      },
      })
      res.status(201).json({
        status: 'ok',
        message: 'success',
        data: events,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'Something went wrong!',
        data: error,
      });
    }
  }
};

export default add_event