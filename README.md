# Todo Manager

A full-stack Todo Manager application with user authentication, per-user todos, and a modern UI. Built with React (Vite + TypeScript + Tailwind) for the frontend and Node.js (Express + MongoDB Atlas) for the backend.

---

## Project Structure

```
todo-manager/
  ├── client/   # Frontend (React + Vite)
  └── server/   # Backend (Node.js + Express + MongoDB)
```

---

## Features

- User registration and login (JWT-based)
- Per-user todos (CRUD)
- Categories, due dates, and overdue indicators
- Responsive, modern UI with Tailwind CSS
- Secure backend with MongoDB Atlas

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)
- **MongoDB Atlas** account (or local MongoDB)

---

## 1. Backend Setup (`server/`)

### 1.1. Install dependencies

```bash
cd server
npm install
```

### 1.2. Configure environment variables

Create a `.env` file in the `server/` directory:

```
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

### 1.3. Run the backend server

For development (with auto-reload):

```bash
npm run dev
```

For production:

```bash
npm run build
npm start
```

The backend will run on [http://localhost:5000](http://localhost:5000) by default.

---

## 2. Frontend Setup (`client/`)

### 2.1. Install dependencies

```bash
cd client
npm install
```

### 2.2. Configure environment variables (optional)

If you want to use a custom API URL, create a `.env` file in `client/`:

```
VITE_API_URL=http://localhost:5000
```

### 2.3. Run the frontend dev server

```bash
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

---

## 3. Connecting Frontend & Backend

- By default, the frontend expects the backend at `http://localhost:5000`.
- For local development, a Vite proxy is set up so API requests to `/api` are forwarded to the backend.
- Make sure both servers are running for full functionality.

---

## 4. Build for Production

### Backend

```bash
cd server
npm run build
```

### Frontend

```bash
cd client
npm run build
```

The frontend static files will be in `client/dist/`.

---

## 5. Environment Variables Reference

### Backend (`server/.env`)

- `MONGODB_URI` - Your MongoDB Atlas connection string
- `PORT` - Port for the backend server (default: 5000)
- `JWT_SECRET` - Secret key for JWT signing

### Frontend (`client/.env`)

- `VITE_API_URL` - (Optional) API base URL (default: http://localhost:5000)

---

## 6. Scripts

### Backend

- `npm run dev` - Start backend in development mode (with nodemon)
- `npm run build` - Compile TypeScript to JS
- `npm start` - Start backend in production mode

### Frontend

- `npm run dev` - Start frontend in development mode (Vite)
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Lint frontend code

---

## 7. Folder Structure

```
todo-manager/
  ├── client/
  │   ├── src/
  │   ├── public/
  │   ├── package.json
  │   └── ...
  └── server/
      ├── models/
      ├── routes/
      ├── index.ts
      ├── package.json
      └── ...
```

---

## 8. Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

---

## 9. License

This project is licensed under the MIT License.

---

## 10. Contact

For questions or support, open an issue or contact the maintainer. 