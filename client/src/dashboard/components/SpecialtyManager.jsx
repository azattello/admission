import { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../config";

const SpecialtyManager = () => {
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [newSpecialty, setNewSpecialty] = useState('');

  const fetchFaculties = async () => {
    const res = await axios.get('/api/faculties');
    setFaculties(res.data);
  };

  const fetchSpecialties = async (facultyId) => {
    const res = await axios.get(`${config.apiUrl}/api/specialties/${facultyId}`);
    setSpecialties(res.data);
  };

  const addSpecialty = async () => {
    if (!newSpecialty.trim() || !selectedFaculty) return;
    await axios.post(`${config.apiUrl}/api/specialties`, {
      name: newSpecialty,
      facultyId: selectedFaculty,
    });
    setNewSpecialty('');
    fetchSpecialties(selectedFaculty);
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  useEffect(() => {
    if (selectedFaculty) fetchSpecialties(selectedFaculty);
  }, [selectedFaculty]);

  return (
    <div className="p-4 border rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Управление специальностями</h2>
      <div className="mb-4">
        <select
          className="border p-2 rounded w-full"
          onChange={(e) => setSelectedFaculty(e.target.value)}
          value={selectedFaculty}
        >
          <option value="">Выберите факультет</option>
          {faculties.map((faculty) => (
            <option key={faculty._id} value={faculty._id}>
              {faculty.name}
            </option>
          ))}
        </select>
      </div>
      {selectedFaculty && (
        <>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Название специальности"
              className="border p-2 rounded w-full"
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
            />
            <button
              onClick={addSpecialty}
              className="bg-green-600 text-white px-4 rounded"
            >
              Добавить
            </button>
          </div>
          <ul className="space-y-2">
            {specialties.map((spec) => (
              <li key={spec._id} className="border p-2 rounded">
                {spec.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SpecialtyManager;
