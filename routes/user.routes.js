import { Router } from "express";
import { getUsers, postUser, putUser, deleteUser, loginUser } from "../controllers/user.controllers.js";

const router = Router();

router.get("/users/:id", getUsers);
router.post("/users", postUser);
router.put("/users", putUser);
router.delete("/users/:id", deleteUser);
router.post("/login", loginUser);


export default router;