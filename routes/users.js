const express = require('express');
const router = express.Router();
const User = require('../models/user'); // استيراد المستخدم

// هو "يستمع" للـ POST request الذي أرسلته من Postman
router.post('/', async (req, res) => {
    try {
        // 1. إنشاء مستخدم جديد بالبيانات القادمة من Postman (req.body)
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, // تذكر: يجب تشفير هذا لاحقاً!
            number: req.body.number
        });

        // 2. حفظ المستخدم في قاعدة البيانات
        user = await user.save();

        // 3. إرسال رد ناجح
        res.status(201).send(user);

    } catch (ex) {
        // 4. إرسال رد في حالة حدوث خطأ
        res.status(400).send(ex.message);
    }
});

module.exports = router;