import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';
import EditPatient from './components/EditPatient';
import PatientDetails from './components/PatientDetails';
import FamilyMembers from './components/FamilyMembers';
import AddFamily from './components/AddFamily';
import PatientProfile from './components/PatientProfile';
import UpdateFamilyMember from './components/UpdateFamilyMember';

function App() {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <div className="ml-64 w-full p-4">
                    <Routes>
                        <Route path="/" element={<PatientList />} />
                        <Route path="/add" element={<AddPatient />} />
                        <Route path="/edit/:id" element={<EditPatient />} />
                        <Route path="/details/:id" element={<PatientDetails />} />
                        <Route path="/family" element={<FamilyMembers />} />
                        <Route path="/add-family" element={<AddFamily />} />
                        <Route path="/profile/:id" element={<PatientProfile />} />
                        <Route path="/update-family/:patientId/:memberId" element={<UpdateFamilyMember />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
