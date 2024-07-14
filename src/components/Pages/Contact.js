import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../PagesCss/Contact.css"; // Ensure this path is correct
import { getContacts, postContacts } from "../../API/AxiosService.js";

function Contact() {
  const [users, setUsers] = useState([]); // State for storing user data
  const [name, setName] = useState(""); // State for name input
  const [email, setEmail] = useState(""); // State for email input
  const [phone, setPhone] = useState(""); // State for phone input

  // Fetching contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  // Function to fetch contacts from the server
  const fetchContacts = async () => {
    try {
        const response = await getContacts();
        console.log('response', response.data); // Logging the response for debugging
        setUsers(response.data.data); // Setting the fetched data to the state
    } catch (error) {
        console.error('Error fetching contacts', error); // Logging any errors
    }
  };

  // Function to add a contact
  const addContact = async () => {
    try {
      const response = await postContacts({
        name,
        email,
        phone,
      });
      console.log('response', response.data); // Logging the response for debugging
      reset(); // Clearing the form
      alert(response.data.message); // Displaying success message
      fetchContacts(); // Refreshing the contact list
    } catch (error) {
      console.error('Error adding contact', error); // Logging any errors
    }
  };

  // Function to reset form inputs
  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <Container className="custom-container">
      <h1>Contact Me</h1>
      <div className="form-container">
        <Form>
          <Form.Group className="nameRow" controlId="exampleForm.name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="emailRow" controlId="exampleForm.email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="phoneRow" controlId="exampleForm.phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <div className="button-group">
            <Button variant="primary" onClick={addContact}>
              Submit
            </Button>{' '}
            <Button variant="secondary" onClick={reset}>
              Clear
            </Button>{' '}
          </div>
        </Form>
      </div>

      {users.length > 0 && (
        <div className="users-container">
          <h2>Users List</h2>
          <ul className="users-list">
            {users.map((user, index) => (
              <li key={index} className="user-item">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}

export default Contact;
