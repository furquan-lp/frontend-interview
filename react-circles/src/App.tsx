import React from 'react';
import { useState } from 'react';

function App() {
  const [clicks, setClicks] = useState<{ x: number, y: number }[] | null>(null);
  const [undoBuffer, setUndoBuffer] = useState<{ x: number, y: number }[] | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setClicks(clicks === null ?
      [{ x: e.clientX, y: e.clientY }] : [...clicks, { x: e.clientX, y: e.clientY }]);
  };

  const handleUndo = () => {
    if (clicks !== null) {
      setUndoBuffer(undoBuffer === null ? [clicks[clicks.length - 1]] : [...undoBuffer, clicks[clicks.length - 1]]);
      setClicks(clicks.length === 1 ? null : clicks.slice(0, clicks.length - 1));
    }
  };

  const handleRedo = () => {
    if (undoBuffer !== null) {
      setClicks(clicks === null ?
        [undoBuffer[undoBuffer.length - 1]] : [...clicks, undoBuffer[undoBuffer.length - 1]]);
      setUndoBuffer(undoBuffer.length === 1 ? null : undoBuffer.slice(0, undoBuffer.length - 1));
    }
  };

  const handleReset = () => {
    setClicks(null);
    setUndoBuffer(null);
  };

  return (
    <main className='bg-blue-400'>
      <header className='flex items-center justify-between'>
        <button className='m-1 mx-2 p-1.5 rounded-md bg-gray-100 active:bg-gray-400 hover:bg-gray-200'
          onClick={handleReset}>
          Reset
        </button>
        <span className='text-white text-2xl font-bold'>React Circles</span>
        <span>
          <button className='m-1 p-1.5 rounded-md bg-gray-100 active:bg-gray-400 hover:bg-gray-200'
            onClick={handleUndo}>
            Undo
          </button>
          <button className='m-1 p-1.5 rounded-md bg-gray-100 active:bg-gray-400 hover:bg-gray-200'
            onClick={handleRedo}>
            Redo
          </button>
        </span>
      </header>
      <div className='h-screen bg-blue-50' onClick={handleClick}>
        <svg height='100%' width='100%'>
          {clicks && clicks.map((c, i) =>
            <circle cx={c.x} cy={c.y - 30} r='30' stroke='gray' strokeWidth='1' fill='lightblue'
              key={'circles' + i + clicks} />
          )}
        </svg>
      </div>
    </main>
  );
}

export default App;
