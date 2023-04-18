import './App.css';
import React from 'react';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';

import Main from './MainPage/Main';
import About from './AboutPage/About';
import Header from './UnrelatedComponents/Header';
import NotFound from './UnrelatedComponents/NotFound';
import FormPage from './FormPage/FormWrapper';
import { store } from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path={'/'} element={<Main />} />
          <Route path={'/main'} element={<Main />} />
          <Route path={'/form'} element={<FormPage />} />
          <Route path={'/about'} element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
