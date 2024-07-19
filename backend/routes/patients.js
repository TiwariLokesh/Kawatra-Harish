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

// Fetch a patient by ID
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update a family member by ID
router.put('/updateFamilyMember/:patientId/:memberId', async (req, res) => {
    try {
        const { patientId, memberId } = req.params;
        const { name, relation, age } = req.body;

        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const familyMember = patient.familyDetails.id(memberId);

        if (!familyMember) {
            return res.status(404).json({ message: 'Family member not found' });
        }

        familyMember.name = name;
        familyMember.relation = relation;
        familyMember.age = age;

        await patient.save();

        res.json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// Delete a patient by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndDelete(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Add a new patient
router.post('/', async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
