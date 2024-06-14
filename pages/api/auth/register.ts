import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, password, dealer } = req.body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the new user with the appropriate role
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: dealer === 'yes' ? 'DEALER' : 'USER',
        } as Prisma.UserCreateInput,
    });

    // Create a new session
    const session = await prisma.session.create({
        data: {
            user: {
                connect: { id: user.id },
            },
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            sessionToken: require('crypto').randomBytes(32).toString('hex'),
        },
    });

    console.log(session);

    // Send the session in the response
    return res.status(201).json({ session });
}
