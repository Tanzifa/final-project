import { useState } from "react";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import HomePage from "./pages/Homepage/Homepage";
import HomePage2 from "./pages/Homepage2/Homepage2";
import AdminPanel2 from "./pages/AdminPanel2/AdminPanel2";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import CoinsDescription from "./pages/CoinsDescription/CoinsDescription";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ListOfTheCoins from "./pages/ListOfTheCoins/ListOfTheCoins";
import { ProtectedRoute } from "./Router/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/homepage2"
            element={
              <ProtectedRoute>
                <HomePage2 />
              </ProtectedRoute>
            }
          />
          <Route path="/adminPanel2/:id" element={<AdminPanel2 />} />
          <Route path="/listofthecoins" element={<ListOfTheCoins />} />
          <Route path="/coinsdescription/:id" element={<CoinsDescription />} />
          <Route path="/adminpanel/:id" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
