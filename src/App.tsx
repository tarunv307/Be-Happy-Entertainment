import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './pages/admin/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { MoviesPage } from './pages/MoviesPage';
import { ShortFilmsPage } from './pages/ShortFilmsPage';
import { ConcertsPage } from './pages/ConcertsPage';
import { AboutPage } from './pages/AboutPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { TeamPage } from './pages/TeamPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { DashboardHome } from './pages/admin/DashboardHome';
import { ProductionsAdmin } from './pages/admin/ProductionsAdmin';
import { ServicesAdmin } from './pages/admin/ServicesAdmin';
import { TeamAdmin } from './pages/admin/TeamAdmin';
import { GalleryAdmin } from './pages/admin/GalleryAdmin';
import { EnquiriesAdmin } from './pages/admin/EnquiriesAdmin';
import { SettingsAdmin } from './pages/admin/SettingsAdmin';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes with Cinematic Layout */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="movies" element={<MoviesPage />} />
              <Route path="movies/:slug" element={<ProjectDetailPage />} />
              <Route path="productions" element={<MoviesPage />} />
              <Route path="productions/:slug" element={<ProjectDetailPage />} />
              <Route path="short-films" element={<ShortFilmsPage />} />
              <Route path="concerts" element={<ConcertsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Secure Admin CMS Portal */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="productions" element={<ProductionsAdmin />} />
              <Route path="services" element={<ServicesAdmin />} />
              <Route path="team" element={<TeamAdmin />} />
              <Route path="gallery" element={<GalleryAdmin />} />
              <Route path="enquiries" element={<EnquiriesAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
            </Route>

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
