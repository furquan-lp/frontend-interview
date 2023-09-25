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
  const [messages, setMessages] = useState<string[]>([]);
  let editorText = useRef('');
  const database: any = useDB();

  const runQuery = (db: any, query: string) => {
    try {
      console.log(db.exec(query));
    } catch (e: any) {
      console.error(e);
    };
  }

  /*useEffect(() => {
    if (database !== null && !ran.current) {
      console.log('ran')
      database.exec('DROP TABLE IF EXISTS hello;');
      database.exec('DROP TABLE IF EXISTS hello2;');
      database.exec("CREATE TABLE hello (a int, b char); \
      INSERT INTO hello VALUES (0, 'hello'); \
      INSERT INTO hello VALUES (1, 'world');");
      database.exec('CREATE TABLE hello2(i int);')
      console.log(database.exec("SELECT name FROM sqlite_master WHERE type='table';"));
      ran.current = true;
    }
  }, [database])*/

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
        <Header version={0.5} clickRun={() => runQuery(database, editorText.current)} setDarkMode={setDarkMode}
          theme={darkMode} />
        <article className='flex flex-wrap md:flex-nowrap gap-y-2 md:gap-x-2 m-2'>
          <SQLField onChange={(e) => editorText.current = e.target.value} loaded={database !== null} />
          <SQLOutputField messages={database === null ? undefined : ['Loaded SQLite from sql.js v1.8.0.']} />
        </article>
        <Footer />
      </main>
    </>
  );
}