import type { NextApiRequest, NextApiResponse } from 'next'
import { hasChinaInvadedTaiwan } from '@/lib/HasChinaInvadedTaiwan';
type Data = {
  hasInvaded: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const hasInvaded = await hasChinaInvadedTaiwan();
    res.status(200).json({ hasInvaded: hasInvaded })
}
