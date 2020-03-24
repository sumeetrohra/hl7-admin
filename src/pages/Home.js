import React from 'react';
import { Button } from 'react-bootstrap';

const Home = ({ history }) => {
  const {
    location: { state }
  } = history;
  return (
    <>
      <h3>Home</h3>
      {state && <p>{state.message}</p>}
      <hr />
      <Button
        style={{ margin: '10px', marginLeft: 0 }}
        variant="primary"
        type="button"
        onClick={() => history.push('/add/hospital')}
      >
        Add Hospital
      </Button>
      <br />
      <Button
        style={{ margin: '10px', marginLeft: 0 }}
        variant="primary"
        type="button"
        onClick={() => history.push('/add/mp')}
      >
        Add Medical Practitioner
      </Button>
    </>
  );
};

export default Home;
