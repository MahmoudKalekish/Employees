import React, { useState } from 'react';

const Contacts = ({ contacts }) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const validateEmail = (email) => {
    // Email validation logic here
    // You can use a library like validator.js for more advanced validation
    // For simplicity, we'll use a basic regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Phone number validation logic here
    // You can use a library like libphonenumber-js for more advanced validation
    // For simplicity, we'll check if it contains only digits
    const phoneNumberRegex = /^\d+$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePhoneNumber(phoneNumber)) {
      alert('Invalid email or phone number');
      return;
    }

    // Perform the form submission
    // ...

    // Clear the form fields
    setEmail('');
    setPhoneNumber('');
  };

  return (
    <div>
      <h1>Contact List</h1>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Country</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.full_name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone_number}</td>
              <td>{contact.country}</td>
              <td>{contact.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          required
        />
        <input
          type="text"
          placeholder="Country"
          required
        />
        <input
          type="text"
          placeholder="City"
          required
        />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch('http://localhost:8000/api/employees');
  const contacts = await res.json();

  return {
    props: { contacts },
  };
}

export default Contacts;
