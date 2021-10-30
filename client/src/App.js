import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import './App.css';

import { Navbar, Cryptocurrencies, Dashboard, News } from './components/index';
 
const App = () => {
    return (
        <div className='app'>
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='main'>
                <Layout>
                    <div className='routes'>
                        <Switch>
                            <Route exact path='/'>
                                <Dashboard />
                            </Route>
                            <Route exact path='/cryptocurrencies'>
                                <Cryptocurrencies />
                            </Route>
                            <Route exact path='/news'>
                                <News />
                            </Route>
                        </Switch>
                    </div>
                </Layout>
            </div>
        </div>
    )    
}

export default App;