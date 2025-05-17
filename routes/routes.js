import { Router } from "express";
import { saludo, toño, ping, marco } from "../controllers/controllers.js";


const router = Router();

router.get("/", saludo);
router.get("/toño", toño);
router.get("/ping", ping); 
router.get("/marco", marco);



export default router;