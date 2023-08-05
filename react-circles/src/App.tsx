import React from 'react';
import { useState } from "react";

function App() {
  const [clicks, setClicks] = useState([{}]);
  console.log(clicks);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setClicks(Object.keys(clicks[0]).length === 0 ?
      [{ x: e.clientX, y: e.clientY }] : [...clicks, { x: e.clientX, y: e.clientY }]);
  };

  return (
    <main className='h-screen bg-red-50' onClick={handleClick}>
    </main>
  );
}

export default App;
