import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';



const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [newContact, setNewContact] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    country: '',
    city: '',
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/employees');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this contact!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
  
      if (confirmed.isConfirmed) {
        await fetch(`http://127.0.0.1:8000/api/employees/${id}`, {
          method: 'DELETE',
        });
        fetchContacts();
        toast.success('Contact deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };
  

  const handleEdit = (contact) => {
    setEditingContact({ ...contact });
  };

  const handleSave = async () => {
    if (!editingContact.full_name || !editingContact.email || !editingContact.phone_number || !editingContact.country || !editingContact.city) {
      toast.error('Please fill in all the fields.');
      return;
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editingContact.email)) {
      toast.error('Invalid email address.');
      return;
    }
  
    if (!/^\d+$/.test(editingContact.phone_number)) {
      toast.error('Phone number must be a number.');
      return;
    }
  
    try {
      await fetch(`http://127.0.0.1:8000/api/employees/${editingContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingContact),
      });
      setEditingContact(null);
      fetchContacts();
      toast.success('Contact updated successfully.');
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Error updating contact. Please try again.');
    }
  };
  
  const handleAdd = async () => {
    if (!newContact.full_name || !newContact.email || !newContact.phone_number || !newContact.country || !newContact.city) {
      toast.error('Please fill in all the fields.');
      return;
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newContact.email)) {
      toast.error('Invalid email address.');
      return;
    }
  
    if (!/^\d+$/.test(newContact.phone_number)) {
      toast.error('Phone number must be a number.');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });
  
      if (response.status === 201) {
        setNewContact({
          full_name: '',
          email: '',
          phone_number: '',
          country: '',
          city: '',
        });
        fetchContacts();
        toast.success('Contact added successfully.');
      } else if (response.status === 409) {
        toast.error('Email already exists. Please add another email.');
      } else {
        toast.error('Error adding contact. Please try again.');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      toast.error('Error adding contact. Please try again.');
    }
  };

  

  const handleCancel = () => {
    setEditingContact(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (editingContact && editingContact.id) {
      setEditingContact((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setNewContact((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  return (
    <div className="container">
<h1 className="font-weight-bold">Contact List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Country</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                {editingContact && editingContact.id === contact.id ? (
                  <input
                    type="text"
                    className="form-control"
                    name="full_name"
                    value={editingContact.full_name}
                    onChange={handleInputChange}
                  />
                ) : (
                  contact.full_name
                )}
              </td>
              <td>
                {editingContact && editingContact.id === contact.id ? (
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={editingContact.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  contact.email
                )}
              </td>
              <td>
                {editingContact && editingContact.id === contact.id ? (
                  <input
                    type="text"
                    className="form-control"
                    name="phone_number"
                    value={editingContact.phone_number}
                    onChange={handleInputChange}
                  />
                ) : (
                  contact.phone_number
                )}
              </td>
              <td>
                {editingContact && editingContact.id === contact.id ? (
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={editingContact.country}
                    onChange={handleInputChange}
                  />
                ) : (
                  contact.country
                )}
              </td>
              <td>
                {editingContact && editingContact.id === contact.id ? (
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={editingContact.city}
                    onChange={handleInputChange}
                  />
                ) : (
                  contact.city
                )}
              </td>
              <td>
                {editingContact && editingContact.id === contact.id ? (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(contact)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                name="full_name"
                value={newContact.full_name}
                onChange={(e) =>
                  setNewContact({ ...newContact, full_name: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                name="email"
                value={newContact.email}
                onChange={(e) =>
                  setNewContact({ ...newContact, email: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                name="phone_number"
                value={newContact.phone_number}
                onChange={(e) =>
                  setNewContact({ ...newContact, phone_number: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                name="country"
                value={newContact.country}
                onChange={(e) =>
                  setNewContact({ ...newContact, country: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                name="city"
                value={newContact.city}
                onChange={(e) =>
                  setNewContact({ ...newContact, city: e.target.value })
                }
              />
            </td>
            <td>
              <button className="btn btn-success" onClick={handleAdd}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default ContactList;
