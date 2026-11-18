import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { toast } from 'sonner';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export default function Auth() {
  const { user, signIn, signUp } = useStore();
  const navigate = useNavigate();

  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [noticeSent, setNoticeSent] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/account');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '').trim();
    const name = String(form.get('name') || '').trim();

    if (mode === 'forgot') {
      setTimeout(() => {
        setLoading(false);
        setNoticeSent(true);
        toast.success('Password reset link sent to your email');
      }, 500);
      return;
    }

    if (mode === 'signup') {
      setTimeout(async () => {
        await signUp(name, email, password);
        setLoading(false);
        navigate('/account');
      }, 500);
      return;
    }

    // login
    setTimeout(async () => {
      await signIn(email, password);
      setLoading(false);
      navigate('/account');
    }, 500);
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    setTimeout(async () => {
      await signIn('google.user@example.com', 'password');
      setLoading(false);
      navigate('/account');
    }, 600);
  };

  return (
    <main className="min-h-[82vh] flex items-center justify-center p-6 bg-background">
      <div className="auth-modal-dialog shadow-xl border border-border">
        <div className="text-center mb-6">
          <Link to="/" className="wordmark inline-block text-xl">
            MORROW <span>✳</span>
          </Link>
        </div>

        <div className="auth-modal-header text-center mb-6">
          <span className="eyebrow block text-[10px] font-bold tracking-widest text-muted-foreground mb-1">
            YOUR MORROW
          </span>
          <h2 className="font-serif text-3xl font-normal text-foreground mb-2">
            {mode === 'signup'
              ? 'Make yourself at home.'
              : mode === 'forgot'
              ? 'Let’s get you back.'
              : 'Welcome back.'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {mode === 'signup'
              ? 'A few details, then the good things begin.'
              : mode === 'forgot'
              ? 'We’ll send a password reset link to your inbox.'
              : 'A good day starts here.'}
          </p>
        </div>

        {noticeSent ? (
          <div className="payment-notice my-4">
            Check your email for your {mode === 'forgot' ? 'password reset' : 'confirmation'} link.
            <button
              type="button"
              className="mt-3 block text-xs underline font-semibold text-primary"
              onClick={() => {
                setMode('login');
                setNoticeSent(false);
              }}
            >
              Back to sign in
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="auth-inputs-form">
              {mode === 'signup' && (
                <label className="auth-field-label">
                  <span>FULL NAME</span>
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="auth-text-input"
                  />
                </label>
              )}

              <label className="auth-field-label">
                <span>EMAIL ADDRESS</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="auth-text-input"
                />
              </label>

              {mode !== 'forgot' && (
                <label className="auth-field-label">
                  <span>PASSWORD</span>
                  <input
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    placeholder="At least 6 characters"
                    className="auth-text-input"
                  />
                </label>
              )}

              {error && (
                <p role="alert" className="form-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="auth-primary-btn"
                disabled={loading}
              >
                {loading
                  ? 'One moment…'
                  : mode === 'signup'
                  ? 'Create account'
                  : mode === 'forgot'
                  ? 'Send reset link'
                  : 'Sign in'}
              </button>
            </form>

            {mode !== 'forgot' && (
              <>
                <div className="auth-divider-line">
                  <span>OR</span>
                </div>

                <button
                  type="button"
                  className="auth-google-btn"
                  onClick={handleGoogleAuth}
                  disabled={loading}
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </button>
              </>
            )}
          </>
        )}

        <div className="auth-footer-links mt-6 pt-2 border-t border-border/40">
          {mode === 'login' ? (
            <>
              <button
                type="button"
                className="auth-switch-link text-xs"
                onClick={() => {
                  setMode('signup');
                  setNoticeSent(false);
                  setError('');
                }}
              >
                New here? Create account
              </button>
              <button
                type="button"
                className="auth-switch-link text-xs"
                onClick={() => {
                  setMode('forgot');
                  setNoticeSent(false);
                  setError('');
                }}
              >
                Forgot password?
              </button>
            </>
          ) : (
            <button
              type="button"
              className="auth-switch-link text-xs w-full text-center"
              onClick={() => {
                setMode('login');
                setNoticeSent(false);
                setError('');
              }}
            >
              ← Back to sign in
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
