import { nanoid } from 'nanoid';

const neo4j = require('neo4j-driver');
  
const uri = 'neo4j+s://2f4c5155.databases.neo4j.io';
const user_name = 'neo4j';
const password = 'bRdI3DS4lOqC9mCpalSAOqHQeRzKZqNH4mYuetyIvtw';

const driver = neo4j.driver(uri, neo4j.auth.basic(user_name, password))
const session = driver.session()

//Create

/**
 * createClaimed - Creates a "Claimed" relationship between a user and a task.
 * @param {str} user_id The id of the user making the claim.
 * @param {str} task_id The id of the task being claimed.
 * @returns The id of the new relationship.
 */

const createClaim = async (user_id, task_id) =>{
    const query = (`MATCH (u:User), (t.Task) ` + 
        `WHERE id(u)=${user_id} AND id(t)=${task_id} `+
        `CREATE (u)-[r:Claimed]->(t) Return (id(r))`)
    const result = await session.run(query)
    return result
}

/**
 * createLeader - Creates a "Leads" relationship between a user and garden.
 * @param {*} user_id Id of the user to make the leader.
 * @param {*} garden_id Id of the garden to assign the leader to.
 * @returns The id of the relationship created.
 */

const createLeader = async (user_id, garden_id) =>{
    const query = (`MATCH (u:User), (g.Garden) ` + 
        `WHERE id(u)=${user_id} AND id(g)=${garden_id} `+
        `CREATE (u)-[r:Leads]->(g) Return (id(r))`)
    const result = await session.run(query)
    return result
}

/**
 * createLike - Creates a "Likes" relationship between a user and garden.
 * @param {*} user_id Id of the user.
 * @param {*} garden_id Id of the garden to the user "Likes".
 * @returns The id of the relationship created.
 */

const createLike = async (user_id, garden_id) =>{
    const query = (`MATCH (u:User), (g.Garden) ` + 
        `WHERE id(u)=${user_id} AND id(g)=${garden_id} `+
        `CREATE (u)-[r:Likes]->(g) Return (id(r))`)
    const result = await session.run(query)
    return result
}

const createLocated = async (task_id, garden_id) =>{
    const query = (`MATCH (t:task), (g.Garden) ` + 
        `WHERE id(t)=${task_id} AND id(g)=${garden_id} `+
        `CREATE (t)-[r:Located]->(g) Return (id(r))`)
    const result = await session.run(query)
    return result
}

//Read

/**
 * findByID - Finds a relationship via the relationships id.
 * @param {str} r_id The id of the relationship.
 * @returns The relationship with the given id.
 */

const findById = async (r_id) =>{
    const query = `MATCH (r) WHERE id(r)=${r_id} RETURN (r)`
    const result = await session.run(query)
    return result
}

/**
 * findLeaders - Finds all Leaders.
 * @returns The id of the relationship, the id and name of all leaders, and the
 *          id and name of their gardens.
 */

const findLeaders = async () =>{
    const query = `MATCH (u:User)-[r:Leads]->(g:Garden) ` +
        `RETURN ([id(r), id(u), u.name, id(g), (g.name)])`
    const result = await session.run(query)
    return result
}

//Update

//Delete

/**
 * delByID - deletes a relationship with the given id.
 * @param {str} r_id  The relationship id.
 * @returns None
 */

const delByID = async (r_id) =>{
    const query = `MATCH (r) WHERE id(r)=${r_id} DELETE (r)`
    const result = await session.run(query)
    return result
}

/**
 * delClaim - Deletes a "Claimed" realtionship bewteen a user and a task.
 * @param {str} user_id The user claiming the task.
 * @param {str} task_id The claimed task.
 * @returns None
 */

const delClaim = async (user_id, task_id) =>{
    const query = `MATCH (u:User-[r:Claimed]->t:Task) ` +
        `WHERE id(u)=${user_id} AND id(t)=${task_id}` +
        `DELETE (r)`
    const result = await session.run(query)
    return result
}

/**
 * delLeader - Deletes a Leader relationship node and all relationships conected to it.
 * @param {int} relationship_id Id of relationship to delete.
 * @returns None
 */

const delLeader = async (user_id, garden_id) =>{
    const query = `MATCH (u:User-[r:Leads]->g:Garden) ` +
        `WHERE id(u)=${user_id} AND id(g)=${garden_id}` +
        `DELETE (r)`
    const result = await session.run(query)
    return result
}

/**
 * delLike - Deletes a "Likes" relationship between a user and a garden.
 * @param {str} user_id The id of the user.
 * @param {srt} garden_id The id of the garden.
 * @returns None
 */

const delLike = async (user_id, garden_id) =>{
    const query = `MATCH (u:User-[r:Likes]->g:Garden) ` +
        `WHERE id(u)=${user_id} AND id(g)=${garden_id}` +
        `DELETE (r)`
    const result = await session.run(query)
    return result
}

/**
 * delLocated - Deletes a "Located" relationship bewteen a task and a garden.
 * @param {str} task_id The id of the task.
 * @param {str} garden_id The id of the garden the task is located in.
 * @returns None
 */

const delLocated = async (task_id, garden_id) =>{
    const query = `MATCH (t:Task-[r:Leads]->g:Garden) ` +
        `WHERE id(t)=${task_id} AND id(g)=${garden_id}` +
        `DELETE (r)`
    const result = await session.run(query)
    return result
}

//Exports

export default {
    createClaim,
    createLeader,
    createLike,
    createLocated,
    findById,
    findLeaders,
    delByID,
    delClaim,
    delLeader,
    delLike,
    delLocated
}
