'use client';
import { useEffect, useRef, useState } from 'react';
import Header from './components/header';
import SQLOutputField from './components/outputfield';
import SQLField from './components/sqlfield';
import Footer from './components/footer';
import Script from 'next/script';
import { useDB } from './lib/hooks';
import ViewTable from './components/viewtable';

type TableNames = [
  {
    columns: string[];
    values: [string[]];
  }
];

export default function Home() {
  const [darkMode, setDarkMode] = useState('');
  const [messages, setMessages] = useState<string[]>(['Loaded SQLite from sql.js v1.8.0.']);
  const [tables, setTables] = useState<string[]>([]);
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

  const fetchTableNames = () => {
    const tableResults: TableNames = database.exec("SELECT name FROM sqlite_master WHERE type='table';");
    setTables(tableResults[0].values.map(v => v[0]));
  }

  useEffect(() => {
    if (database) {
      database.exec('DROP TABLE IF EXISTS hello;');
      database.exec('DROP TABLE IF EXISTS hello2;');
      database.exec('CREATE TABLE hello21 (i int);')
      database.exec("CREATE TABLE hello (a int, b char); \
      INSERT INTO hello VALUES (0, 'hello'); \
      INSERT INTO hello VALUES (1, 'world');");
      fetchTableNames();
    }
  }, [database])

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
        <Header version={0.7} clickRun={() => {
          console.log('running', editorText.current)
          runQuery(editorText.current);
        }} setDarkMode={setDarkMode}
          theme={darkMode} />
        <article className='flex flex-wrap md:flex-nowrap gap-y-2 mx-1 my-2 md:gap-x-2 md:m-2'>
          <SQLField onChange={(e) => editorText.current = e.target.value} loaded={database !== null} />
          <SQLOutputField messages={database === null ? undefined : messages} />
        </article>
        <ViewTable tables={tables} clickSync={() => fetchTableNames()} />
        <Footer />
      </main>
    </>
  );
}