import * as Router from 'koa-router'
import helloWorld from '../controllers/HelloWorld'

const router = new Router()

router.get('/', helloWorld)

export default router
