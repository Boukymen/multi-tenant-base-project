import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [tenant, setTenant] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/tenant', {
      method: 'POST',
      body: JSON.stringify({ tenant }),
    });

    if (res.ok) {
      const { domain } = await res.json();
      router.push(`https://${domain}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Tenant Name"
        value={tenant}
        onChange={(e) => setTenant(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
