import { nanoid } from 'nanoid';
require('dotenv').config()
const neo4j = require('neo4j-driver');
const driver = neo4j.driver(
    process.env.URI,
    neo4j.auth.basic(process.env.USER_NAME, process.env.PASSWORD)
)
const session = driver.session()

//Create

/**
 * create - Creates a new User node.
 * @param {str} email: Email associated with user.
 * @param {str} password: User's hashed password.
 * @param {sr} name: User's name.
 * @param {str} role: User's role
 * @returns: The id of the newly created user.
 */

 const create = async (email, password, name, role) =>{
    const query = (`CREATE (u:User {email: "${email}", password: "${password}",` +
    ` name: "${name}", role: "${role}"}) Return (id(u))`)
    const result = await session.run(query)
    return result
}

//Read

/**
 * findAll - Finds the id, name, and role of all users.
 * @returns: The id, name, and role of all users.
 */

const findAll = async () =>{
    const query = `MATCH (u:User) RETURN ([id(u), u.name, u.role])`
    const result = await session.run(query)
    return result
}

/**
 * findById - Finds the User with the given Id.
 * @param {int} user_id: The id of the user.
 * @returns: The name and role of the user.
 */

const findById = async (user_id) =>{
    const query = `MATCH (u:User) WHERE id(u)=${user_id} RETURN ([u.name, u.role])`
    const result = await session.run(query)
    return result
}

/**
 * findLeads - Finds the gardens a user leads.
 * @param {str} user_id 
 * @returns 
 */

const findLeads = async (user_id) =>{
    const query = `MATCH (u:User)-[r:Leads]->(g:Garden) WHERE id(u)=${user_id} RETURN (g)`
    const result = await session.run(query)
    return result
}

/**
 * findFavorates - Finds all the gardens favorated by the speceifed user.
 * @param {int} user_id: The id of the user.
 * @returns: All gardens favorated by specified user.
 */

const findFavorites = async (user_id) =>{
    const query = `MATCH (u:User)-->(g:Garden) WHERE id(u)=${user_id} RETURN (g)`
    const result = await session.run(query)
    return result
}

/**
 * findFavoratesTasks - Finds all the tasks of all the favorate gardens of the
 *                      specified user filtered by status.
 * @param {int} user_id: The id of the user.
 * @param {str} status: The type of tasks to return. Returns all tasks if null.
 *                      Defaults to null.
 * @returns: All tasks from all favorate gardens of the sepcified user filtered
 *           by status.
 */

const findFavoritesTasks = async (user_id, status = null) =>{
    const query = (status == "open" || status == "claimed" ||
            status == "complete") ? (`MATCH (t:Task)-->(g:Garden)<--(u:User)` +
            ` WHERE id(u)=${user_id} AND t.status="${status}" RETURN (t)`)
        : (status == "current") ? (`MATCH (t:Task)-->(g:Garden)<--(u:User) ` +
            `WHERE id(u)=${user_id} AND (t.status="open" OR ` +
            `t.status="claimed") RETURN (t)`)
        : (`MATCH (t:Task)-->(g:Garden)<--(u:User) WHERE ` +
            `id(u)=${user_id} RETURN (t)`);
    const result = await session.run(query)
    return result
}

/**
 * findTasks - Finds tasks claimed by the user filtered by status
 * @param {int} user_id: The id of the user.
 * @param {str} status: The status of tasks to retrieve. Returns both complete
 *                      and claimed tasks if null. Defaults to null.
 * @returns: Tasks related to the specified user with the statuses selected.
 */

 const findTasks = async (user_id, status = null) =>{
    const query = (status == "claimed" || status == "complete") ? (
            `MATCH (u:User)-->(t:Task) WHERE id(u)=${user_id} AND ` +
            `t.status="${status}" RETURN (t)`)
        : (`MATCH (u:User)-->(t:Task) WHERE ` +
            `id(u)=${user_id} RETURN (t)`);
    const result = await session.run(query)
    return result
}

//Update

/**
 * update - Updates a peramater of a specified user.
 * @param {int} user_id: The id of the user.
 * @param {str} key: The name of the perameter to update.
 * @param {str} value: The new value for the perameter
 * @returns: The user updated.
 */
const update = async (user_id, key, value) =>{
    const query = `MATCH (u:User) WHERE id(u)=${user_id} SET u.${key}="${value}" RETURN (u)`
    const result = await session.run(query)
    return result
}

//Delete

/**
 * del - Deletes a usernode and all relationships conected to it.
 * @param {int} user_id: Id of user to delete.
 * @returns 
 */

const del = async (user_id) =>{
    const query = `MATCH (u:User) WHERE id(u)=${user_id} DETACH DELETE (u)`
    const result = await session.run(query)
    return result
}

//Exports

export default {
    create,
    findAll,
    findById,
    findLeads,
    findFavorites,
    findFavoritesTasks,
    findTasks,
    update,
    del
}
