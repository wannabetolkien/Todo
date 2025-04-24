import Todo from "/models/taskModel.js"
import User from "/models/userModel.js"
import taskValidator from "/validatos/taskValidator.js"

async function addToDo(req, res) {
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

        const newToDo = await Todo.create({ title, description, completed });
        ownerOfTheTask.tasks.push(newToDo._id);
        await ownerOfTheTask.save();

        return res.status(200).json({ message: "Todo added!", task: newToDo });
    } catch (err) {
        console.error("Error: ", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function removeToDo(req,res){
    try{
        const {id}=req.params;

        const taskToDelete=await Task.findById(id);
        if(!taskToDelete) return res.status(400).json({message:"Task doesn't exist"});

        const {email}=req.user;
        const userToDeleteTaskFrom=await User.findOne({email});
        userToDeleteTaskFrom.tasks=userToDeleteTaskFrom.tasks.filter(taskId=> id!==taskId.toString());
        await userToDeleteTaskFrom.save()

        await Task.findByIdAndDelete(id);

        return res.status(200).json({message:"Task has been removed !"});
    }
    catch(err){
        console.error("Error : ",err);
        return res.status(500).json({message:"Internal Server Error !"});
    }
}
