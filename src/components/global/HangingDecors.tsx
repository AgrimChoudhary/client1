import React from 'react';

const HangingDecors: React.FC = () => (
  <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50, pointerEvents: 'none', display: 'flex', justifyContent: 'space-around', padding: '0 10px' }}>
    {[...Array(5)].map((_, i) => (
      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '1px', height: `${30 + i % 2 * 12}px`, background: 'linear-gradient(to bottom, rgba(255,215,0,0.6), rgba(255,215,0,0.1))' }}/>
        <div style={{ fontSize: i % 2 === 0 ? '16px' : '12px', filter: 'drop-shadow(0 0 6px #FFD700)' }}>
          {i % 2 === 0 ? '🪔' : '🌼'}
        </div>
      </div>
    ))}
  </div>
);

export default HangingDecors;
