import { IUser } from "../model"
import {FastifyReply, FastifyRequest} from "fastify";
import {getUserById, getUsers, addUser,
    deleteUserById, updateUser} from "../service";

export async function apiGetUserById(req: FastifyRequest<{ Params: { id: string }}>, res: FastifyReply) {
    try {
        const { id } = req.params;
        const User = await getUserById(id);
        res.send(User)
    } catch (err) {
        res.send({
            error: err
        })
    }
    return res
}

export async function apiGetUsers(req: FastifyRequest, res: FastifyReply) {
    try {
        const users = await getUsers();
        if (!users) {
            res.send({
                error: "no user found"
            })
        } else {
            res.send(users)
        }
    } catch (err) {
        res.send({
            error: err
        })
    }
    return res
}

export async function apiAddUser(req: FastifyRequest<{ Body: IUser }>, res: FastifyReply) {
    try {
        const user =  await addUser(req.body);
        res.send(user)
    } catch (err) {
        res.send({
            error: err
        })
    }
    return res
}

export async function apiDeleteUserById(req: FastifyRequest<{ Params: { id: string }}>, res: FastifyReply) {
    try {
        const { id } = req.params;
        const status = await deleteUserById(id);

        if (!status) {
            res.send({
                error: "user not found"
            })
        } else {
            res.send(status)
        }
    } catch (err) {
        res.send({
            error: err
        })
    }
    return res
}

export async function apiUpdateUserById(req: FastifyRequest<{ Params: { id: string }, Body: IUser}>, res: FastifyReply) {
    try {
        const { id } = req.params;
        const status = await updateUser(id, req.body);

        if (!status) {
            res.send({
                error: "user not found"
            })
        } else {
            res.send(status)
        }
    } catch (err) {
        res.send({
            error: err
        })
    }
    return res
}