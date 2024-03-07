// const express = require('express');
// const app = express();
// // database connection
// const mongoose = require("mongoose");
// const db = mongoose.connect("mongodb://localhost:27017/teachers");

// // parser for the request body (required for the POST and PUT methods)
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

// // check for cors
// const cors = require("cors");
// const { teacherGet, teacherPost, teacherPatch, teacherDelete } = require('./controllers/teacherController');
// app.use(cors({
//   domains: '*',
//   methods: "*"
// }));


// // listen to the task request
// app.get("/api/teachers/",teacherGet);
// app.post("/api/teachers", teacherPost);
// app.patch("/api/teachers", teacherPatch);
// app.put("/api/teachers", teacherPatch);
// app.delete("/api/teachers", teacherDelete);


// app.listen(3001, () => console.log(`Example app listening on port 3001!`))
const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost:27017/careers");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
const { careerGet, careerPost, careerPatch, careerDelete } = require('./controllers/careerController');
app.use(cors({
  domains: '*',
  methods: "*"
}));


// listen to the task request
app.get("/api/careers/",careerGet);
app.post("/api/careers", careerPost);
app.patch("/api/careers", careerPatch);
app.put("/api/careers", careerPatch);
app.delete("/api/careers", careerDelete);


app.listen(3001, () => console.log(`Example app listening on port 3001!`))
// const career = new Schema({
//   name: { type: String },
//   description: { type: String }
// });

