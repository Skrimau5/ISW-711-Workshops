import React, { useState, useEffect } from 'react';
import './read.css';
import Create from '../Create/Create';
const Read = () => {
    const [careers, setCareers] = useState([]);
    const [selectedCareer, setSelectedCareer] = useState(null);

    useEffect(() => {
        fetchCareers();
    }, []);

    const handleDelete = async (id) => {
        fetch(`http://localhost:3001/api/careers?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setCareers(careers.filter(item => item._id !== id));
                } else {
                    console.error('Failed to delete career');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const handleUpdate = async (id) => {
        const careerToUpdate = careers.find(career => career._id === id);
        setSelectedCareer(careerToUpdate);
    };

    const fetchCareers = () => {
        fetch('http://localhost:3001/api/careers')
            .then(response => response.json())
            .then(careersData => setCareers(careersData))
            .catch(error => console.error('Error:', error));
    };
    console.log(careers);
    return (
        <>
            <ul>
                {careers.map(career => (
                    <li key={career._id}>
                        <h1>Nombre de la carrera: {career.name}</h1>
                        <h2>Descripción: {career.description}</h2>
                        <h2>Código: {career.code}</h2>
                         {/* <button onClick={() => handleDelete(career._id)}>Eliminar</button> */}
                         {/* <button onClick={() => handleUpdate(career._id)}>Modificar</button> */}
                    </li>
                ))}
            </ul> 
            {!selectedCareer && <Create />}
            {selectedCareer && <Create selectedCareer={selectedCareer} />}
        </>
    );
}

export default Read;
