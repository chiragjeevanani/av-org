import React from "react";
import { BrowserRouter } from "react-router-dom";
import LandingRoutes from "./modules/landing/routes/LandingRoutes";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <LandingRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
