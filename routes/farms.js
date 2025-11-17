const express = require('express');
const router = express.Router(); // ⬅️ هذا هو السطر الصحيح لتعريف الـ router

const auth = require('./../middleware/auth'); // لا تنسى استيراد الوسطية
const Farm = require('./../models/farm'); // لا تنسى استيراد النموذج
router.get('/', auth, async (req, res) => {
    try {
        // يجلب البيانات المرتبطة بـ user_id الذي تم إضافته من التوكن (auth middleware)
        const farms = await Farm.find({ user: req.user._id }).sort('name');
        res.send(farms);
    } catch (ex) {
        res.status(500).send('Error retrieving farm data.');
    }
});
// ----------------------------------------------
// الكود الأول: لإنشاء مزرعة جديدة
// ----------------------------------------------
router.post('/', async (req, res) => {
    try {
        const farm = new Farm({
            user: req.body.user,
            name: req.body.name,
            location: req.body.location,
            temperature: req.body.temperature || 0,
            soilMoisture: req.body.moisture || 0,
            conductivity: req.body.conductivity || 0,
            pHLevel: req.body.ph || 0,
            nitrogen: req.body.nitrogen || 0,
            phosphorus: req.body.phosphorus || 0,
            potassium: req.body.potassium || 0,
            Salinity: req.body.Salinity || 0
        });

        await farm.save();
        res.status(201).send(farm);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

// ----------------------------------------------
// الكود الثاني: لتحديث بيانات الحساسات (مع "ترجمة" الأسماء)
// ----------------------------------------------
router.put('/:id', async (req, res) => {
    
    // طباعة البيانات القادمة (كما هي)
    console.log('===== NEW SENSOR UPDATE RECEIVED =====');
    console.log('Attempting to update Farm ID:', req.params.id);
    console.log('Data Received in req.body:', req.body);
    
    try {
        const farmId = req.params.id;
        const incomingData = req.body; // البيانات القادمة من الحساس

        // 1. إنشاء "كائن" جديد لترجمة الأسماء
        const updatesForDB = {};

        // 2. "ترجمة" الأسماء الخاطئة إلى الأسماء الصحيحة
        if (incomingData.temperature !== undefined) {
            updatesForDB.temperature = incomingData.temperature;
        }
        if (incomingData.moisture !== undefined) {
            updatesForDB.moisture = incomingData.moisture; // (moisture -> soilMoisture)
        }
        if (incomingData.conductivity !== undefined) {
            updatesForDB.conductivity = incomingData.conductivity;
        }
        if (incomingData.ph !== undefined) {
            updatesForDB.ph = incomingData.ph; // (ph -> pHLevel)
        }
        if (incomingData.nitrogen !== undefined) {
            updatesForDB.nitrogen = incomingData.nitrogen;
        }
        if (incomingData.phosphorus !== undefined) {
            updatesForDB.phosphorus = incomingData.phosphorus;
        }
        if (incomingData.potassium !== undefined) {
            updatesForDB.potassium = incomingData.potassium;
        }
        if (incomingData.salinity !== undefined) {
            updatesForDB.Salinity = incomingData.salinity; // (salinity -> Salinity)
        }

        // طباعة البيانات "بعد" الترجمة للتأكد
        console.log('Data MAPPED for DB:', updatesForDB);

        // 3. تحديث قاعدة البيانات باستخدام الكائن "المُترجَم"
        const updatedFarm = await Farm.findByIdAndUpdate(
            farmId,
            { $set: updatesForDB }, // نستخدم الكائن الجديد هنا
            { new: true, runValidators:true } 
        );

        if (!updatedFarm) {
            console.log('ERROR: Farm not found with ID:', farmId);
            return res.status(404).send('Farm not found.');
        }

        console.log('SUCCESS: Farm updated:', updatedFarm);
        res.status(200).send(updatedFarm); 

    } catch (ex) {
        console.log('ERROR during update process:', ex.message);
        res.status(400).send(ex.message);
    }
});
module.exports = router;