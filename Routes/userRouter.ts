import * as express from 'express'
import { createNewUser, getAllUsers, getByUserId, updateUserPATCH, updateUserPUT } from '../Controllers/userController'
import { connection } from '../db';
const Logger = (req: express.Request, res: express.Response, next: any) => {
    console.log("Logged")
    next()
}
const foreignKeyChecker = (req: express.Request, res: express.Response, next: any) => {

    if (Object.keys(req.body).includes('roleid')) {
        const query = `SELECT * FROM user WHERE user.id = ${req.body.roleid}`;
        connection.query(query, (error, result, field) => {
            if (error) {
                res.status(406).send(JSON.stringify('Error ' + error))
            } else {
                if (result.length == 0) {
                    res.status(400).send("roleid = " + req.body.roleid + " does not exist")

                } else {
                    next()
                    return
                }
            }
        })
    }else{
        next()
    }
    




}
const idExistsChecker = (req: express.Request, res: express.Response, next: any) => {
    console.log("Logged", req.url)
    console.log(req.params)
    const query = `SELECT * FROM user WHERE user.id = ${req.params.id}`;

    connection.query(query, (error, result, field) => {
        if (error) {
            res.status(406).send(JSON.stringify('Error ' + error))

        } else {
            if (result.length == 0) {
                res.send("Record  not found for  id = " + req.params.id)

            } else {
                console.log("Next")

                next()
            }
        }
    })


}
const router = express.Router()
router.get('/', getAllUsers)
router.get('/:id', getByUserId)
router.use(foreignKeyChecker)
router.post('/', createNewUser)
router.put('/:id', idExistsChecker, updateUserPUT)
router.patch('/:id', idExistsChecker, updateUserPATCH)


export default router

JSON.stringify