import "dotenv/config";
import Fastify, { FastifyInstance } from "fastify";
import { userRouter } from "./src/routes";
import { connectToDatabase, closeDatabaseConnection} from "./src/model";
import cors from "@fastify/cors";

const fastify: FastifyInstance = Fastify({
    logger: true
});

(async () => {
   try {
       await connectToDatabase()
       await fastify.register(cors)

       await fastify.register(require('@fastify/swagger'))
       await fastify.register(require('@fastify/swagger-ui'), {
           routePrefix: '/documentation',
           uiConfig: {
               docExpansion: 'full',
               deepLinking: false,
           },
           staticCSP: true,
           transformStaticCSP: (header: any) => header,
           transformSpecification: (swaggerObject: any, req: any, res: any) => { return swaggerObject },
           transformSpecificationClone: true
       })

       await fastify.register(userRouter);

       fastify.addHook('onClose', async () => {
           await closeDatabaseConnection()
       })

       await fastify.listen({
           port: Number(process.env.port),
           host: process.env.host
       })

   } catch (error) {
       console.error(error)
       process.exit(1);
   }
})()