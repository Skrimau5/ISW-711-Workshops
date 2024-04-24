import React, { useState, useEffect } from 'react';
import './create.css';

function Create({ selectedCareer }) {
    const [postorpatch, setPostorpatch] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        code: ''
    });

    useEffect(() => {
        // Si hay una carrera seleccionada, establece sus datos en el estado del formulario
        if (selectedCareer) {
            setPostorpatch(1);
            setFormData({
                name: selectedCareer.name,
                description: selectedCareer.description,
                code: selectedCareer.code
            });
        }
    }, [selectedCareer]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {

        if (postorpatch === 0) {
            event.preventDefault();
            fetch('http://localhost:3001/api/careers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(newCareer => {
                    setFormData({
                        name: '',
                        description: '',
                        code: ''
                    });
                })
                .catch(error => console.error('Error:', error));
        } else {
            event.preventDefault();
            fetch(`http://localhost:3001/api/careers?id=${selectedCareer._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (response.ok) {
                        console.error('Succes to update teacher');
                    } else {
                        console.error('Failed to update teacher');
                    }
                })
                .catch(error => console.error('Error:', error));
                setPostorpatch(0);
        }
        window.location.reload();
    };

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre de la carrera:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    <label htmlFor="description">Descripcion:</label>
                    <input type="text" id="Descripcion" name="description" value={formData.description} onChange={handleInputChange} required />
                    <label htmlFor="code">ID:</label>
                    <input type="text" id="code" name="code" value={formData.code} onChange={handleInputChange} required />
                    <button type="submit">Crear/Actualizar Carrera</button>
                </form>
            </div>
        </>
    );
}

export default Create;
