import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getAllByType(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method?.toLowerCase() !== 'get') {
    return res.status(405).json({ error: 'expect get http request' });
  }
  res.status(200).json('get all bugs by type');
}
