import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ResetPassword() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get('password'));
    const confirm = String(form.get('confirm'));

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Password updated successfully');
      navigate('/account');
    }, 600);
  };

  return (
    <main className="simple-page">
      <span className="eyebrow">YOUR ACCOUNT</span>
      <h1>Make a fresh start.</h1>

      <form onSubmit={handleSubmit}>
        <label>
          NEW PASSWORD
          <input name="password" type="password" minLength={6} required />
        </label>
        <label>
          CONFIRM PASSWORD
          <input name="confirm" type="password" minLength={6} required />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Updating…' : 'Update password'}
        </button>
      </form>

      <Link to="/auth" className="underlined-link mt-6 block">
        Back to sign in
      </Link>
    </main>
  );
}
