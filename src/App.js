import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { ApplicantForm, Applicants, Area, Bar, Calendar, Customers, Dashboard, Editor, Employees, FAQ, Financial, Line, Pie, Reports } from "./pages";
import { Navbar, Footer, Sidebar, ThemeSettings, SignIn, SignUp } from './components';
import { useStateContext } from './contexts/ContextProvider';
import './App.css';

// Separate component for handling conditional rendering of Sidebar and Navbar
const AppContent = ({ isAuthenticated, handleAuthentication }) => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const location = useLocation(); // This will work now because it is inside the Router

  // PrivateRoute component to protect routes
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/sign-in" />; // Redirect to sign-in if not authenticated
  };

  // Conditional rendering: check if the user is on the registration or login page
  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="relative flex dark:bg-main-dark-bg">
        {/* Show settings button only on non-auth pages */}
        {!isAuthPage && (
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: '50%' }}
              className="p-3 text-3xl text-white hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </div>
        )}

        {/* Conditionally render sidebar based on the current page */}
        {!isAuthPage && (
          activeMenu ? (
            <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )
        )}

        <div
          className={
            activeMenu && !isAuthPage
              ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
              : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
          }
        >
          {/* Conditionally render Navbar on non-auth pages */}
          {!isAuthPage && (
            <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar">
              <Navbar />
            </div>
          )}

          <div>
            {themeSettings && <ThemeSettings />}
            <Routes>
              {/* Default Route */}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/sign-in"} />} />
              
              {/* Public Routes for SignIn and SignUp */}
              <Route path="/sign-in" element={<SignIn onLogin={handleAuthentication} />} />
              <Route path="/sign-up" element={<SignUp onSignup={handleAuthentication} />} />

              {/* Private Routes for Dashboard and others */}
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/applicants" element={<PrivateRoute><Applicants /></PrivateRoute>} />
              <Route path="/applicants/new" element={<PrivateRoute><ApplicantForm /></PrivateRoute>} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/employees" element={<Employees />} />

              {/* apps  */}
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />

              {/* charts  */}
              <Route path="/line" element={<Line />} />
              <Route path="/area" element={<Area />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/financial" element={<Financial />} />
            </Routes>
          </div>

          {/* Conditionally render Footer on non-auth pages */}
          {!isAuthPage && <Footer />}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to false for login/signup

  const handleAuthentication = () => setIsAuthenticated(true); // Set auth on login/signup

  return (
    <Router>
      <AppContent isAuthenticated={isAuthenticated} handleAuthentication={handleAuthentication} />
    </Router>
  );
}

export default App;
