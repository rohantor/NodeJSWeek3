
import * as express from 'express'
import { connection } from '../db'
import { isArray } from 'util';


export const getStatusCode = (code: string) => {
    switch (code) {

        case "ER_DUP_ENTRY":
            return 409
            break;
        case "ER_BAD_NULL_ERROR":
            return 422
            break;
        default:
            return 400;
    }

}
export const ExecuteQuery = (
    res: express.Response,
    query: string,
) => {
    connection.query(query, (errors, results, fields) => {
        if (errors) {
            console.log('error' + JSON.stringify(errors, null, 2))

            res.status(getStatusCode(errors.code)).send(JSON.stringify('Error ' + errors.sqlMessage))
           
        } else {
            if (results.length == 0) {
                res.status(200).send("Content not found for specified query")
            } else {

                if (Array.isArray(results)) {

                    res.send(JSON.stringify(results))
                } else {

                    res.send("Query Executed Successfully  " + results.affectedRows +
                        " rows affected")

                }

            }
           
        }
    })
}
export const missingPropertyResponse = (res: express.Response) => {
    res.status(getStatusCode("Bad Request")) // Invalid Request
    res.write('error:' + 'parameters are  missing')
    res.end()
}
export const missingPropertyChecker = (array: any[]) => {
    for (let element of array) {
     
        if (element === undefined) {
            return true
        }
    };
    return false
}
