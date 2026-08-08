import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/loginpage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import EmployeesPage from './pages/EmployeesPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import AppLayout from './components/AppLayout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/empleados" element={<EmployeesPage />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/empleados" replace />} />

        <Route
          path="*"
          element={
            <div style={{ minHeight: '100vh', background: '#f8fafc', textAlign: 'center', padding: '80px' }}>
              <h2 style={{ color: '#1e293b' }}>404 - Página no encontrada</h2>
              <Link to="/empleados">Volver al inicio</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
