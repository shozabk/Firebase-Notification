import React, { FC } from 'react';
import Router from 'react-easy-router';
import { ToastContainer } from 'react-toastify';

// Routes
import routes from './routes';

// CSS Integration
import 'react-toastify/dist/ReactToastify.css';
import './app.css';
// import eventHandler from './utils/eventHandler';

const App: FC = () => {

  return (
    <div className="App">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Router routes={routes} />
    </div>
  );
};

export default App;
