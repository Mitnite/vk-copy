import React, {FC} from "react";

import {Routes, Route, HashRouter} from 'react-router-dom';

import {routes} from './dataRoutes'
import Layout from "../layout/Layout";
import {useAuth} from "../providers/UseAuth";
import Auth from "../pages/auth/Auth";


const Router: FC = () => {


  const {user} = useAuth()

  return (
      <div>
        <HashRouter>
          <Layout>
            <Routes>
              {routes.map(route => {
                if (route.auth && !user) {
                  return <Route key={`route /auth`} path='/' element={<Auth/>}/>
                }
                return (
                    <Route key={`route ${route.path}`} path={route.path} element={<route.component/>}/>
                )
              })}
            </Routes>
          </Layout>
        </HashRouter>
      </div>
  )
}
export default Router
