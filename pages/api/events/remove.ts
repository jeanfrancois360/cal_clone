import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      const deleteEvent = await prisma.event.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({
        status: "ok",
        message: "Canceled successfully!",
        data: deleteEvent,
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
