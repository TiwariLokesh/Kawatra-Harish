import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateFamilyMember = () => {
    const { patientId, memberId } = useParams();
    const [familyMember, setFamilyMember] = useState({ name: '', relation: '', age: '' });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch family member details
        axios.get(`http://localhost:5000/patients/${patientId}`)
            .then(response => {
                const member = response.data.familyDetails.id(memberId);
                setFamilyMember({
                    name: member.name,
                    relation: member.relation,
                    age: member.age
                });
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [patientId, memberId]);

    const handleChange = (e) => {
        setFamilyMember({ ...familyMember, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/patients/updateFamilyMember/${patientId}/${memberId}`, familyMember)
            .then(() => {
                alert('Family member updated!');
                navigate(`/profile/${patientId}`);
            })
            .catch(err => console.log(err));
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="ml-64 p-4">
            <h3 className="text-2xl font-bold mb-4">Update Family Member</h3>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md">
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
                    Update Family Member
                </button>
            </form>
        </div>
    );
};

export default UpdateFamilyMember;
