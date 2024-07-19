import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientProfile = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState({});
    const [familyMember, setFamilyMember] = useState({ name: '', relation: '', age: '' });

    useEffect(() => {
        axios.get(`http://localhost:5000/patients/${id}`)
            .then(response => {
                setPatient(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const onChange = (e) => {
        setFamilyMember({ ...familyMember, [e.target.name]: e.target.value });
    };

    const addFamilyMember = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/patients/addFamilyMember/${id}`, familyMember)
            .then(res => {
                setPatient(prevState => ({
                    ...prevState,
                    familyDetails: [...prevState.familyDetails, familyMember]
                }));
                setFamilyMember({ name: '', relation: '', age: '' });
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mx-auto p-4">
            <h3 className="text-2xl font-bold mb-4">Patient Profile</h3>
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
                <div>
                    <strong>Family Details:</strong>
                    {patient.familyDetails && patient.familyDetails.map((member, index) => (
                        <div key={index} className="ml-4">
                            <div>Name: {member.name}</div>
                            <div>Relation: {member.relation}</div>
                            <div>Age: {member.age}</div>
                        </div>
                    ))}
                </div>
                <form onSubmit={addFamilyMember} className="mt-4">
                    <h4 className="text-xl font-bold mb-2">Add Family Member</h4>
                    <div className="mb-2">
                        <label className="block text-gray-700">Name:</label>
                        <input type="text" name="name" value={familyMember.name} onChange={onChange} className="w-full px-4 py-2 border rounded-md" />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">Relation:</label>
                        <input type="text" name="relation" value={familyMember.relation} onChange={onChange} className="w-full px-4 py-2 border rounded-md" />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">Age:</label>
                        <input type="number" name="age" value={familyMember.age} onChange={onChange} className="w-full px-4 py-2 border rounded-md" />
                    </div>
                    <div>
                        <input type="submit" value="Add Family Member" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientProfile;
