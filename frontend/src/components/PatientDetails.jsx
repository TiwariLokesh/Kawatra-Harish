import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/patients/${id}`)
            .then(response => {
                setPatient(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    return (
        <div className="container mx-auto p-4">
            <h3 className="text-2xl font-bold mb-4">Patient Details</h3>
            <div className="bg-white p-4 rounded-md shadow-md">
                <div className="mb-2"><strong>Name:</strong> {patient.name}</div>
                <div className="mb-2"><strong>Age:</strong> {patient.age}</div>
                <div className="mb-2"><strong>Gender:</strong> {patient.gender}</div>
                <div className="mb-2"><strong>Medical History:</strong> {patient.medicalHistory}</div>
                <div>
                    <strong>Visit History:</strong>
                    {patient.visitHistory && patient.visitHistory.map((visit, index) => (
                        <div key={index} className="ml-4">
                            <div>Date: {new Date(visit.date).toLocaleDateString()}</div>
                            <div>Reason: {visit.reason}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PatientDetails;
