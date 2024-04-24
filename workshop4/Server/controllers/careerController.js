const Career = require("../models/careerModel");

/**
 * Creates a career
 *
 * @param {*} req
 * @param {*} res
 */
const careerPost=(req,res)=>{
    let career = new Career();
    career.name=req.body.name;
    career.description=req.body.description;
    career.code=req.body.code;

    if(career.name && career.description && career.code){
        career.save(function (err) {
            if (err) {
              res.status(422);
              console.log('error while saving the career', err);
              res.json({
                error: 'There was an error saving the career'
              });
            }
            res.status(201); // CREATED
            res.header({
              'location': `/api/careers/?id=${career.id}`
            });
            res.json(career);
          });
        } else {
            res.status(422);
            console.log('error while saving the career')
            res.json({
              error: 'No valid data provided for career'
            });
          }
};

/**
 * Get all careers
 *
 * @param {*} req
 * @param {*} res
 */

const careerGet = (req, res) => {
  if (req.query && req.query.id) {
    Career.findById(req.query.id, function (err, career) {
      if (err) {
        res.status(404);
        console.log('error while querying the career', err);
        res.json({ error: "Career doesn't exist" });
      } else {
        // Aquí puedes establecer los encabezados que desees
        res.set('Content-Type', 'application/json');
        res.json(career);
      }
    });
  } else {
    // Obtener todas las carreras
    Career.find(function (err, careers) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      } else {
        // Aquí puedes establecer los encabezados que desees
        res.set('Content-Type', 'application/json');
        // Enviar el encabezado de autorización
        const token = req.headers.authorization;
        if (token) {
          res.set('Authorization', `Bearer ${token}`);
        }
        res.json(careers);
      }
    });
  }
};


  /**
 * Updates a career
 *
 * @param {*} req
 * @param {*} res
 */
const careerPatch = (req, res) => {
    // get career by id
    if (req.query && req.query.id) {
      Career.findById(req.query.id, function (err, career) {
        if (err) {
          res.status(404);
          console.log('error while queryting the career', err)
          res.json({ error: "Career doesnt exist" })
        }
  
        // update the career object (patch)
        career.name = req.body.name ? req.body.name : career.name;
        career.description = req.body.description ? req.body.description : career.description;
        career.code = req.body.code ? req.body.code : career.code;
        // update career object (put)
  
        career.save(function (err) {
          if (err) {
            res.status(422);
            console.log('error while saving the career', err)
            res.json({
              error: 'There was an error saving the career'
            });
          }
          res.status(200); // OK
          res.json(career);
        });
      });
    } else {
      res.status(404);
      res.json({ error: "Career doesnt exist" })
    }
  };
  
  /**
   * Deletes a career
   *
   * @param {*} req
   * @param {*} res
   */
   const careerDelete = (req, res) => {
    // get career by id
    if (req.query && req.query.id) {
        Career.findById(req.query.id, function (err, career) {
        if (err) {
          res.status(404);
          console.log('error while queryting the career', err)
          res.json({ error: "career doesnt exist" })
        }
  
        career.deleteOne(function (err) {
          if (err) {
            res.status(422);
            console.log('error while deleting the career', err)
            res.json({
              error: 'There was an error deleting the career'
            });
          }
          res.status(204); //No content
          res.json({});
        });
      });
    } else {
      res.status(404);
      res.json({ error: "career doesnt exist" })
    }
  };
  
  module.exports = {
    careerGet,
    careerPost,
    careerPatch,
    careerDelete
  }