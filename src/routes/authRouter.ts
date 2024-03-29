import express,{Router} from "express"
import authController from "../controllers/User/authController"
import protect from "../middleware/authMiddleware"
const router:Router = express.Router()

router.post('/signup',authController.postRegister)
router.post('/login',authController.postLogin)
router.post('/change-password',protect,authController.changePassword)
router.post('/google-login',authController.googleLogin)
export default router