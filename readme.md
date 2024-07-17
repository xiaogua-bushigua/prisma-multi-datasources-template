- `npm init`

- `npm i @prisma/client @types/node prisma ts-node typescript`

- 新建 `index.ts`

- 修改 package.json
  
    ```
    "scripts": {
    	"start": "ts-node index.ts"
    }
    ```
    
- `npx prisma init`

- 添加 `.env` 文件的 git 忽略

- 定义模型，注意 SQL 和 NoSQL 两类区分

- 定义迁移，注意 SQL：`npx prisma migrate dev` 和 NoSQL： `npx prisma db push` 两类区分

- 创建客户端 prisma/client.ts
  
    ```tsx
    import { PrismaClient } from '@prisma/client';
    
    const prismaClientSingleton = () => {
    	return new PrismaClient();
    };
    
    declare const globalThis: {
    	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
    } & typeof global;
    
    const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
    
    export default prisma;
    
    if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
    ```
    
    **或生成客户端, 适用于多个数据库**
    
    - 需要在 schema.prisma 里规定输出路径
    
      prisma/mongodb/schema.prisma
    
      ```jsx
      generator client {
        provider = "prisma-client-js"
        output = "../../node_modules/@prisma-mongodb/client"
      }
      ```
    
    - `npx prisma format --schema prisma/mongodb/schema.prisma`
    
    - 执行生成客户端 `npx prisma generate --schema prisma/mongodb/schema.prisma`
    
    - 执行迁移 `npx prisma migrate dev --schema prisma/mongodb/schema.prisma --name initial`
    
    - prisma/client.ts
    
      ```javascript
      import { PrismaClient as PrismaClient1} from '@prisma-mongodb/client'
      import { PrismaClient as PrismaClient2} from '@prisma-mysql/client'
      
      export const mongodb = new PrismaClient1()
      export const mysql = new PrismaClient2()
      ```
    
- CRUD

    ```tsx
    import prisma from './prisma/client';
    
    async function find() {
    	try {
    		const users = await prisma.user.findMany();
    		console.log(users);
    	} catch (error) {
    		console.error('Error creating company:', error);
    	} finally {
    		await prisma.$disconnect();
    	}
    }
    
    find();
    ```