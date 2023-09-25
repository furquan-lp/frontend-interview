'use client';
import { useEffect, useState } from 'react';
import Header from './components/header';
import SQLOutputField from './components/outputfield';
import SQLField from './components/sqlfield';

export default function Home() {
  const [darkMode, setDarkMode] = useState('');

  useEffect(() => {
    if (darkMode === '') {
      localStorage.removeItem('theme');
    } else {
      localStorage.theme = darkMode;
    }
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode]);

  return (
    <main className='flex flex-col dark:bg-slate-700'>
      <Header version={0.1} setDarkMode={setDarkMode} />
      <article className='flex flex-wrap md:flex-nowrap gap-y-2 md:gap-x-2 m-2'>
        <SQLField />
        <SQLOutputField />
      </article>
    </main>
  );
}