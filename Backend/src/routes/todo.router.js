import { Router } from "express";

import authenticate from "../Middlewares/authenticate.js";
import { addToDo, removeToDo, showAllToDo, updateToDo } from "../Controllers/todo.controller.js";

const todoRouter=Router();

todoRouter.post("/create",authenticate,addToDo);
todoRouter.delete("/delete/:id",authenticate,removeToDo);
todoRouter.get("/show",authenticate,showAllToDo);
todoRouter.post("/update/:id",authenticate,updateToDo);

export default todoRouter;