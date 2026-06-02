import {Router} from "express";
// you have to import thr router from the express 
import  {registerUser} from "../controller/user.controller.js"

import {upload} from "../middlewares/multer.middleware.js"

const router = Router(); // creates a mini application or the route manager 
// similar to const app = Express(); 

// this gets executed whenevver the frontend call the POST /api/v1/users/register
router.route("/register")
      .post(upload.fields([ // array of objects 
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

router.route("/login")
      .post(loginUser)   // we are using post because we are taking info
// secured routes

router.route("./logout")
      .post(verifyJWT, logoutUser)
//router.route("/login").post(registerUser);
export default router;

/*c
router is an object that contains the methods 
router.get()
router.post()
router.patch()
router.delete()
router.route()

*/