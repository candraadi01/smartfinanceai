import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Recommendations from './pages/Recommendations';
import Profile from './pages/Profile';
import DashboardLayout from './layouts/DashboardLayout';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('sf-theme') || 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('sf-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <Routes>
      <Route path="/" element={<Landing theme={theme} onToggleTheme={toggleTheme} />} />
      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/register" element={<Auth mode="register" />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route element={<DashboardLayout theme={theme} onToggleTheme={toggleTheme} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
