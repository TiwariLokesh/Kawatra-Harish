import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const PatientProfile = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/patients/${id}`)
            .then(response => {
                setPatient(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            axios.delete(`http://localhost:5000/patients/${id}`)
                .then(() => {
                    alert('Patient deleted successfully');
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="ml-64 p-4">
            {patient ? (
                <>
                    <h3 className="text-2xl font-bold mb-4">{patient.name}'s Profile</h3>
                    <div className="bg-white p-4 rounded-md shadow-md mb-8">
                        <h4 className="text-xl font-semibold mb-2">Patient Details</h4>
                        <p><strong>Name:</strong> {patient.name}</p>
                        <p><strong>Age:</strong> {patient.age}</p>
                        <p><strong>Gender:</strong> {patient.gender}</p>
                        <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
                        <button
                            onClick={handleDelete}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            <FaTrash /> Delete Patient
                        </button>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h4 className="text-xl font-semibold mb-2">Family Members</h4>
                        <ul>
                            {patient.familyDetails && patient.familyDetails.length > 0 ? (
                                patient.familyDetails.map((member, index) => (
                                    <li key={index} className="mb-2">
                                        <p><strong>Name:</strong> {member.name}</p>
                                        <p><strong>Relation:</strong> {member.relation}</p>
                                        <p><strong>Age:</strong> {member.age}</p>
                                    </li>
                                ))
                            ) : (
                                <p>No family members added.</p>
                            )}
                        </ul>
                    </div>
                </>
            ) : (
                <p>Patient not found.</p>
            )}
        </div>
    );
};

export default PatientProfile;
