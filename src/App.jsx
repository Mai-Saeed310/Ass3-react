import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from './User';

export default function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleAddUser = () => {
    if (isEditing) {
      axios.put(`http://localhost:5000/users/${editUserId}`, newUser)
        .then(response => {
          setUsers(users.map(user =>
            user.id === editUserId ? response.data : user
          ));
          setNewUser({ name: '', email: '' });
          setIsEditing(false);
          setEditUserId(null);
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      axios.post('http://localhost:5000/users', newUser)
        .then(response => {
          setUsers([...users, response.data]);
          setNewUser({ name: '', email: '' });
        })
        .catch(error => console.error('Error adding user:', error));
    }
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    const userToEdit = users.find(user => user.id === id);
    setNewUser({ name: userToEdit.name, email: userToEdit.email });
    setIsEditing(true);
    setEditUserId(id);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div className="container mx-auto p-6">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">User Management System</h1>
      </div>

      {/* User Form */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded w-full md:w-1/4"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded w-full md:w-1/4"
        />
        <button
          onClick={handleAddUser}
          className={`px-6 py-2 rounded w-full md:w-auto text-white transition-colors duration-200 ${
            isEditing
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isEditing ? 'Update User' : 'Add User'}
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <User
                key={user.id}
                user={user}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
