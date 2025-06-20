import express, { Request, Response, NextFunction } from 'express';
import { Todo } from '../models/Todo.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

interface AuthRequest extends Request {
  user?: any;
}

// Auth middleware
function auth(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
}

router.use(auth);

// Get all todos
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      // Return sample todos if not logged in
      return res.json([
        {
          _id: 'sample1',
          title: 'Sample Todo 1',
          description: 'This is a sample todo. Login to manage your own tasks.',
          category: 'personal',
          completed: false,
          dueDate: new Date(),
        },
        {
          _id: 'sample2',
          title: 'Sample Todo 2',
          description: 'Register and login to save your todos!',
          category: 'work',
          completed: false,
          dueDate: new Date(),
        },
      ]);
    }
    const todos = await Todo.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

// Get a single todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo' });
  }
});

// Create a todo
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const todo = new Todo({ ...req.body, user: req.user.userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating todo' });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: 'Error updating todo' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

// Update todo completion status
router.patch('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: 'Error updating todo status' });
  }
});

export const todoRouter = router; 