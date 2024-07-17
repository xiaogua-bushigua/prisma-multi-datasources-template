import { mongodb } from '../../prisma/client';

export const test_mongodb = async () => {
	try {
		const res = await mongodb.visit.findMany();
		console.log(res, 'mongodb');
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await mongodb.$disconnect();
	}
};
