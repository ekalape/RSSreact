import './App.css';
import React from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';

import Main from './components/Main';
import About from './components/About';
import Header from './components/Header';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path={'/'} element={<Main />}></Route>
        <Route path={'/main'} element={<Main />} />
        <Route path={'/about'} element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
