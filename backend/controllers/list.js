import list from "../models/list.js";
import fs from "fs";
import path from "path";
import moment from "moment";

const saveList = async (req, res) => {
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data" });

  const listSchema = new list({
    proyectId: req.params['_id'],
    name: req.body.name,
  });

  const result = await listSchema.save();
  return !result
    ? res.status(400).send({ message: "Error registering task" })
    : res.status(200).send({ result });
};

const updateList = async (req, res) => {
    if (!req.body._id)
      return res.status(400).send({ message: "Incomplete data" });
  
    const listUpdate = await list.findByIdAndUpdate(req.body._id, {name: req.body.name});
  
    return !listUpdate
      ? res.status(400).send({ message: "List not found" })
      : res.status(200).send({ message: "List updated" });
  };

  const listList = async (req, res) => {
    const listaList = await list.find({proyectId: req.params['_id']});
    return listaList.length === 0
      ? res.status(400).send({ message: "You have no assigned list" })
      : res.status(200).send({ listaList });
  };

  const deleteList = async (req, res) => {
    const listDelete = await list.deleteMany({_id: req.params['_id']})
    return !listDelete
      ? res.status(400).send({ message: "List no found" })
      : res.status(200).send({ message: "List deleted" });
  };

export default { saveList, updateList, listList, deleteList};
