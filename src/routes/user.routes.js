import {Router} from "express";
import  {registerUser} from "../controller/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1,
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser)   // we are using post because we are taking info
// secured routes

router.route("./logout").post(verifyJWT, logoutUser)
//router.route("/login").post(registerUser);
export default router;

