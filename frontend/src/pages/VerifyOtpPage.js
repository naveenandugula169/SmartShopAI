import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';

export default function VerifyOtpPage() {
  const location = useLocation();
  const prefillEmail = location?.state?.email || '';
  const [email, setEmail] = useState(prefillEmail);
  const [code, setCode] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await authAPI.verifyOtp({ email, code });
      setMessage(res.message || 'Verified');
      // Redirect to login after a short delay
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setMessage(err.message || JSON.stringify(err));
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto' }}>
      <h2>Verify your account</h2>
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Code</label>
          <input value={code} onChange={(e) => setCode(e.target.value)} required />
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit">Verify</button>
        </div>
      </form>
      {message && <div style={{ marginTop: 12 }}>{message}</div>}
    </div>
  );
}
