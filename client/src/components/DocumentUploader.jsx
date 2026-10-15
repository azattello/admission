import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/DocumentUploader.css';
import config from "../config";
import { useSelector } from 'react-redux';

const DOCUMENT_TYPES = {
  passport: "Паспорт",
  diploma: "Диплом",
  transcript: "Транскрипт",
  certificates: "Сертификаты",
  photo3x4: "Фото 3x4", // Добавлено
};

const DocumentUploader = () => {
  const [documents, setDocuments] = useState({
    passport: [],
    diploma: [],
    transcript: [],
    certificates: [],
    photo3x4: [], // Добавлено
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    passport: [],
    diploma: [],
    transcript: [],
    certificates: [],
    photo3x4: [], // Добавлено
  });
  const [loading, setLoading] = useState({});
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [documentsStatus, setDocumentsStatus] = useState({
    passport: "notUploaded",
    diploma: "notUploaded",
    transcript: "notUploaded",
    certificates: "notUploaded",
    photo3x4: "notUploaded", // Добавлено
  });

  const userId = useSelector((state) => state.user.currentUser.id);

  useEffect(() => {
    // Запросить статус документов при загрузке компонента
    const fetchDocumentsStatus = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/upload/documents/${userId}`);
        const documentsStatus = response.data.documents;
        setDocumentsStatus(documentsStatus);
        setStatusMessage(getStatusMessage(documentsStatus));
      } catch (err) {
        console.error("Ошибка при загрузке статуса документов:", err);
      }
    };
    fetchDocumentsStatus();
  }, [userId]);

  const getStatusMessage = (documents) => {
    const notUploaded = [];
    const rejected = [];
    const pending = [];

    for (const [type, doc] of Object.entries(documents)) {
      if (doc.status === "notUploaded") notUploaded.push(DOCUMENT_TYPES[type]);
      if (doc.status === "rejected") rejected.push(DOCUMENT_TYPES[type]);
      if (doc.status === "pending") pending.push(DOCUMENT_TYPES[type]);
    }

    if (notUploaded.length > 0) {
      return `Необходимо загрузить следующие документы: ${notUploaded.join(", ")}`;
    } else if (rejected.length > 0) {
      return `Следующие документы отклонены администратором: ${rejected.join(", ")}`;
    } else if (pending.length > 0) {
      return "Ваши документы находятся на проверке.";
    } else {
      return "Все документы загружены и проверены.";
    }
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    setDocuments((prev) => ({ ...prev, [type]: files }));
  };

  const handleUpload = async (type) => {
    setError(""); // Очистка ошибки перед загрузкой
    const formData = new FormData();
    
    // Добавляем файлы
    documents[type].forEach((file) => formData.append("files", file));
    
    // Передаем userId
    formData.append("userId", userId);
  
    try {
      setLoading((prev) => ({ ...prev, [type]: true }));
      const response = await axios.post(
        `${config.apiUrl}/api/upload/upload/${type}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      setUploadedFiles((prev) => ({
        ...prev,
        [type]: response.data.files,
      }));
      setDocuments((prev) => ({ ...prev, [type]: [] })); // Очищаем выбранные файлы
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      setError("Ошибка загрузки. Попробуйте снова.");
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleClear = (type) => {
    setDocuments((prev) => ({ ...prev, [type]: [] }));
  };

  const formatFileUrl = (url) => {
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="document-uploader-wrapper">
      {statusMessage === "Все документы загружены и проверены." || statusMessage === "Ваши документы находятся на проверке." ? null : (
      <div className="document-uploader">
        {/* Сообщение о статусе загрузки */}
        {statusMessage && <div className="status-message">{statusMessage}</div>}

        {Object.keys(DOCUMENT_TYPES).map((type) => (
          <div className="document-section" key={type}>
            <h3 className="document-title">{DOCUMENT_TYPES[type]}</h3>
            {documentsStatus[type] === "notUploaded" && (
              <p className="warning-message">Пожалуйста, загрузите {DOCUMENT_TYPES[type]}</p>
            )}
            {documentsStatus[type] === "rejected" && (
              <p className="error-message">Документ {DOCUMENT_TYPES[type]} отклонен. Загрузите заново.</p>
            )}
            {documentsStatus[type] === "pending" && (
              <p className="info-message">Документ {DOCUMENT_TYPES[type]} находится на проверке.</p>
            )}

            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, type)}
              className="file-input"
              disabled={documentsStatus[type] === "pending"}
            />
            <div className="button-container">
              <button
                className="upload-button"
                onClick={() => handleUpload(type)}
                disabled={loading[type] || documents[type].length === 0 || documentsStatus[type] === "pending"}
              >
                {loading[type] ? "Загружается..." : "Загрузить"}
              </button>
              <button className="clear-button" onClick={() => handleClear(type)}>
                Очистить
              </button>
            </div>
            <div className="preview-container">
              {uploadedFiles[type].map((file, index) => (
                file.url.endsWith(".pdf") ? (
                  <a
                    key={index}
                    href={formatFileUrl(file.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdf-link"
                  >
                    {file.fileName} (PDF)
                  </a>
                ) : (
                  <img
                    key={index}
                    src={formatFileUrl(file.url)}
                    alt="preview"
                    className="image-preview"
                  />
                )
              ))}
            </div>
          </div>
        ))}
        {error && <div className="error-message">{error}</div>}
      </div>
      )}
    </div>
  );
};

export default DocumentUploader;
