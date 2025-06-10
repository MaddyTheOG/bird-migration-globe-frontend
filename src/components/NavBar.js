import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{
      background: '#111',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 10
    }}>
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/">Home</Link>
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/about">About</Link>
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/art">Art</Link>
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/conservation">Conservation</Link>
      <Link style={{ color: 'white', textDecoration: 'none' }} to="/habitats">Habitats</Link>
    </nav>
  );
};

export default NavBar;
