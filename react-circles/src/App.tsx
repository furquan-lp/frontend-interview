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
    <main>
      <header className='flex items-center justify-between'>
        <button className='m-1 mx-2 p-2 rounded-md bg-gray-100 active:bg-gray-400 hover:bg-gray-200'
          onClick={handleReset}>
          Reset
        </button>
        <span>
          <button className='m-1 p-2 rounded-md bg-gray-100 active:bg-gray-400 hover:bg-gray-200'
            onClick={handleUndo}>
            Undo
          </button>
          <button className='m-1 p-2 rounded-md bg-gray-100 active:bg-gray-400 hover:bg-gray-200'
            onClick={handleRedo}>
            Redo
          </button>
        </span>
      </header>
      <div className='h-screen bg-red-50' onClick={handleClick}>
        <svg height='100%' width='100%'>
          {clicks && clicks.map((c, i) =>
            <circle cx={c.x} cy={c.y - 30} r='30' stroke='black' strokeWidth='1' fill='lightblue' key={i + clicks.length} />
          )}
        </svg>
      </div>
    </main>
  );
}

export default App;
