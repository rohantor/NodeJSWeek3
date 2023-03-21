
import * as express from 'express'
import { connection } from '../db'


export const ExecuteQuery = (
    res: express.Response,
    query: string
) => {
    connection.query(query, (errors, results, fields) => {
        if (errors) {
            console.log('error' + JSON.stringify(errors, null, 2))
            res.writeHead(406)

            res.write(JSON.stringify('Error ' + errors))
            res.end()
        } else {
            if (results.length == 0) {
                res.write("Content not found for specified query")
            } else {

                res.write(JSON.stringify(results))
            }
            res.end()
        }
    })
}
export const missingPropertyResponse = (res: express.Response) => {
    res.status(400) // Invalid Request
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

export const getStatusCode = () => {

    


}