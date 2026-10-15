const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Модель администратора
const User = require('../models/User'); // Модель администратора
const authMiddleware = require('../middleware/authAdmin.middleware')
const config = require("config")
const { hasPermission } = require('../utils/roleAccess');
const router = express.Router();


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Администратор не найден' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    const adminData = { ...admin._doc };
    const token = jwt.sign({ id: admin._id, role: admin.role }, config.get("secretKey"), { expiresIn: '8h' });

    res.status(200).json({
      message: 'Вы успешно вошли в административную панель',
      token,
      admin: adminData
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});


// auth router
router.get('/auth', authMiddleware, async (req, res) => {
  try {
      const admin = await Admin.findById(req.admin.id);
      if (!admin) {
          return res.status(404).json({ message: "Администратор не найден" });
      }

      const adminData = { ...admin._doc };
      const token = jwt.sign({ id: admin._id, role: admin.role }, config.get("secretKey"), { expiresIn: '1h' });

      return res.json({
          token,
          admin: adminData
      });

  } catch (error) {
      console.log("Ошибка авторизации:", error);
      res.status(500).json({ message: "Ошибка сервера" });
  }
});




router.post("/create-admin", authMiddleware, async (req, res) => {
  try {
    if (!hasPermission(req.admin.role, 'manageAdmins')) {
      return res.status(403).json({ message: "Нет прав для создания администратора" });
    }

    const { email, password, name, surname, phone, role = 'block1_admin' } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email и пароль обязательны" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Администратор с таким email уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newAdmin = new Admin({
      email,
      name,
      surname,
      phone,
      password: hashedPassword,
      role,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Администратор успешно создан", admin: newAdmin });
  } catch (error) {
    console.error("Ошибка при создании администратора:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});



// Обновление данных сотрудника
router.put("/update-admin/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, surname, phone, role, permissions } = req.body;

    // Найти администратора по ID
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Администратор не найден" });
    }

    // Запрещаем редактирование суперпользователя
    if (admin.role === "superadmin") {
      return res.status(403).json({ message: "Изменение данных суперпользователя запрещено" });
    }

    // Обновляем только если переданы новые значения
    if (email) admin.email = email;
    if (name) admin.name = name;
    if (surname) admin.surname = surname;
    if (phone) admin.phone = phone;
    if (role) admin.role = role;
    if (permissions) admin.permissions = permissions;

    await admin.save();

    res.json({ message: "Данные сотрудника успешно обновлены", admin });
  } catch (error) {
    console.error("Ошибка при обновлении данных администратора:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});


router.get("/admins", authMiddleware, async (req, res) => {
  try {
    if (!hasPermission(req.admin.role, 'manageAdmins')) {
      return res.status(403).json({ message: "Нет прав на просмотр списка администраторов" });
    }

    const admins = await Admin.find().select("-password");
    res.status(200).json(admins);
  } catch (error) {
    console.error("Ошибка при получении списка админов:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get('/students', authMiddleware, async (req, res) => {
  try {
    if (!hasPermission(req.admin.role, 'viewStudents')) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [students, totalCount] = await Promise.all([
      User.find().sort({ createdAt: -1 }).skip(skip).limit(limit).select('-password'),
      User.countDocuments()
    ]);

    res.status(200).json({
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      students
    });
  } catch (error) {
    console.error('Ошибка при получении списка студентов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.get('/students/:id', authMiddleware, async (req, res) => {
  try {
    if (!hasPermission(req.admin.role, 'viewStudents')) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Студент не найден' });
    }

    res.status(200).json({ student: user });
  } catch (error) {
    console.error('Ошибка при получении студента:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/students/:id/review', authMiddleware, async (req, res) => {
  try {
    const { decision, type, comment } = req.body;
    const allowedTypes = ['personalData', 'documents', 'payment', 'contract', 'selection'];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ message: 'Неверный тип проверки' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Студент не найден' });
    }

    const rolePermissionMap = {
      personalData: 'approvePersonalData',
      documents: 'approvePersonalData',
      payment: 'approvePayment',
      contract: 'approveContract',
      selection: 'approveSelection'
    };

    if (!hasPermission(req.admin.role, rolePermissionMap[type])) {
      return res.status(403).json({ message: 'Нет прав для проверки данного блока' });
    }

    if (type === 'personalData') {
      user.passportStatus = decision === 'approved' ? 'verified' : 'rejected';
      user.stages.personal = decision === 'approved' ? 'completed' : 'rejected';
    }

    if (type === 'documents') {
      Object.keys(user.documents || {}).forEach((key) => {
        if (user.documents[key]) {
          user.documents[key].status = decision === 'approved' ? 'verified' : 'rejected';
          user.documents[key].comment = comment || '';
        }
      });
      user.stages.documents = decision === 'approved' ? 'completed' : 'rejected';
    }

    if (type === 'selection') {
      user.stages.selection = decision === 'approved' ? 'completed' : 'rejected';
      user.status = decision === 'approved' ? 'passed' : 'verification';
    }

    if (type === 'payment') {
      user.stages.payment = decision === 'approved' ? 'completed' : 'rejected';
    }

    if (type === 'contract') {
      user.stages.agreement = decision === 'approved' ? 'completed' : 'rejected';
    }

    await user.save();

    res.status(200).json({
      message: `Проверка ${type} выполнена`,
      decision,
      student: user
    });
  } catch (error) {
    console.error('Ошибка при проверке студента:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


module.exports = router;
