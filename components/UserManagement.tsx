import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/types/user';

export default function UserManagement({ tenantName }: { tenantName: string }) {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/api/users?tenant=${tenantName}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const addUser = async () => {
    try {
      await axios.post(`/api/users`, { tenantName, email, password });
      fetchUsers();
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>
    </div>
  );
}
