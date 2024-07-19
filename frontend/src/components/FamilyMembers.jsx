import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FamilyMembers = () => {
    const [familyMembers, setFamilyMembers] = useState([]);
    const [filteredFamilyMembers, setFilteredFamilyMembers] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/patients/')
            .then(response => {
                const allFamilyMembers = response.data.flatMap(patient => patient.familyDetails.map(member => ({
                    ...member,
                    patientName: patient.name
                })));
                setFamilyMembers(allFamilyMembers);
                setFilteredFamilyMembers(allFamilyMembers);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setFilteredFamilyMembers(familyMembers.filter(member =>
            member.name.toLowerCase().includes(filter.toLowerCase()) ||
            member.relation.toLowerCase().includes(filter.toLowerCase()) ||
            member.patientName.toLowerCase().includes(filter.toLowerCase())
        ));
    }, [filter, familyMembers]);

    return (
        <div className="ml-64 p-4">
            <h3 className="text-2xl font-bold mb-4">Family Members</h3>
            <input
                type="text"
                placeholder="Filter by name, relation, or patient name"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-md"
            />
            <div className="bg-white p-4 rounded-md shadow-md">
                <ul className="list-disc pl-5">
                    {filteredFamilyMembers.map((member, index) => (
                        <li key={index} className="mb-2">
                            {member.name} ({member.relation}, {member.age} years old) - {member.patientName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FamilyMembers;
