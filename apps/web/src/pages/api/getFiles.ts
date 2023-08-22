import type { NextApiRequest, NextApiResponse } from 'next';
export default function getFiles(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ text: 'hello world' });
}
