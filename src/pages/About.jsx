import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main>
      <section className="page-intro">
        <span className="eyebrow">THE STORY OF MORROW</span>
        <h1>
          For the moments
          <br />
          <em>in between.</em>
        </h1>
        <p>Good things don’t have to wait for special occasions.</p>
      </section>

      <section className="story-band about-story">
        <img
          src="/assets/hero-campaign-DwTIbiq1.jpg"
          alt="Everyday moments in the sun"
        />
        <div>
          <span className="eyebrow">WHAT WE BELIEVE</span>
          <h2>
            Live a little
            <br />
            <em>more presently.</em>
          </h2>
          <p>
            Morrow is a collection of thoughtful things for real life: the shirt you find yourself wearing twice a week, the bag that goes everywhere, the drink that turns five minutes into a moment.
          </p>
          <p>
            We curate across categories because the best days aren't neatly sorted. They're a little of everything.
          </p>
          <Link to="/shop" className="underlined-link">
            Explore the collection ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
