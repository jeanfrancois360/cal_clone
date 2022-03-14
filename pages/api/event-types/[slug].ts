import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { slug } = req.query;
    const eventType = await prisma.eventType.findUnique({
      where: { slug: String(slug) },
      include: { user: true, events: true },
    });
    if (eventType === null) {
      return res.status(404).json({
        status: "failed",
        error: "Invalid EventType",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Fetched successfully",
      data: eventType,
    });
  }
};

export default handler;
