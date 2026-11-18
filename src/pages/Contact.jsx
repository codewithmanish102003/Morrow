import React, { useState } from 'react';
import { toast } from 'sonner';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    toast.success('Your message has been sent. We will reply shortly.');
  };

  return (
    <main className="simple-page">
      <span className="eyebrow">WE’RE HERE TO HELP</span>
      <h1>Let’s talk.</h1>
      <p>
        Questions about an order, a piece, or just want to say hello? Drop us a note.
      </p>
      <a className="underlined-link" href="mailto:hello@morrow.example">
        hello@morrow.example ↗
      </a>

      {sent ? (
        <div className="payment-notice mt-6">
          Thank you for reaching out. We will get back to you within 24 hours.
        </div>
      ) : (
        <form className="simple-form mt-8" onSubmit={handleSubmit}>
          <h2>Send a note</h2>
          <label>
            NAME
            <input required placeholder="Your name" />
          </label>
          <label>
            EMAIL ADDRESS
            <input type="email" required placeholder="you@example.com" />
          </label>
          <label>
            MESSAGE
            <textarea required rows={4} placeholder="How can we help?" />
          </label>
          <button type="submit" className="mt-2">
            Send message
          </button>
        </form>
      )}

      <p className="small-note mt-8">
        This is a sample contact address. Replace it with your business email before launch.
      </p>
    </main>
  );
}
