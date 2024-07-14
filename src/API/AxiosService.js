import axios from "axios";

// Function to get contacts
const getContacts = async () => {
  return await axios.get("http://localhost:5000/contacts");
};

// Function to post new contact
const postContacts = async (data) => {
  return await axios.post("http://localhost:5000/contacts", data);
};

// Function to delete a contact
const deleteContact = async (id) => {
  return await axios.delete(`http://localhost:5000/contacts/${id}`);
};

// Exporting functions for use in other files
export { getContacts, postContacts, deleteContact };
