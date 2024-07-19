import React, { useState } from 'react';
import axios from 'axios';

const AddPatient = () => {
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        gender: '',
        medicalHistory: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('http://localhost:5000/patients', patient)
            .then(response => {
                setMessage('Patient added successfully!');
                setPatient({
                    name: '',
                    age: '',
                    gender: '',
                    medicalHistory: '',
                });
                setLoading(false);
            })
            .catch(error => {
                setMessage('Failed to add patient.');
                setLoading(false);
            });
    };

    return (
        <div className="ml-64 p-4">
            <h3 className="text-2xl font-bold mb-4">Add Patient</h3>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={patient.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={patient.age}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={patient.gender}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicalHistory">
                        Medical History
                    </label>
                    <textarea
                        id="medicalHistory"
                        name="medicalHistory"
                        value={patient.medicalHistory}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Patient'}
                </button>
            </form>
            {message && (
                <div
                    className={`mt-4 p-2 rounded-md ${
                        message.startsWith('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default AddPatient;
