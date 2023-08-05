import React from 'react';
import { useState } from "react";

function App() {
  const [clicks, setClicks] = useState<{ x: number, y: number }[] | null>(null);
  console.log(clicks);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setClicks(clicks === null ?
      [{ x: e.clientX, y: e.clientY }] : [...clicks, { x: e.clientX, y: e.clientY }]);
  };

  const handleReset = () => {
    setClicks(null);
    console.log('cleared')
  };

  return (
    <main>
      <header>
        <button className='p-1 bg-gray-100 active:bg-gray-400 hover:bg-gray-200' onClick={handleReset}>Reset</button>
      </header>
      <div className='h-screen bg-red-50' onClick={handleClick}>
        <svg height='100%' width='100%'>
          {clicks && clicks.map((c, i) =>
            <circle cx={c.x} cy={c.y} r='40' stroke='black' strokeWidth='3' fill='red' key={i + clicks.length} />
          )}
        </svg>
      </div>
    </main>
  );
}

export default App;
