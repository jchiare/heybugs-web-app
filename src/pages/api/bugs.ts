import { prisma } from '../../server/db/client';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getBugsByStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method?.toLowerCase() !== 'get') {
    return res.status(405).json({ error: 'expect get http request' });
  }
  const { status } = req.query;

  if (Array.isArray(status)) {
    return res
      .status(400)
      .json({ error: 'status query param should be string' });
  }

  const bugs = await prisma.bug.findMany({
    where: {
      organizationId: 1,
      status,
    },
    include: {
      ProductArea: true,
    },
  });

  res.status(200).json(bugs);
}
