import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../PagesCss/Contact.css";
import {
  getContacts,
  postContacts,
  deleteContact,
  putContact,
} from "../../API/AxiosService.js";

function Contact() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [editId, setEditId] = useState(null); // State to track which user ID is being edited

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await getContacts();
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching contacts", error);
      setUsers([]);
    }
  };

  const addContact = async () => {
    try {
      const response = await postContacts({ name, email, phone });
      if (response && response.data) {
        alert(response.data.message); // Ensure response.data.message exists
        reset();
        fetchContacts();
      } else {
        console.error("Unexpected response:", response);
        alert("Failed to add contact. Please try again.");
      }
    } catch (error) {
      console.error("Error adding contact", error);
      alert("Failed to add contact. Please try again.");
    }
  };

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleDelete = async (userId) => {
    try {
      await deleteContact(userId);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user._id === userId);
    if (userToEdit) {
      setName(userToEdit.name); // Set name field with user's current name
      setEmail(userToEdit.email); // Set email field with user's current email
      setPhone(userToEdit.phone); // Set phone field with user's current phone
      setEditMode(true); // Enable edit mode
      setEditId(userId); // Set the ID of the user being edited
    } else {
      console.error(`User with ID ${userId} not found.`);
    }
  };

  const updateContactHandler = async () => {
    try {
      const updatedContact = { name, email, phone };
      const response = await putContact(editId, updatedContact);
      alert(response.data.message); // Assuming backend sends a message on success
      reset();
      fetchContacts();
      setEditMode(false); // Disable edit mode after update
      setEditId(null); // Clear edit ID
    } catch (error) {
      console.error('Error updating contact', error);
      alert('Failed to update contact. Please try again.');
    }
  };

  return (
    <Container className="custom-container">
      <h1>Contact Me</h1>
      <div className="form-container">
        <Form>
          <Form.Group controlId="exampleForm.name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <div className="button-group">
            {/* Update button text based on editMode */}
            <Button variant="primary" onClick={editMode ? updateContactHandler : addContact}>
              {editMode ? 'Update' : 'Submit'}
            </Button>{" "}
            <Button variant="secondary" onClick={reset}>
              Clear
            </Button>{" "}
          </div>
        </Form>
      </div>

      {users.length > 0 && (
        <div className="users-container">
          <h2>Users List</h2>
          <ul className="users-list">
            {users.map((user, index) => (
              <li key={index} className="user-item">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <Button variant="warning" onClick={() => handleEdit(user._id)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(user._id)}>
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
