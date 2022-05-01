import task from "../models/task.js";
import fs from "fs";
import path from "path";
import moment from "moment";

const saveTask = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  const taskSchema = new task({
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
    imageUrl: "",
    listId: req.params['_id'],
  });

  const result = await taskSchema.save();
  return !result
    ? res.status(400).send({ message: "Error registering task" })
    : res.status(200).send({ result });
};

const saveTaskImg = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  let imageUrl = "";
  if (Object.keys(req.files).length === 0) {
    imageUrl = "";
  } else {
    if (req.files.image) {
      if (req.files.image.type != null) {
        const url = req.protocol + "://" + req.get("host") + "/";
        const serverImg =
          "./uploads/" + moment().unix() + path.extname(req.files.image.path);
        fs.createReadStream(req.files.image.path).pipe(
          fs.createWriteStream(serverImg)
        );
        imageUrl =
          url +
          "uploads/" +
          moment().unix() +
          path.extname(req.files.image.path);
      }
    }
  }

  const taskSchema = new task({
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
    imageUrl: imageUrl,
    listId: req.body.listId,
  });

  const result = await taskSchema.save();
  if (!result)
    return res.status(400).send({ message: "Error registering task" });
  return res.status(200).send({ result });
};

const listTask = async (req, res) => {
  const taskList = await task.find({ listId: req.params["_id"] });
  return taskList.length === 0
    ? res.status(400).send({ message: "You have no assigned tasks" })
    : res.status(200).send({ taskList });
};

const updateTask = async (req, res) => {
  if (!req.body._id || !req.body.taskStatus)
    return res.status(400).send({ message: "Incomplete data" });

  const taskUpdate = await task.findByIdAndUpdate(req.body._id, {
    taskStatus: req.body.taskStatus,
  });

  return !taskUpdate
    ? res.status(400).send({ message: "Task not found" })
    : res.status(200).send({ message: "Task updated" });
};

const deleteTask = async (req, res) => {
  let taskImg = await task.findById({ _id: req.params["_id"] });
  let serverImg= '';
  

  if (taskImg != null){ 
  taskImg = taskImg.imageUrl;
  taskImg = taskImg.split("/")[4];
  serverImg = "./uploads/" + taskImg;
  
  
  const taskDelete = await task.findByIdAndDelete({ _id: req.params["_id"] });
  if (!taskDelete) return res.status(400).send({ message: "Task not found" });

  try {
    if (taskImg) fs.unlinkSync(serverImg);
    return res.status(200).send({ message: "Task deleted" });
  } catch (e) {
    console.log("Image no found in server");
  }
 }
};

const findTask = async (req,res) => {
  let taskFind = await task.findById({_id: req.params['_id']})
  return !taskFind
    ? res.status(400).send({ message: "Task not found" })
    : res.status(200).send({ taskFind });
}

export default { saveTask, saveTaskImg, listTask, updateTask, deleteTask, findTask };
