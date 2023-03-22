
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

            res.status(getStatusCode(errors.code))

            res.write(JSON.stringify('Error ' + errors.sqlMessage))
            res.end()
        } else {
            if (results.length == 0) {
                res.write("Content not found for specified query")
            } else {

                if (Array.isArray(results)) {

                    res.write(JSON.stringify(results))
                } else {

                    res.write("Query Executed Successfully  " + results.affectedRows +
                        " rows affected")

                }

            }
            res.end()
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
        console.log(element)
        if (element === undefined) {
            return true
        }
    };
    return false
}
