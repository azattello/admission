const Admin = require('../models/Admin'); // Модель администратора
const bcrypt = require('bcryptjs');

const createSuperAdmin = async () => {
  try {
    // Проверяем, существует ли супер-админ
    const existingSuperAdmin = await Admin.findOne({ role: 'superadmin' });
    if (!existingSuperAdmin) {
      // Хешируем пароль для супер-админа
      const hashedPassword = await bcrypt.hash('superadmin04', 8);

      // Создаем супер-админа с полными правами
      const superAdmin = new Admin({
        email: 'azat.abdykalli@gmail.com',
        phone:'87478649337',
        password: hashedPassword,
        role: 'superadmin',
        permissions: ['manageUsers', 'viewReports', 'manageContent', 'manageSettings'], // Полные права
        name: 'Azat',
        surname: 'Abdykali',
      });

      await superAdmin.save();
      console.log('Супер-админ успешно создан');
    } else {
      console.log('Супер-админ уже существует');
    }
  } catch (error) {
    console.error('Ошибка при создании супер-админа:', error);
  }
};

module.exports = createSuperAdmin;
