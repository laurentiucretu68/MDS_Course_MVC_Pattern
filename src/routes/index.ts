import { FastifyInstance } from "fastify";
import { apiAddUser, apiGetUsers, apiGetUserById,
        apiDeleteUserById, apiUpdateUserById} from "../controller";
import { userSchema } from "../model"

export async function userRouter(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '/user/:id',
        handler: apiGetUserById,
        schema: {
            params: {
                id: { type: 'string' }
            }
        }
    })

    fastify.route({
        method: 'GET',
        url: '/users',
        handler: apiGetUsers
    })

    fastify.route({
        method: 'POST',
        url: '/user',
        handler: apiAddUser,
        schema: {
            body: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    age: { type: "number" },
                    phoneNumber: { type: "string" }
                },
                required: ["name", "email", "age", "phoneNumber"],
                additionalProperties: false
            },
        }
    })

    fastify.route({
        method: 'DELETE',
        url: '/user/:id',
        handler: apiDeleteUserById,
        schema: {
            params: {
                id: { type: 'string' }
            }
        }
    })

    fastify.route({
        method: 'PUT',
        url: '/user/:id',
        handler: apiUpdateUserById,
        schema: {
            params: {
                type: "object",
                properties: {
                    id: {type: 'string'}
                }
            },
            body: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    age: { type: "number" },
                    phoneNumber: { type: "string" }
                },
                additionalProperties: false
            },
        }
    })
}