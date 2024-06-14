import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Handle GET request
        res.status(200).json({ message: 'GET request handled' });
    } else if (req.method === 'POST') {
        // Handle POST request
        res.status(200).json({ message: 'POST request handled' });
    } else {
        // Handle other request methods
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}