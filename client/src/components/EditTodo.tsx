import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Todo, UpdateTodoInput } from '@/types/todo';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

const EditTodo = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [formData, setFormData] = useState<UpdateTodoInput>({
    title: '',
    description: '',
    category: 'personal',
    dueDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`/api/todos/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data: Todo = response.data;
        setFormData({
          title: data.title,
          description: data.description,
          category: data.category,
          dueDate: data.dueDate,
        });
      } catch (error) {
        console.error('Error fetching todo:', error);
        navigate('/');
      }
    };
    fetchTodo();
  }, [id, navigate, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/todos/${id}`, formData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Edit Todo</h1>
      <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-xl shadow-lg p-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
            placeholder="Enter todo title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none"
            placeholder="Enter todo description"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none bg-white"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
          </select>
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1.5">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none bg-white"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Update Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo; 