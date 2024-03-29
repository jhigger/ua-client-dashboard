import prisma from '../../../lib/prisma';

export default async (req, res) => {
	try {
		if (req.method === 'GET') {
			// Process a GET request
			const result = await prisma.submission.findMany({
				include: {status: true}
			});
			res.status(200).json(result);
		} else {
			// Handle any other HTTP method
			res.status(200).json({name: 'Hello, world!'});
		}
	} catch (error) {
		res.status(500).json(error);
	}
};
