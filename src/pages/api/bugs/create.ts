import type { NextApiRequest, NextApiResponse } from 'next';

export default async function createBug(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method?.toLowerCase() !== 'post') {
    return res.status(405).json({ error: 'expect post http request' });
  }
  res.status(200).json('create bug');
}
