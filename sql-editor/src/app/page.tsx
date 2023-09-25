'use client';
import { useEffect, useRef, useState } from 'react';
import Header from './components/header';
import SQLOutputField from './components/outputfield';
import SQLField from './components/sqlfield';
import Footer from './components/footer';
import Script from 'next/script';
import { useDB } from './lib/hooks';

export default function Home() {
  const [darkMode, setDarkMode] = useState('');
  const [messages, setMessages] = useState<string[]>(['Loaded SQLite from sql.js v1.8.0.']);
  let editorText = useRef('');
  const database: any = useDB();

  const runQuery = (query: string) => {
    console.log('trying')
    try {
      let result: string = database.exec(query);
      console.log('result is', result);
      logOutputText('' + JSON.stringify(result));
    } catch (e: any) {
      logOutputText('' + e);
    };
  };

  const logOutputText = (message: string) => {
    console.log('setting to', message)
    setMessages([...messages, message]);
  };

  useEffect(() => {
    if (darkMode === '') {
      localStorage.removeItem('theme');
    } else {
      localStorage.theme = darkMode;
    }
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <Script type="module" strategy='beforeInteractive' src="/sql-loader.js" />
      <main className='flex flex-col dark:bg-slate-700 min-h-screen'>
        <Header version={0.5} clickRun={() => {
          console.log('running')
          runQuery(editorText.current);
        }} setDarkMode={setDarkMode}
          theme={darkMode} />
        <article className='flex flex-wrap md:flex-nowrap gap-y-2 md:gap-x-2 m-2'>
          <SQLField onChange={(e) => editorText.current = e.target.value} loaded={database !== null} />
          <SQLOutputField messages={database === null ? undefined : messages} />
        </article>
        <Footer />
      </main>
    </>
  );
}