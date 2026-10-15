const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Маршрут для загрузки документов
router.post("/upload/:type", upload.array("files"), async (req, res) => {
  const { type } = req.params;
  const { userId } = req.body;

  console.log("Запрос на загрузку документов:", type);

  const validTypes = ["passport", "diploma", "transcript", "certificates", "photo3x4"]; // Добавляем photo3x4

  if (!validTypes.includes(type)) {
    return res.status(400).json({ message: "Неверный тип документа." });
  }

  try {
    // Проверка существования пользователя
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден." });
    }

    // Проверяем, созданы ли папки, и загружаем файлы
    const uploadPromises = req.files.map((file) =>
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: `users/${userId}/documents/${type}`,
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              console.error("Ошибка при загрузке на Cloudinary:", error);
              reject(error);
            } else {
              resolve({ url: result.secure_url, fileName: result.original_filename });
            }
          }
        ).end(file.buffer);
      })
    );

    const uploadedFiles = await Promise.all(uploadPromises);

    // Сохраняем данные о файлах в модель пользователя
    if (!user.documents[type]) {
      user.documents[type] = { files: [], status: "notUploaded" }; // Инициализируем документ, если он отсутствует
    }

    user.documents[type].files.push(...uploadedFiles);
    user.documents[type].status = "pending"; // Устанавливаем статус "на проверке"
    await user.save();

    res.status(200).json({ message: "Файлы успешно загружены.", files: uploadedFiles });
  } catch (error) {
    console.error("Ошибка загрузки:", error);
    res.status(500).json({ message: "Ошибка сервера." });
  }
});



router.get("/documents/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId, "documents");
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден." });
    }

    res.status(200).json({ documents: user.documents });
  } catch (error) {
    console.error("Ошибка при получении документов:", error);
    res.status(500).json({ message: "Ошибка сервера." });
  }
});

module.exports = router;


