const Cred = require("../models/Credential");
const { Op } = require("sequelize");

// Verify Patient
function verifyPatient(req, res, next) {
  Cred.findOne({
    where: {
      [Op.or]: [
        {
          email: req.userLogger,
          instLinker: req.body.instLinker,
          patient: 1,
          deleted: 0,
        },
        {
          contact: req.userLogger,
          instLinker: req.body.instLinker,
          patient: 1,
          deleted: 0,
        },
      ],
    },
  })
    .then((cred) =>
      cred ? ((req.credLinker = cred.linker), next()) : res.sendStatus(403)
    )
    .catch((err) => res.sendStatus(403));
}

module.exports = verifyPatient;
