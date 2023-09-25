import { useEffect, useState } from 'react';
import Header from './components/header';
import SQLOutputField from './components/outputfield';
import SQLField from './components/sqlfield';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkmode', 'false');
  }, [])

  useEffect(() => {
    localStorage.setItem('darkmode', String(darkMode));
  }, [darkMode])

  return (
    <main className='flex flex-col dark:bg-slate-700'>
      <Header version={0.1} />
      <article className='flex flex-wrap md:flex-nowrap gap-y-2 md:gap-x-2 m-2'>
        <SQLField />
        <SQLOutputField />
      </article>
    </main>
  );
}