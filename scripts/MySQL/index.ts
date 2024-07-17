import { mysql } from '../../prisma/client';

export const test_mysql = async () => {
	try {
		const res = await mysql.activeUsers.findMany();
		console.log(res, 'mysql');
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await mysql.$disconnect();
	}
};
