import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function TenantLoginForm() {
  const [tenantName, setTenantName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/tenants/login', { tenantName });
      router.push(`/tenant/${tenantName}/dashboard`);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tenantName">Tenant Name:</label>
      <input
        id="tenantName"
        type="text"
        value={tenantName}
        onChange={(e) => setTenantName(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
