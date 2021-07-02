import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './config/ReactotronConfig.js';

import Routes from './routes/Routes';

import {store} from './store';
import history from './services/history';
import ScrollToTop from './components/Common/ScrollToTop.js';

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <ScrollToTop />
                <Routes />
            </Router>
        </Provider>
    );
}

export default App;