const router = require('express').Router();
let Patient = require('../models/Patient');

router.route('/').get((req, res) => {
    Patient.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newPatient = new Patient(req.body);

    newPatient.save()
        .then(() => res.json('Patient added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Patient.findById(req.params.id)
        .then(patient => res.json(patient))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Patient.findByIdAndDelete(req.params.id)
        .then(() => res.json('Patient deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Patient.findById(req.params.id)
        .then(patient => {
            patient.name = req.body.name;
            patient.age = req.body.age;
            patient.gender = req.body.gender;
            patient.medicalHistory = req.body.medicalHistory;
            patient.visitHistory = req.body.visitHistory;

            patient.save()
                .then(() => res.json('Patient updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addFamilyMember/:id').post((req, res) => {
    Patient.findById(req.params.id)
        .then(patient => {
            patient.familyDetails.push(req.body);

            patient.save()
                .then(() => res.json('Family member added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/addFamilyMember/:id').post((req, res) => {
    Patient.findById(req.params.id)
        .then(patient => {
            patient.familyDetails.push(req.body);

            patient.save()
                .then(() => res.json('Family member added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/familyDetails/:id').get((req, res) => {
    Patient.findById(req.params.id)
        .then(patient => res.json(patient.familyDetails))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
