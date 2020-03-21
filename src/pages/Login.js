import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { SET_ADMIN } from '../constants';
import { AuthContext } from '../AuthConfig';

const Login = () => {
  const handleSubmit = event => {
    event.preventDefault();
  };

  const { authDispatch } = useContext(AuthContext);

  const ADMIN_LOGIN_MUTATION = gql`
    mutation adminLogin($email: String!, $password: String!) {
      adminLogin(email: $email, password: $password) {
        token
      }
    }
  `;

  const _onLogin = data => {
    authDispatch({
      type: SET_ADMIN,
      payload: data.adminLogin
    });
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>
      <Mutation
        mutation={ADMIN_LOGIN_MUTATION}
        variables={{ email, password }}
        onCompleted={data => _onLogin(data)}
        onError={err => console.error(err)}
      >
        {mutation => (
          <Button variant="primary" type="submit" onClick={mutation}>
            Submit
          </Button>
        )}
      </Mutation>
    </Form>
  );
};

export default Login;
