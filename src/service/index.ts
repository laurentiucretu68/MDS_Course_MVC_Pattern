import { IUser, User } from "../model";

export async function getUserById(id: string) {
    try {
        return await User.findById({ _id: id });
    } catch (err) {
        console.log(err)
    }
}

export async function getUsers() {
    try {
        return await User.find();
    } catch (err) {
        console.log(err)
    }
}

export async function addUser(data: IUser) {
    try {
        return await new User(data).save();
    } catch (err) {
        console.log(err)
    }
}

export async function deleteUserById(id: string) {
    try {
        return await User.deleteOne({ _id: id });
    } catch (err) {
        console.log(err)
    }
}

export async function updateUser(id: string, data: IUser) {
    try {
        return await User.updateOne(
            { _id: id },
            {
                $set: data
            }
        )
    } catch (err) {
        console.log(err)
    }
}