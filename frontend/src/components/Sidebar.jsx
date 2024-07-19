import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="h-full bg-gray-800 text-white w-64 fixed">
            <div className="p-4 text-2xl font-bold">Patient Management</div>
            <ul>
                <li className="hover:bg-gray-700">
                    <Link to="/" className="block p-4">Patient List</Link>
                </li>
                <li className="hover:bg-gray-700">
                    <Link to="/add" className="block p-4">Add Patient</Link>
                </li>
                <li className="hover:bg-gray-700">
                    <Link to="/family" className="block p-4">Family Members</Link>
                </li>
                <li className="hover:bg-gray-700">
                    <Link to="/add-family" className="block p-4">Add Family</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
