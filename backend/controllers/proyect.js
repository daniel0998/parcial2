import proyect from "../models/proyect.js";
import user from "../models/user.js";
import mail from "./mail.js";

/**
 * el array con el ultimo colaborador añadido
 */
 const addCollaborators = async (req, res) => {
  if (!req.body.email)
    return res.status(400).send({ message: "Incomplete data" });
  const findCollaborators = await user.findOne({ email: req.body.email });
  if (!findCollaborators) {
    return res.status(400).send({ message: "User no registered" });
  } else {
    const array = await proyect.findById(req.params["_id"]);
    const arrayC = array.arrayCollaborators;
    for (var i = 0; i < arrayC.length; i++) {
      const valor = arrayC[i]+"";
      if (findCollaborators._id == valor)
        return res.status(400).send({ message: "User already exist in the list" });
    }
    const collaboratorsadd = await proyect.findByIdAndUpdate(
      req.params["_id"],
      {
        $push: { arrayCollaborators: findCollaborators._id },
      }
    );

    mail.sendCollaboratorsMail(findCollaborators.email, collaboratorsadd.name);
    return res.status(200).send({ collaboratorsadd });
  }
};

const deleteCollaborators = async (req, res) => {

}

const listCollaborators = async (req, res) => {
  const findCollaborators = await proyect.findOne({ _id: req.params._id });
  let arrayColab = [];
  if (!findCollaborators) {
    return res.status(400).send({ message: "proyect no fount" });
  } else {
    for (const key of findCollaborators.arrayCollaborators) {
      const collaboratorList = await user.findOne({ _id: key });
      arrayColab.push(collaboratorList.email);
    }
    return arrayColab.length === 0
      ? res.status(400).send({ message: "Collaborators List void" })
      : res.status(200).send({ arrayColab });
  }
};

const saveProyect = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });
  const proyectSchema = new proyect({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  const result = await proyectSchema.save();
  return !result
    ? res.status(400).send({ message: "Error create proyect" })
    : res.status(200).send({ result });
};

const listProyectAdmin = async (req, res) => {
  const ProyectList = await proyect.find({ userId: req.user._id });
  return ProyectList.length === 0
    ? res.status(400).send({ message: "You have no assigned Proyect" })
    : res.status(200).send({ ProyectList });
};

const listProyectColab = async (req, res) => {
  const proyectos = await proyect.find();
  const idUsuario = req.user._id;
  let arrayProyectosColab = [];
  for (var i = 0; i < proyectos.length; i++) {
    let object = proyectos[i];
    let arrayC = object.arrayCollaborators;
    let idProC = object._id;
    for (const key of arrayC) {
      if (idUsuario == key + "") {
        const proyectColab = await proyect.find({_id: idProC})
        arrayProyectosColab.push(proyectColab[0]);
      }
    }
  }
  return arrayProyectosColab.length === 0
  ? res.status(400).send({ message: "No proyect" })
  : res.status(200).send({ arrayProyectosColab });
};

const updateProyect = async (req, res) => {
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data" });

  const proyectUpdate = await proyect.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
  });

  return !proyectUpdate
    ? res.status(400).send({ message: "Proyect not found" })
    : res.status(200).send({ proyectUpdate });
};

const deleteProyect = async (req, res) => {
  const proyectDelete = await proyect.findByIdAndDelete(req.params._id);
  return !proyectDelete
    ? res.status(400).send({ message: "Proyect not found" })
    : res.status(200).send({ message: "Proyect deleted" });
};

export default {
  saveProyect,
  listProyectAdmin,
  listProyectColab,
  updateProyect,
  deleteProyect,
  addCollaborators,
  listCollaborators,
};
