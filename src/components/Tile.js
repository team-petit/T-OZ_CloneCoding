// Tile.js
import React from 'react';
import classnames from 'classnames';
import '../Tile.css';

const Tile = ({ value }) => {
  const tileClass = classnames('tile', {
    'tile-2': value === 2,
    'tile-4': value === 4,
    'tile-8': value === 8,
    'tile-16': value === 16,
    'tile-32': value === 32,
    'tile-64': value === 64,
    'tile-128': value === 128,
    'tile-256': value === 256,
    'tile-512': value === 512,
    'tile-1024': value === 1024,
    'tile-2048': value === 2048,
  });

  return <div className={tileClass}>{value !== 0 && value}</div>;
};

export default Tile;
