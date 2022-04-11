require('dotenv').config()
const neo4j = require('neo4j-driver');
const driver = neo4j.driver(
    process.env.URI,
    neo4j.auth.basic(process.env.USER_NAME, process.env.PASSWORD)
)
const session = driver.session()

//Create

/**
 * create - Creates a new task node and located relationship.
 * @param {str} garden_id The id of the garden where the task will be located.
 * @param {str} description Description of the new task.
 * @param {str} due_date Date the new task is due to expire.
 * @returns: The id of the newly created task.
 */

 const create = async (garden_id, description, due_date) =>{
    const query = (`MATCH (g:Garden) WHERE id(g)=${garden_id} ` +
        `CREATE (t:Task {description: "${description}", ` +
        `due_date: "${due_date}", completion_date: "null", status: "open"})` +
        `-[r:Located]->(g) Return (id(t))`)
    const result = await session.run(query)
    return result
}

//Read

/**
 * findAll - Finds the id, name, and role of all tasks.
 * @returns: The id, due_date, description, status, and completion_date of all tasks.
 */

const findAll = async () =>{
    const query = `MATCH (t:Task)-->(g:Garden) RETURN ([t, g])`
    const result = await session.run(query)
    return result
}

/**
 * findById - Finds the task with the given id.
 * @param {int} task_id: The id of the task.
 * @returns: The id, due_date, description, status. and completion_date of the
 *           task.
 */

const findById = async (task_id) =>{
    const query = `MATCH (t:Task)-->(g:Garden) WHERE id(t)=${task_id} RETURN ([t, g])`
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
        `g.${location_type}="${location_value}" RETURN ([t, g])`)
    const result = await session.run(query)
    return result
}

/**
 * findByStatus - Finds all tasks filtered by status.
 * @param {str} status: The status of tasks to retrieve. 
 * @returns The id, due_date, description, status. and completion_date
 *          of the filtered tasks.
 */

const findByStatus = async (status = null) =>{
    const query = (status == "open" || status == "complete" ||
        status == "claimed") ? (
            `MATCH (t:Task)-->(g:Garden) WHERE t.status="${status}" RETURN ([t, g])`
            )
        : (status == "current") ? (
            `MATCH (t:Task)-->(g:Garden) WHERE t.status="open" OR ` +
            `t.status="claimed" RETURN ([t, g])`
            )
        : (`MATCH (t:Task)-->(g:Garden) RETURN ([t, g])`);
    const result = await session.run(query)
    return result
}

//Update

/**
 * update - Updates a peramater of a specified task.
 * @param {int} task_id: The id of the task.
 * @param {str} key: The name of the perameter to update.
 * @param {str} value: The new value for the perameter
 * @returns: The id, due_date, description, status. and completion_date of
 *           the task updated.
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
 * @returns None
 */

const del = async (task_id) =>{
    const query = `MATCH (t:Task) WHERE id(t)=${task_id} DETACH DELETE (t)`
    const result = await session.run(query)
    return result
}

//Exports

export default {
    create,
    findAll,
    findById,
    findByLocation,
    findByStatus,
    update,
    del
}
