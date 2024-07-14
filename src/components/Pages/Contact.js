import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function Contact() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const addUser = () => {
    const newUser = { name, email, phone };
    setUsers([...users, newUser]);
    // Clear form after submission
    setName("");
    setEmail("");
    setPhone("");
  };

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user._id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <Container className="container">
      <h1>Contact Me</h1>
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>
      <div>
        <Button variant="primary" onClick={addUser}>
          Submit
        </Button>
        <Button variant="secondary" onClick={reset}>
          Clear
        </Button>
      </div>
      {users.length > 0 && (
        <div>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <Button variant="danger" onClick={() => deleteUser(user._id)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}

export default Contact;
