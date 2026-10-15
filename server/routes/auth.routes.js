const Router = require("express");
const User = require("../models/User") 
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const authMiddleware = require('../middleware/auth.middleware')
const nodemailer = require('nodemailer');
const router = new Router()

// registration router
router.post('/registration', 
    [
        check('email', 'Неверный формат email').isEmail(),
        check('password', 'Пароль должен быть от 4 до 12 символов').isLength({min: 4, max: 12}),
        check('name', 'Имя обязательно для заполнения').not().isEmpty(),
        check('surname', 'Фамилия обязательна для заполнения').not().isEmpty()
    ],
    async (req, res) => {
    try {
        console.log(req.body)

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message: "Неверный запрос", errors})
        }

        const {email, password, name, surname} = req.body;
        
        const candidate = await User.findOne({email});
        
        if (candidate){
            return res.status(400).json({message: 'Пользователь с таким номером телефона уже существует'})
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = new User({email, password: hashPassword, name, surname, createdAt: new Date() })
        await user.save()
        return res.json({message: "Пользователь создан"})

    } catch (error) {
        console.log(error)
        res.send({message: "Server error"})
        
    }
});




// login router
router.post('/login', async (req, res) => {
    try {

        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({message: "Пользователь не найден"})
        }
        
        const isPassValid = bcrypt.compareSync(password, user.password)
        if(!isPassValid){
            return res.status(400).json({message: "Неверный пароль!"})
        }

        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "30d"})
        return res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                createdAt: user.createdAt
            }
        })

    } catch (error) {
        console.log(error)
        res.send({message: "Server error"})
        
    }
})


// auth router
router.get('/auth', authMiddleware, 
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1d"})

            const userData = { ...user._doc }; // `admin._doc` содержит все данные из MongoDB

            return res.json({
                token,
                user: userData
            })

        } catch (error) {
            console.log(error)
            res.send({message: "Server error"})
            
        }
})


// Роут для запроса сброса пароля
router.post('/reset-password-request', async (req, res) => {
  const { email } = req.body;

  try {
    // Проверка на существование пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Генерация токена для сброса пароля
    const resetToken = jwt.sign({ id: user._id }, config.get('secretKey'), { expiresIn: '1h' });

    // Ссылка для сброса пароля
    const resetLink = `http://localhost:3001/api/auth/reset-password/${resetToken}`;

    // Отправка email пользователю
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'azat04marvel@gmail.com',
        pass: 'omxi obze rzzq tnuw',
      },
    });

    const mailOptions = {
      from: 'azat04marvel@gmail.com',
      to: email,
      subject: 'Запрос на сброс пароля',
      text: `Для сброса пароля перейдите по ссылке: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Ссылка для сброса пароля отправлена на вашу почту' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/reset-password', async (req, res) => {
    const { token } = req.query; // Получение токена из query параметра
    const { newPassword } = req.body; // Получение нового пароля из тела запроса
  
    try {
      // Проверка токена
      const decoded = jwt.verify(token, config.get('secretKey'));
  
      // Поиск пользователя по ID из токена
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      // Хеширование нового пароля
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Пароль успешно сброшен' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
});
  


// Роут для отправки письма с верификацией email
router.post('/send-verification-email', async (req, res) => {
    const { email } = req.body;

    try {
        // Проверка на существование пользователя
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Генерация токена для верификации email
        const verificationToken = jwt.sign({ id: user._id }, config.get('secretKey'), { expiresIn: '24h' });

        // Ссылка для верификации email
        const verificationLink = `http://localhost:3001/api/auth/verify-email?token=${verificationToken}`;

        // Отправка email пользователю
        const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'azat04marvel@gmail.com',
            pass: 'omxi obze rzzq tnuw',
        },
        });

        const mailOptions = {
        from: 'azat04marvel@gmail.com',
        to: email,
        subject: 'Подтверждение email',
        text: `Для подтверждения вашего email перейдите по ссылке: ${verificationLink}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Ссылка для подтверждения отправлена на вашу почту' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
      const decoded = jwt.verify(token, config.get('secretKey'));

      const user = await User.findById(decoded.id);
      if (!user) {
          return res.status(404).json({ message: 'Пользователь не найден' });
      }

      if (user.isVerifiedEmail) {
          return res.redirect('http://localhost:3000/email-verified');
      }

      user.isVerifiedEmail = true;
      await user.save();

      res.redirect('http://localhost:3000/email-verified');
  } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Неверный или истекший токен' });
  }
});


router.post('/update-passport-data', async (req, res) => {
  try {
      const { token, ...formData } = req.body;
      const decoded = jwt.verify(token, config.get('secretKey'));

      const updateData = {
          passportData: {
              gender: formData.gender,
              birthDate: formData.birthDate,
              surname: formData.surname,
              name: formData.name,
              patronymic: formData.patronymic,
              passportNumber: formData.passportNumber,
              passportIssueDate: formData.passportIssueDate,
              passportExpiryDate: formData.passportExpiryDate,
              issuedBy: formData.issuedBy,
              countryOfIssue: formData.countryOfIssue,
              citizenship: formData.citizenship,
              nationality: formData.nationality,
              iin: formData.iin,
              address: formData.address,
              phoneNumber: formData.phoneNumber
          },
          academicInfo: formData.academicInfo,
          passportStatus: "pending"
      };

      await User.findByIdAndUpdate(
          decoded.id,
          { $set: updateData },
          { new: true }
      );

      res.status(200).json({ message: 'Данные успешно обновлены' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Роут для получения паспортных данных
router.get("/get-passport-data", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен отсутствует." });
  }

  try {
    // Декодируем токен
    const decoded = jwt.verify(token, config.get("secretKey"));

    // Ищем пользователя по ID из токена
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден." });
    }

    // Возвращаем паспортные данные
    res.status(200).json({ passportData: user.passportData, passportStatus: user.passportStatus });
  } catch (error) {
    console.error("Ошибка при получении паспортных данных:", error);
    res.status(500).json({ message: "Ошибка сервера." });
  }
});

  // Роут для админа для проверки паспортных данных
router.post('/verify-passport-data', async (req, res) => {
    const { userId, isVerified } = req.body;
  
    try {
      // Поиск пользователя по ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      // Обновление статуса проверки паспортных данных
      user.passportVerified = isVerified;
      await user.save();
  
      res.status(200).json({ message: `Паспортные данные ${isVerified ? 'успешно подтверждены' : 'отклонены'}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
});



// Роут для обновления номера телефона пользователя
router.post('/update-phone-number', async (req, res) => {
    const { token, phoneNumber } = req.body;
  
    try {
      // Проверка токена
      const decoded = jwt.verify(token, config.get('secretKey'));
  
      // Поиск пользователя по ID из токена
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      // Обновление номера телефона
      user.phoneNumber = phoneNumber;
      await user.save();
  
      res.status(200).json({ message: 'Номер телефона успешно обновлен' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
});
  


module.exports = router
