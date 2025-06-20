import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PencilIcon, TrashIcon, CalendarIcon, ExclamationCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Todo, TodoCategory } from '@/types/todo';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const isOverdue = (dueDate: string, completed: boolean) => {
  if (completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const taskDueDate = new Date(dueDate);
  return taskDueDate < today;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoCategory | 'all'>('all');
  const location = useLocation();
  const { token } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, [location, token]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/todos/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await axios.patch(`/api/todos/${id}`, { completed: !completed }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setTodos(
        todos.map(todo =>
          todo._id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const filteredTodos = filter === 'all' 
    ? todos 
    : todos.filter(todo => todo.category === filter);

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">My Todos</h1>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition-all duration-200 text-sm sm:text-base ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('work')}
            className={`px-4 py-2 rounded-full transition-all duration-200 text-sm sm:text-base ${
              filter === 'work' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Work
          </button>
          <button
            onClick={() => setFilter('personal')}
            className={`px-4 py-2 rounded-full transition-all duration-200 text-sm sm:text-base ${
              filter === 'personal' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Personal
          </button>
          <button
            onClick={() => setFilter('study')}
            className={`px-4 py-2 rounded-full transition-all duration-200 text-sm sm:text-base ${
              filter === 'study' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Study
          </button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTodos.map(todo => (
          <div
            key={todo._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative mb-2 sm:mb-0">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo._id, todo.completed)}
                    className="peer sr-only"
                    id={`todo-${todo._id}`}
                  />
                  <label
                    htmlFor={`todo-${todo._id}`}
                    className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer transition-all duration-200 hover:border-emerald-500 peer-checked:border-emerald-500 peer-checked:bg-emerald-500"
                  >
                    <CheckIcon className="w-4 h-4 text-white opacity-0 scale-0 transition-all duration-200 peer-checked:opacity-100 peer-checked:scale-100" />
                  </label>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3
                      className={`text-lg sm:text-xl font-semibold truncate ${
                        todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                      }`}
                    >
                      {todo.title}
                    </h3>
                    {isOverdue(todo.dueDate, todo.completed) && (
                      <span className="inline-flex items-center text-red-500" title="Overdue">
                        <ExclamationCircleIcon className="h-5 w-5" />
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base break-words">{todo.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-block px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
                      todo.category === 'work' 
                        ? 'bg-blue-100 text-blue-800'
                        : todo.category === 'personal'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {todo.category}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
                      isOverdue(todo.dueDate, todo.completed)
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <CalendarIcon className="h-4 w-4 mr-1.5" />
                      {formatDate(todo.dueDate)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-row justify-end space-x-2 sm:space-x-3">
                <Link
                  to={`/edit/${todo._id}`}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <PencilIcon className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList; 