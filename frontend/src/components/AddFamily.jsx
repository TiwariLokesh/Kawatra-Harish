import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddFamily = () => {
    const [familyMember, setFamilyMember] = useState({ name: '', relation: '', age: '', patientId: '' });
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Fetch patients for the selection
        axios.get('http://localhost:5000/patients/')
            .then(response => {
                setPatients(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleChange = (e) => {
        setFamilyMember({ ...familyMember, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/patients/addFamilyMember/${familyMember.patientId}`, familyMember)
            .then(res => {
                alert('Family member added!');
                setFamilyMember({ name: '', relation: '', age: '', patientId: '' });
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="ml-64 p-4">
            <h3 className="text-2xl font-bold mb-4">Add Family Member</h3>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Patient</label>
                    <select
                        name="patientId"
                        value={familyMember.patientId}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    >
                        <option value="">Select a Patient</option>
                        {patients.map(patient => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={familyMember.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Relation</label>
                    <input
                        type="text"
                        name="relation"
                        value={familyMember.relation}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={familyMember.age}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Add Family Member
                </button>
            </form>
        </div>
    );
};

export default AddFamily;
