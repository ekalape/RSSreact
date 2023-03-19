import './App.css';
import React from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';

import Main from './MainPage/Main';
import About from './AboutPage/About';
import Header from './UnrelatedComponents/Header';
import NotFound from './UnrelatedComponents/NotFound';
import FormPage from './FormPage/FormWrapper';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path={'/main'} element={<Main />} />
        <Route path={'/forms'} element={<FormPage />} />
        <Route path={'/about'} element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
