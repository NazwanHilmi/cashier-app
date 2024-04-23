import React from 'react';

const GoogleMapEmbed = () => (
  <div className="google-map z-10">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79185.9079653676!2d7.031662135739028!3d51.667898772441184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8fac02b965ec7%3A0x682a9bb455b36618!2sMarl%2C%20Germany!5e0!3m2!1sen!2sid!4v1713847001215!5m2!1sen!2sid"
      width="450"
      height="450"
      style={{ border: '2px solid black' }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
);

export default GoogleMapEmbed;
