import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "@helpers/prisma";

// Handler to fetch all events
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  // Checking if the use is authenticated
  if (!session) {
    return res.status(401).json({
      status: "failed",
      error: "Unauthenticated",
    });
  }

  if (req.method === "GET") {
    try {
      const events = await prisma.event.findMany({
        include: { eventType: { include: { user: true } } },
        orderBy: { id: "desc" },
      });
      res.status(201).json({
        status: "ok",
        message: "success",
        data: events,
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
