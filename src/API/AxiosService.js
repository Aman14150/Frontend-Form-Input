import axios from "axios";

// Function to get contacts
const getContacts = async () => {
  return await axios.get("http://localhost:5000/contacts");
};

// Function to post new contact
const postContacts = async (data) => {
  return await axios.post("http://localhost:5000/submit-form", data);
};

// Exporting functions for use in other files
export { getContacts, postContacts };
