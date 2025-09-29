import type { NextApiRequest, NextApiResponse } from 'next';

import { createHandler } from '@/lib/api/handler';

const handler = createHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.APP_ENV !== 'test') {
    return res
      .status(401)
      .json({ message: 'endpoint only available in test environment' });
  }
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid revalidation token' });
  }

  await res.unstable_revalidate('/shows');
  await res.unstable_revalidate('/bands');
  return res.status(200).end();
});

export default handler;
