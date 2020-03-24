import React, { useEffect, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AuthContext } from './AuthConfig';
import { ADMIN, SET_ADMIN } from './constants';

import Login from './pages/Login';
import AddHospital from './pages/AddHospital';
import AddMedicalPractitioner from './pages/AddMedicalPractitioner';
import Home from './pages/Home';

const Router = () => {
  const { authState, authDispatch } = useContext(AuthContext);

  const admin = localStorage.getItem(ADMIN);

  useEffect(() => {
    if (admin) {
      authDispatch({
        type: SET_ADMIN,
        payload: JSON.parse(admin)
      });
    }
  }, [authDispatch, admin]);

  return (
    <Switch>
      {authState && authState.token ? (
        <>
          <Route exact path="/" component={Home} />
          <Route exact path="/add/mp" component={AddMedicalPractitioner} />
          <Route exact path="/add/hospital" component={AddHospital} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </>
      ) : (
        <>
          <Route exact path="/login" component={Login} />
          <Route path="*" render={() => <Redirect to="/login" />} />
        </>
      )}
    </Switch>
  );
};

export default Router;
