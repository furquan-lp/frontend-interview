import React from 'react';
import { useState } from 'react';

function Instructions() {
  return (
    <div className='md:w-1/3 p-2 md:p-6 md:py-10 mx-auto text-xl md:text-2xl text-emerald-500'>
      Instructions:
      <ul className='list-disc text-base md:text-lg px-6 mt-4'>
        <li className='my-2'>Click anywhere on the screen to place a circle</li>
        <li className='my-2'>Press undo to remove the last circle placed</li>
        <li className='my-2'>Press redo to place back the last circle undone, regardless of how many circles have been
          placed</li>
        <li className='my-2'>Press reset to clear the entire screen</li>
        <li className='my-2'>The title text is a link to the source code repository</li>
      </ul>
      <p className='text-base md:text-lg my-4'>Note: These instructions will disappear when any circle is placed on the
        screen. Press the reset button to bring back these instructions.</p>
    </div>
  );
}

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
        <a className='text-white text-2xl font-bold hover:underline'
          href='https://github.com/furquan-lp/frontend-interview/tree/master/react-circles'>React Circles</a>
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
      <div className='h-screen animated-gradient-bg' onClick={handleClick}>
        {(clicks === null && undoBuffer === null) && <Instructions />}
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
