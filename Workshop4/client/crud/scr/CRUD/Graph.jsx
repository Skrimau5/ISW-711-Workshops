import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

// Define la consulta GraphQL
const GET_CAREERS = gql`
  query GetCareers($name: String) {
    careers(name: $name) {
      name
      courses {
        name
        teacher {
          _id
          first_name
        }
      }
    }
  }
`;

// Componente React que realiza la consulta GraphQL y muestra el resultado
function Graph() {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para almacenar el término de búsqueda

  const { loading, error, data, refetch } = useQuery(GET_CAREERS, {
    variables: { name: searchTerm }, // Utiliza el término de búsqueda como variable
  });

  const handleSearch = () => {
    refetch(); // Vuelve a ejecutar la consulta con el nuevo término de búsqueda
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado con el valor del campo de texto
          placeholder="Enter career name" 
        />
        <button onClick={handleSearch}>Search</button> {/* Botón para realizar la búsqueda */}
      </div>
      {data.careers.map(career => (
        <div key={career.name}>
          <h2>{career.name}</h2>
          {career.courses.map(course => (
            <div key={course.name}>
              <h3>{course.name}</h3>
              <p>Teacher: {course.teacher.first_name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Graph;
