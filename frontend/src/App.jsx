import React from "react";
import { BrowserRouter } from "react-router-dom";
import LandingRoutes from "./modules/landing/routes/LandingRoutes";

function App() {
  return (
    <BrowserRouter>
      <LandingRoutes />
    </BrowserRouter>
  );
}

export default App;
