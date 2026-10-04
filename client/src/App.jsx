import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { UpgradeModal } from './components/subscription/UpgradeModal';
import { ToastContainer } from './components/common/Toast';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { BuilderPage } from './pages/BuilderPage';
import { AnalyzerPage } from './pages/AnalyzerPage';
import { PricingPage } from './pages/PricingPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { AuthPage } from './pages/AuthPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { useAuthStore } from './store/authStore';

export function App() {
  const { fetchUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4ED] text-[#15130F] font-sans selection:bg-[#15130F] selection:text-[#F7F4ED]">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Routed Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/analyzer" element={<AnalyzerPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Modals & Notifications */}
      <AuthModal />
      <UpgradeModal />
      <ToastContainer />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
