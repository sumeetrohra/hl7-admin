import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { Mutation, withApollo } from 'react-apollo';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Spinner from '../components/Spinner';
import { validateEmail } from '../utils';

const AddMedicalPractitioner = ({ client }) => {
  const history = useHistory();

  const [hospitals, setHospitals] = useState([]);

  const [mpId, setMpId] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [sex, setSex] = useState('');
  const [address, setAddress] = useState('');
  const [degree, setDegree] = useState('');
  const [field, setField] = useState('');
  const [selectedHospitalId, setSelectedHospitalId] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const ADD_MEDICAL_PRACTITIONER_MUTATION = gql`
    mutation addMedicalPractitioner(
      $mpId: Int!
      $lastName: String!
      $firstName: String!
      $middleName: String!
      $email: String!
      $password: String!
      $dob: DateTime!
      $sex: String!
      $address: String!
      $degree: String!
      $field: String!
      $hospitalId: String!
    ) {
      addMedicalPractitioner(
        mpId: $mpId
        lastName: $lastName
        firstName: $firstName
        middleName: $middleName
        email: $email
        password: $password
        dob: $dob
        sex: $sex
        address: $address
        degree: $degree
        field: $field
        hospitalId: $hospitalId
      ) {
        id
      }
    }
  `;

  const GET_HOSPITALS_QUERY = gql`
    query getHospitals {
      getHospitals {
        id
        name
      }
    }
  `;

  useEffect(() => {
    (async function() {
      const results = await client.query({
        query: GET_HOSPITALS_QUERY,
        fetchPolicy: 'network-only'
      });
      setHospitals(results.data.getHospitals);
    })();
  }, [GET_HOSPITALS_QUERY, client]);

  return (
    <>
      <h3>Add Medical Practitioner</h3>
      <Form onSubmit={e => e.preventDefault()}>
        <Form.Group>
          <Form.Label>Medical practitioner ID</Form.Label>
          <Form.Control
            type="number"
            required
            value={mpId}
            onChange={e => setMpId(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            required
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            required
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Middle name</Form.Label>
          <Form.Control
            type="text"
            required
            value={middleName}
            onChange={e => setMiddleName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>DOB</Form.Label>
          <Form.Control
            type="date"
            required
            value={dob}
            onChange={e => setDob(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Sex</Form.Label>
          <Form.Control
            as="select"
            required
            onChange={e => setSex(e.target.value)}
          >
            <option>Select one...</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>address</Form.Label>
          <Form.Control
            type="text"
            required
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="text"
            required
            value={degree}
            onChange={e => setDegree(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Field</Form.Label>
          <Form.Control
            type="text"
            required
            value={field}
            onChange={e => setField(e.target.value)}
          />
        </Form.Group>
        {hospitals.length > 0 ? (
          <Form.Group>
            <Form.Label>Hospital</Form.Label>
            <Form.Control
              as="select"
              required
              onChange={e => setSelectedHospitalId(e.target.value)}
            >
              <option>Select one...</option>
              {hospitals.map(({ id, name }, i) => (
                <option key={i} value={id}>
                  {name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        ) : (
          <>
            <p>Fetching Hospitals</p>
            <Spinner />
            <br />
          </>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Mutation
          mutation={ADD_MEDICAL_PRACTITIONER_MUTATION}
          variables={{
            mpId,
            lastName,
            firstName,
            middleName,
            email,
            password,
            dob,
            sex,
            address,
            degree,
            field,
            hospitalId: selectedHospitalId
          }}
          onError={err => {
            setError('Some Error occurred');
            setLoading(false);
          }}
          onCompleted={res => {
            setLoading(false);
            history.push('/', {
              message: 'Add medical practitioner successful'
            });
          }}
        >
          {addMedicalPractitioner => (
            <Button
              type="button"
              variant="primary"
              style={{ opacity: loading ? 0.7 : 1 }}
              disabled={loading ? true : false}
              onClick={() => {
                setError();
                if (
                  mpId &&
                  lastName &&
                  firstName &&
                  middleName &&
                  password &&
                  dob &&
                  sex &&
                  address &&
                  degree &&
                  field &&
                  selectedHospitalId &&
                  validateEmail(email)
                ) {
                  setLoading(true);
                  addMedicalPractitioner();
                } else if (!validateEmail(email)) {
                  setError('Please enter a valid email address');
                } else {
                  setError('All fields are required');
                }
              }}
            >
              {loading ? <Spinner /> : 'Add Medical Practitioner'}
            </Button>
          )}
        </Mutation>
      </Form>
    </>
  );
};

export default withApollo(AddMedicalPractitioner);
