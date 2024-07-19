import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaInfoCircle, FaUser } from 'react-icons/fa';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/patients/')
            .then(response => {
                setPatients(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="ml-64 p-4">
            <h3 className="text-2xl font-bold mb-4">Patient List</h3>
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/4 py-2">Name</th>
                        <th className="w-1/4 py-2">Age</th>
                        <th className="w-1/4 py-2">Gender</th>
                        <th className="w-1/4 py-2">Medical History</th>
                        <th className="w-1/4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {patients.map(patient => (
                        <tr key={patient._id} className="border-b">
                            <td className="py-2 px-4">{patient.name}</td>
                            <td className="py-2 px-4">{patient.age}</td>
                            <td className="py-2 px-4">{patient.gender}</td>
                            <td className="py-2 px-4">{patient.medicalHistory}</td>
                            <td className="py-2 px-4 flex justify-around">
                                <Link to={`/edit/${patient._id}`} className="text-blue-500 hover:text-blue-700 mx-2">
                                    <FaEdit />
                                </Link>
                                <Link to={`/details/${patient._id}`} className="text-blue-500 hover:text-blue-700 mx-2">
                                    <FaInfoCircle />
                                </Link>
                                <Link to={`/profile/${patient._id}`} className="text-blue-500 hover:text-blue-700 mx-2">
                                    <FaUser />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientList;
