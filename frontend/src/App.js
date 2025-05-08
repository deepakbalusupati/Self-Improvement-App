import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import BehaviorList from './components/Behavior/BehaviorList';
import BehaviorDetail from './components/Behavior/BehaviorDetail';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Layout/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <BehaviorList />
                  </PrivateRoute>
                }
              />
              <Route
                path="/behaviors/:behaviorId"
                element={
                  <PrivateRoute>
                    <BehaviorDetail />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;