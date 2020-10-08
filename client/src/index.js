import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store'
import { Provider } from 'react-redux'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store} >
      <Router>
        <App />
        <NotificationContainer />
      </Router>
    </Provider>,
  // </React.StrictMode>
  document.getElementById('root')
);
