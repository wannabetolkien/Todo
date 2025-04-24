import Task from "../models/taskModel.js"; // Fixed path
import User from "../models/UserModel.js"; // Fixed path and case sensitivity
import taskValidator from "../validators/taskValidator.js"; // Fixed path and spelling

export async function addToDo(req, res) {
    try {
        const { title, description, completed } = req.body;

        const zodValidationOfTask = taskValidator.safeParse({ title, description, completed });

        if (!zodValidationOfTask.success) {
            return res.status(400).json({ message: "Invalid Input Format!", error: zodValidationOfTask.error.errors });
        }

        const ownerOfTheTask = await User.findById(req.user._id);
        if (!ownerOfTheTask) {
            return res.status(404).json({ message: "User not found!" });
        }

        const newToDo = await Task.create({ title, description, completed });
        ownerOfTheTask.tasks.push(newToDo._id);
        await ownerOfTheTask.save();

        return res.status(200).json({ message: "Todo added!", task: newToDo });
    } catch (err) {
        console.error("Error: ", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function removeToDo(req,res){
    try{
        const {id}=req.params;

        const taskToDelete=await Task.findById(id.toString());
        if(!taskToDelete) return res.status(400).json({message:"Task doesn't exist"});

        const {email}=req.user;
        const userToDeleteTaskFrom=await User.findOne({email});
        userToDeleteTaskFrom.tasks=userToDeleteTaskFrom.tasks.filter(todoId=> id!==todoId.toString());
        await userToDeleteTaskFrom.save()

        await Task.findByIdAndDelete(id.toString());

        return res.status(200).json({message:"Task has been removed !"});
    }
    catch(err){
        console.error("Error : ",err);
        return res.status(500).json({message:"Internal Server Error !"});
    }
}
export async function showAllToDo(req, res) {
    try {
        const { email } = req.user;
        const userFromDB = await User.findOne({ email }).populate("tasks"); // Fixed `Task` to `tasks`

        if (!userFromDB) return res.status(400).json({ message: "User doesn't exist!" }); // Fixed variable name

        return res.status(200).json({ tasks: userFromDB.tasks }); // Fixed response key
    } catch (err) {
        console.error("Error: ", err);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function updateToDo(req, res) {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const taskToUpdate = await Task.findById(id.toString()); 

        if (!taskToUpdate) {
            return res.status(400).json({ message: "Task doesn't exist!" });
        }

        taskToUpdate.title = title || taskToUpdate.title;
        taskToUpdate.description = description || taskToUpdate.description;
        taskToUpdate.completed = completed !== undefined ? completed : taskToUpdate.completed;

        await taskToUpdate.save();

        return res.status(200).json({ message: "Todo has been updated!" });
    } catch (err) {
        console.error("Error: ", err);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

