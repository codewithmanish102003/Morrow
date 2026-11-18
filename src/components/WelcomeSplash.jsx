import React, { useState, useEffect } from 'react';

export default function WelcomeSplash() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start smooth fade-out after 1.7s
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1700);

    // Complete removal after 2.25s
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 2250);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`welcome-splash-overlay ${fading ? 'splash-exit' : ''}`}
      onClick={() => {
        setFading(true);
        setTimeout(() => setVisible(false), 300);
      }}
      role="status"
      aria-label="Welcome to Morrow"
    >
      <div className="welcome-splash-content">
        <span className="welcome-splash-eyebrow">EDITORIAL COMMERCE</span>

        <h1 className="welcome-splash-title">
          MORROW <span className="welcome-splash-star">✳</span>
        </h1>

        <div className="welcome-splash-line" />

        <p className="welcome-splash-tagline">
          For all the moments <em>in between.</em>
        </p>
      </div>
    </div>
  );
}
