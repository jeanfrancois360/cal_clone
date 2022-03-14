import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { date, time, name, email, attendees, eventType: id, note } = req.body;

      const eventType = await prisma.eventType.findUnique({
        where: { id: Number(id) },
        include: { user: true },
      });

      if (eventType === null) {
        return res.status(404).json({
          status: "failed",
          error: "Invalid EventType",
        });
      }

      const event: any = await prisma.event.create({
        data: {
          name,
          email,
          attendees,
          date: new Date(date),
          time,
          note,
          eventTypeId: Number(id),
        },
      });
      res.status(200).json({
        status: "ok",
        message: "Created successfully!",
        data: event,
      });
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        error: "Something went wrong!",
        data: error,
      });
    }
  }
};

export default handler;
