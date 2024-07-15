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
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      const response = await getContacts();
      console.log("Fetched contacts:", response.data); 
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching contacts", error);
      setUsers([]);
    }
  };

  // Add a new contact
  const addContact = async () => {
    const confirmSubmit = window.confirm("Are you sure you want to add this contact?");
    if (confirmSubmit) {
      try {
        const response = await postContacts({ name, email, phone });
        console.log("Add contact response:", response.data); 
        if (response && response.data) {
          alert(response.data.message);
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
    } else {
      console.log("Addition canceled");
    }
  };

  // Reset form fields
  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  // Delete a contact
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (confirmDelete) {
      try {
        await deleteContact(userId);
        console.log("Deleted user ID:", userId); // Log deleted user ID
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        alert("Contact deleted successfully"); 
      } catch (error) {
        console.error("Error deleting contact", error);
        alert("Failed to delete contact. Please try again."); 
      }
    } else {
      console.log("Deletion canceled");
    }
  };

  // Update a contact
  const updateContactHandler = async () => {
    const confirmSubmit = window.confirm("Are you sure you want to update this contact?");
    if (confirmSubmit) {
      try {
        const updatedContact = { name, email, phone };
        const response = await putContact(editId, updatedContact);
        console.log("Update contact response:", response.data); 
        alert(response.data.message);
        reset();
        fetchContacts();
        setEditMode(false);
        setEditId(null);
      } catch (error) {
        console.error("Error updating contact", error);
        alert("Failed to update contact. Please try again.");
      }
    } else {
      console.log("Update canceled");
    }
  };

  // Edit a contact
  const handleEdit = (userId) => {
    let userToEdit = null;
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        userToEdit = users[i];
        break;
      }
    }
    if (userToEdit !== null) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setPhone(userToEdit.phone);
      setEditMode(true);
      setEditId(userId);
      console.log("Editing user:", userToEdit);
    } else {
      console.error("User with ID " + userId + " not found.");
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
              pattern="[0-9]*"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <div className="button-group">
            <Button
              variant="primary"
              onClick={editMode ? updateContactHandler : addContact}
            >
              {editMode ? "Update" : "Submit"}
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
