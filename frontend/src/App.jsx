import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import EditPatient from './components/EditPatient';
import PatientDetails from './components/PatientDetails';

function App() {
    return (
        <Router>
            <div className="container mx-auto">
                <nav className="bg-gray-800 p-4 mb-4">
                    <Link to="/" className="text-white mr-4">Patient List</Link>
                    <Link to="/add" className="text-white">Add Patient</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<PatientList />} />
                    <Route path="/add" element={<AddPatient />} />
                    <Route path="/edit/:id" element={<EditPatient />} />
                    <Route path="/details/:id" element={<PatientDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
