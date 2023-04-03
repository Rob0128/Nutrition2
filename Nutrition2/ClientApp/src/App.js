import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout';
import './custom.css';
import axios from 'axios';

export default class App extends Component {
    static displayName = App.name;

    state = {
        prods: []
    }

    constructor() {
        super();
        axios.get('/home').then(res => {
            this.setState({ prods: res.data })
        })
    }

  render() {
    return (
        <Layout>
           {/* <div>
                {this.state.prods.map(prod => <h2>{prod.title}</h2>)}
            </div>*/}
            <Routes>
               
          {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
              return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
          })}
        </Routes>
        </Layout>

    );
  }
}
