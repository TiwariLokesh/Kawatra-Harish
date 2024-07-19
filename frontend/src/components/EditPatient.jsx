import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditPatient = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        medicalHistory: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/patients/${id}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/patients/update/${id}`, formData)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    };

    return (
        <div className="container mx-auto p-4">
            <h3 className="text-2xl font-bold mb-4">Edit Patient</h3>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={onChange} className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div>
                    <label className="block text-gray-700">Age:</label>
                    <input type="number" name="age" value={formData.age} onChange={onChange} className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div>
                    <label className="block text-gray-700">Gender:</label>
                    <input type="text" name="gender" value={formData.gender} onChange={onChange} className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div>
                    <label className="block text-gray-700">Medical History:</label>
                    <textarea name="medicalHistory" value={formData.medicalHistory} onChange={onChange} className="w-full px-4 py-2 border rounded-md"></textarea>
                </div>
                <div>
                    <input type="submit" value="Update Patient" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700" />
                </div>
            </form>
        </div>
    );
};

export default EditPatient;
