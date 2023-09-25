'use client';
import { useEffect, useState } from 'react';
import Header from './components/header';
import SQLOutputField from './components/outputfield';
import SQLField from './components/sqlfield';
import Footer from './components/footer';
import Script from 'next/script';
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
    <>
      <Script type="module" strategy='beforeInteractive' src="/sql-loader.js" />
      <main className='flex flex-col dark:bg-slate-700 min-h-screen'>
        <Header version={0.3} setDarkMode={setDarkMode} theme={darkMode} />
        <article className='flex flex-wrap md:flex-nowrap gap-y-2 md:gap-x-2 m-2'>
          <SQLField />
          <SQLOutputField />
        </article>
        <Footer />
      </main>
    </>
  );
}