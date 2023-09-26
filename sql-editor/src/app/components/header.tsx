import { MouseEventHandler } from 'react';

export default function Header({ version, clickRun, clickClear, setDarkMode, theme }: {
  version?: number, clickRun: MouseEventHandler<HTMLElement>, clickClear: MouseEventHandler<HTMLElement>,
  setDarkMode: Function, theme: string
}) {
  return (
    <header className='flex items-center justify-between bg-emerald-700 dark:bg-sky-800 p-2 text-white'>
      <span className='flex gap-1 items-center'>
        <span className='text-2xl font-logofont select-none'>SQL Editor {version}</span>
        <button className='rounded bg-green-600 active:bg-green-500 dark:bg-cyan-700 dark:active:bg-cyan-600
         text-lg font-bold ml-6 px-2 p-1'><span className='hidden md:inline' onClick={clickRun}>Run</span> <span
            className='material-symbols-outlined align-[-6px]'>arrow_forward</span></button>
        <button className='rounded bg-emerald-600 active:bg-emerald-500 dark:bg-sky-700 dark:active:bg-sky-600
         text-lg font-bold px-2 p-1'><span className='hidden md:inline' onClick={clickClear}>Clear</span> <span
            className='material-symbols-outlined align-[-6px]'>clear_all</span></button>
      </span>
      <span className='flex gap-1 items-center'>
        <button className='material-symbols-outlined hover:bg-emerald-600 dark:hover:bg-sky-700 p-1 rounded-full'
          onClick={() => setDarkMode(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <>light_mode</> : <>dark_mode</>}</button>
        <a href='https://github.com/furquan-lp/frontend-interview/tree/master/sql-editor'
          className='material-symbols-outlined border p-0.5 rounded-md select-none'>code</a>
      </span>
    </header>
  );
}