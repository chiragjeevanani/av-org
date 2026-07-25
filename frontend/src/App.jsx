import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingRoutes from "./modules/landing/routes/LandingRoutes";
import { LanguageProvider } from "./context/LanguageContext";
import { SettingsProvider } from "./context/SettingsContext";
import { AuthProvider } from "./admin/context/AuthContext";
import { SocketProvider } from "./admin/context/SocketContext";
import { Toaster } from "react-hot-toast";

import AdminLayout from "./admin/components/Layout";
import AdminLogin from "./admin/pages/Login";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminWebsiteSettings from "./admin/pages/WebsiteSettings";
import AdminMediaLibrary from "./admin/pages/MediaLibrary";
import AdminInquiriesManager from "./admin/pages/InquiriesManager";

function App() {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <AuthProvider>
          <SocketProvider>
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            <BrowserRouter>
              <Routes>
                {/* Admin Panel Routes served from /admin */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="settings" element={<AdminWebsiteSettings />} />
                  <Route path="media" element={<AdminMediaLibrary />} />
                  <Route path="inquiries" element={<AdminInquiriesManager />} />
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Route>

                {/* Public Website Landing Routes */}
                <Route path="/*" element={<LandingRoutes />} />
              </Routes>
            </BrowserRouter>
          </SocketProvider>
        </AuthProvider>
      </LanguageProvider>
    </SettingsProvider>
  );
}

export default App;
