import { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../config";


const FacultyManager = () => {
  const [faculties, setFaculties] = useState([]);
  const [newFaculty, setNewFaculty] = useState('');

  const fetchFaculties = async () => {
    const res = await axios.get(`${config.apiUrl}/api/faculties`);
    setFaculties(res.data);
  };

  const addFaculty = async () => {
    if (!newFaculty.trim()) return;
    await axios.post(`${config.apiUrl}/api/faculties`, { name: newFaculty });
    setNewFaculty('');
    fetchFaculties();
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  return (
    <div className="p-4 border rounded-xl shadow bg-white mb-8">
      <h2 className="text-xl font-bold mb-4">Управление факультетами</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Название факультета"
          className="border p-2 rounded w-full"
          value={newFaculty}
          onChange={(e) => setNewFaculty(e.target.value)}
        />
        <button
          onClick={addFaculty}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Добавить
        </button>
      </div>
      <ul className="space-y-2">
        {faculties.map((faculty) => (
          <li key={faculty._id} className="border p-2 rounded">
            {faculty.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyManager;
