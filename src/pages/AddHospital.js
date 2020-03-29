import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Spinner from '../components/Spinner';

const AddHospital = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState();
  const [countryCode, setCountryCode] = useState();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ADD_HOSPITAL_MUTATION = gql`
    mutation addHospital(
      $name: String!
      $address: String!
      $city: String!
      $district: String!
      $pincode: Int!
      $countryCode: Int!
    ) {
      addHospital(
        name: $name
        address: $address
        city: $city
        district: $district
        pincode: $pincode
        countryCode: $countryCode
      ) {
        id
      }
    }
  `;

  return (
    <>
      <h3>Add Hospital</h3>
      <Form onSubmit={e => e.preventDefault()}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            required
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            required
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>District</Form.Label>
          <Form.Control
            type="text"
            required
            value={district}
            onChange={e => setDistrict(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            type="number"
            required
            value={pincode}
            onChange={e => setPincode(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>countryCode</Form.Label>
          <Form.Control
            type="number"
            required
            value={countryCode}
            onChange={e => setCountryCode(Number(e.target.value))}
          />
        </Form.Group>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Mutation
          mutation={ADD_HOSPITAL_MUTATION}
          variables={{
            name,
            address,
            city,
            district,
            pincode,
            countryCode
          }}
          onCompleted={res => {
            setError();
            setLoading(false);
            history.push('/', { message: 'Hospital added successfully' });
          }}
          onError={err => {
            setError('some error occurred');
          }}
        >
          {addHospital => (
            <Button
              variant="primary"
              type="submit"
              style={{ opacity: loading ? 0.7 : 1 }}
              disabled={loading ? true : false}
              onClick={() => {
                setError();
                if (
                  name &&
                  address &&
                  city &&
                  district &&
                  pincode &&
                  countryCode
                ) {
                  setLoading(true);
                  addHospital();
                } else {
                  setError('All fields are required');
                }
              }}
            >
              {loading ? <Spinner /> : 'Add Hospital'}
            </Button>
          )}
        </Mutation>
      </Form>
    </>
  );
};

export default AddHospital;
