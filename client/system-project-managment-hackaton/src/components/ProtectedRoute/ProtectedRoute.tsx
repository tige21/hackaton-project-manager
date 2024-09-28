import React from 'react';
import { Navigate } from 'react-router-dom';

// Компонент, защищающий маршруты
const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const token = localStorage.getItem('token'); // Проверяем наличие токена

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
