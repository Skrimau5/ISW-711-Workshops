require('dotenv').config();
const jwt = require('jsonwebtoken');
const Career = require("./models/careerModel");
const Course = require("./models/courseModel");
const Teacher = require("./models/teacherModel");
const express = require('express');
const { graphqlHTTP } = require('express-graphql'); 
const { buildSchema } = require('graphql');
const app = express();
const cors = require('cors'); // Importar el módulo CORS

const schema = buildSchema(`
  type Teacher {
    first_name: String
    last_name: String!
    cedula: String!
    age: Int!
    _id:ID!
  }
  
  type Course {
    _id: ID!
    name: String!
    credits: Int!
    teacher: Teacher!
  }

  type Career {
    _id: ID!
    name: String!
    description: String!
    code: String!
    courses: [Course]!
  }

  type Query {
    careers(name: String): [Career]!
  }
`);

const root = {
  careers: async ({ name }) => {
    try {
      // Si se proporciona un nombre, filtra las carreras por coincidencia en el nombre
      const filter = name ? { name: { $regex: name, $options: 'i' } } : {};
      const careers = await Career.find(filter); 
      
      // Para cada carrera encontrada, busca los cursos asociados y popula los datos del profesor
      const populatedCareers = await Promise.all(careers.map(async (career) => {
        const populatedCareer = career.toObject();
        populatedCareer.courses = await Course.find({ career: career._id }).populate('teacher');
        return populatedCareer;
      }));

      return populatedCareers;
    } catch (error) {
      throw new Error('Error al obtener las carreras: ' + error.message);
    }
  }
};

app.use(cors()); // Permitir solicitudes desde cualquier origen

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, 
}));

const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.listen(3001, () => {
  console.log('Servidor GraphQL en ejecución en http://localhost:3001/graphql');
});
