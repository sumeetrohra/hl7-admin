import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { SET_ADMIN } from '../constants';
import { AuthContext } from '../AuthConfig';
import Spinner from '../components/Spinner';
import { validateEmail } from '../utils';

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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Mutation
        mutation={ADMIN_LOGIN_MUTATION}
        variables={{ email, password }}
        onCompleted={data => _onLogin(data)}
        onError={err => {
          setError('Invalid email or password');
          setLoading(false);
        }}
      >
        {adminLogin => (
          <Button
            variant="primary"
            type="submit"
            style={{ opacity: loading ? 0.7 : 1 }}
            disabled={loading ? true : false}
            onClick={() => {
              console.log('clicked');
              setError();
              if (validateEmail(email) && password) {
                setLoading(true);
                adminLogin();
              } else {
                setError('please enter valid data');
              }
            }}
          >
            {loading ? <Spinner /> : 'Login'}
          </Button>
        )}
      </Mutation>
      <hr />
      <p>Not Admin?</p>
      <Button as="a" href="https://hl7-patient.netlify.com">
        Go To Patient Page
      </Button>
      {'  '}
      <Button as="a" href="https://hl7-mp.netlify.com">
        Go To Medical Practitioner Page
      </Button>
    </Form>
  );
};

export default Login;
