import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function Create(props) {
  const [objective, setNote] = useState({ _id: '', title: '', content: '' });
  const [showLoading, setShowLoading] = useState(false);
 // const apiUrl = "http://localhost:8080/api/notes";
  const apiUrl = "http://localhost:8080/users/1/objectives";

  const saveObjective = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { title: objective.title, owner: objective.owner};
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data.id)
        //props.history.push('/show/' + result.data._id)
        //props.history.push('/list/' )
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setObjective({...objective, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={saveObjective}>
          <Form.Group>
            <Form.Label>Objective</Form.Label>
            <Form.Control type="text" name="title" id="title" placeholder="Enter objective title" value={objective.title} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Objective Description</Form.Label>
            <Form.Control as="textarea" name="content" id="content" rows="3" placeholder="Enter objective description" value={objective.content} onChange={onChange} />
          </Form.Group>
         
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(Create);