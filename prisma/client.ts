import { PrismaClient as MongoDBClient } from '@prisma-mongodb/client';
import { PrismaClient as MySQLClient } from '@prisma-mysql/client';

export const mongodb = new MongoDBClient();
export const mysql = new MySQLClient();
