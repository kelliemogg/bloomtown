import { nanoid } from 'nanoid';

const neo4j = require('neo4j-driver');
  
const uri = 'neo4j+s://2f4c5155.databases.neo4j.io';
const user_name = 'neo4j';
const password = 'bRdIthreeDS4lOqC9mCpalSAOqHQeRzKZqNH4mYuetyIvtw';

const driver = neo4j.driver(uri, neo4j.auth.basic(user_name, password))
const session = driver.session()

//Create

/**
 * create - Creates a new task node.
 * @param {TBD} TBD: TBD
 * @returns: The id of the newly created task.
 */

const create = async (tbd) =>{
    const query = `CREATE (t:Task {tbd=${tbd}}) Return (id(t))`
    const result = await session.run(query)
    return result
}

//Read

/**
 * findAll - Finds the id, name, and role of all tasks.
 * @returns: The id, name, and role of all tasks.
 */

const findAll = async () =>{
    const query = `MATCH (t:Task) RETURN (t)`
    const result = await session.run(query)
    return result
}

/**
 * findById - Finds the task with the given Id.
 * @param {int} task_id: The id of the task.
 * @returns: The name and role of the task.
 */

const findById = async (task_id) =>{
    const query = `MATCH (t:Task) WHERE id(u)=${task_id} RETURN (t)`
    const result = await session.run(query)
    return result
}

/**
 * findByLocation - Finds all tasks from gardens in a specific location.
 * @param {str} location_type: The location type, state, city, or zipcode.
 * @param {str} location_value: The specific instance of the location type to
 *                              retirieve tasks from.
 * @returns: All tasks from the specified location.
 */

const findByLocation = async (location_type, location_value) =>{
    const query = (`MATCH (t:Task)-->(g:Garden) WHERE ` +
        `g.${location_type}="${location_value}" RETURN (t)`)
    const result = await session.run(query)
    return result
}

/**
 * findByStatus - Finds all tasks filtered by status.
 * @param {str} status: The status of tasks to retrieve. 
 * @returns The filtered tasks.
 */

const findByStatus = async (status = null) =>{
    const query = (status == "In progress" || status == "Completed") ? (
            `MATCH (t:Task)WHERE t.status="${status}" RETURN (t)`)
        : (`MATCH (t:Task) RETURN (t)`);
    const result = await session.run(query)
    return result
}

//Update

/**
 * update - Updates a peramater of a specified task.
 * @param {int} task_id: The id of the task.
 * @param {str} key: The name of the perameter to update.
 * @param {str} value: The new value for the perameter
 * @returns: The task updated.
 */
const update = async (task_id, key, value) =>{
    const query = `MATCH (t:Task) WHERE id(t)=${task_id} SET t.${key}="${value}" RETURN (t)`
    const result = await session.run(query)
    return result
}

//Delete

/**
 * del - Deletes a task node and all relationships conected to it.
 * @param {int} task_id: Id of task to delete.
 * @returns 
 */

const del = async (task_id) =>{
    const query = `MATCH (t:Task) WHERE id(t)=${task_id} DETACH DELETE (t)`
    const result = await session.run(query)
    return result
}

export default {
    create,
    findAll,
    findById,
    findByLocation,
    findByStatus,
    update,
    del
}
