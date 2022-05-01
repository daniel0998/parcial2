import nodemailer from "nodemailer";

const contactMail = async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  return transporter.sendMail(
    {
      from: "Remitente", // sender address
      to: "masterpiecesiesa@gmail.com", // list of receivers
      subject: "Informacion de contacto", // Subject line
      text: "Se recibe: ", // plain text body,
      html: `<body>
<table border=”0” cellpadding=”0” cellspacing=”0” width=”100%”>
 <tr>
 <td align=”center” valign=”top”>
 <table border=”0” cellpadding=”20” cellspacing=”0” width=”600”>
 <tr>
 <td align=”center” valign=”top” style=”font-family:
Arial, Helvetica, sans-serif; color: #ccc; font-size: 11px;”>
Nombre: ${req.body.name} <br>
        Correo: ${req.body.email} <br>
        Telefono: ${req.body.phone} <br>
        Mensaje: ${req.body.message} <br>
</td>
 </tr>
 </table>
 </td>
 </tr>
 </table>
<body/> `,
    },
    (err, info) => {
      if (err) res.status(200).send({ success: false, error: err });

      return res.status(200).send({
        success: true,
        messagge: "email sent!",
      });
    }
  );
};

const sendCollaboratorsMail = async (email, proyectName) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });

  return transporter.sendMail(
    {
      from: "Remitente", // sender address
      to: `${email}`, // list of receivers
      subject: `Bienvenido al proyecto  ${proyectName}`, // Subject line
      html: ` <h1>Usted ha sido asignado como colaborador al proyecto  ${proyectName} </h1>`, // plain text body,
    },
    (err, info) => {
      if (err) res.status(200).send({ success: false, error: err });

      return res.status(200).send({
        success: true,
        messagge: "email sent!",
      });
    }
  );
};

export default { contactMail, sendCollaboratorsMail };
