import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const eventTypes = await prisma.eventType.findMany({
      orderBy: { id: "desc" },
      include: { user: true, events: true },
    });
    res.status(200).json({
      status: "success",
      message: "Fetched successfully",
      data: eventTypes,
    });
  }
};

export default handler;
