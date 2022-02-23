import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma';
import { config } from 'dotenv';
import { any, number } from "joi";
import withEventValidation from '../../../middlewares/validations/with_event_validation';

config()

const add_event = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { name, email, note, date }: { name: string, email: string; note: string, date: any } = req.body;

const event: any = await prisma.event.create({
        data: {
          name, 
          email, 
          note,
          date,
        },
      });
      res.status(200).json({
        status: 'ok',
        message: 'Created successfully!',
        data: event,
      });
    } catch (error) {
      console.error("ERROR: ", error);
      return res.status(400).json({
        status: 'failed',
        error: 'Something went wrong!',
        data: error,
      });
    }
  }
};

export default add_event;