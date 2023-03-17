import { FastifyInstance } from "fastify";
import { apiAddUser, apiGetUsers, apiGetUserById,
        apiDeleteUserById, apiUpdateUserById} from "../controller";

export async function userRouter(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '/user/:id',
        handler: apiGetUserById
    })

    fastify.route({
        method: 'GET',
        url: '/users',
        handler: apiGetUsers
    })

    fastify.route({
        method: 'POST',
        url: '/user',
        handler: apiAddUser
    })

    fastify.route({
        method: 'DELETE',
        url: '/user/:id',
        handler: apiDeleteUserById
    })

    fastify.route({
        method: 'PUT',
        url: '/user/:id',
        handler: apiUpdateUserById
    })
}