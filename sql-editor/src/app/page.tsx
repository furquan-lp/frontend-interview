'use client';
import { useEffect, useRef, useState } from 'react';
import Header from './components/header';
import SQLOutputField from './components/outputfield';
import SQLField from './components/sqlfield';
import Footer from './components/footer';
import Script from 'next/script';
import { useDB } from './lib/hooks';
import ViewTable from './components/viewtable';
import { TableType } from './lib/types';

const globalVersion = 0.8;

export default function Home() {
  const [darkMode, setDarkMode] = useState('');
  const [messages, setMessages] = useState<string[]>([`SQL Editor version ${globalVersion}`,
    'Found WASM blob. Loaded SQLite from sql.js v1.8.0.']);
  const [tables, setTables] = useState<string[]>([]);
  const [currentTable, setCurrentTable] = useState<string>('none');
  const [viewingTable, setViewingTable] = useState<TableType | null>(null);
  let editorText = useRef('');
  const database: any = useDB();

  const runQuery = (query: string) => {
    try {
      let result: [] = database.exec(query);
      logOutputText(result.length === 0 ? `Query "${query.substring(0, 20)}..." ran successfully.`
        : '' + JSON.stringify(result));
    } catch (e: any) {
      logOutputText('' + e);
    };
  };

  const logOutputText = (message: string) => {
    setMessages([...messages, message]);
  };

  const fetchTableNames = () => {
    const tableResults: TableType = database.exec('SELECT name FROM sqlite_master WHERE type=\'table\';');
    setTables(tableResults[0].values.map(v => v[0]));
  }

  const fetchTable = (table: string): TableType => database.exec(`SELECT * FROM ${table};`);

  useEffect(() => {
    if (database) {
      database.exec('DROP TABLE IF EXISTS hello;');
      database.exec('DROP TABLE IF EXISTS hello2;');
      database.exec('CREATE TABLE hello21 (i int, j int);')
      database.exec("CREATE TABLE hello (a int, b char, name varchar(32)); \
      INSERT INTO hello VALUES (0, 'hello', 'syed'); \
      INSERT INTO hello VALUES (1, 'world', 'furquan');");
      logOutputText('Created dummy tables.');
      fetchTableNames();
    }
  }, [database]);

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

  useEffect(() => {
    if (database && tables.includes(currentTable)) {
      setViewingTable(fetchTable(currentTable));
    } else if (currentTable === 'none') {
      setViewingTable(null);
    }
  }, [currentTable]);

  return (
    <>
      <Script type="module" strategy='beforeInteractive' src="/sql-loader.js" />
      <main className='flex flex-col gap-y-2 dark:bg-slate-700 min-h-screen'>
        <Header version={globalVersion} clickRun={() => runQuery(editorText.current)} clickClear={() => {
          let e = document.getElementById('sqltextarea') as HTMLTextAreaElement;
          if (e) {
            e.value = '';
            editorText.current = '';
            setMessages([`SQL Editor version ${globalVersion}`]);
          }
        }} setDarkMode={setDarkMode}
          theme={darkMode} />
        <article className='flex flex-wrap md:flex-nowrap gap-y-2 mx-1 md:gap-x-2 md:mx-2'>
          <SQLField onChange={(e) => editorText.current = e.target.value} loaded={database !== null} />
          <SQLOutputField messages={database === null ? undefined : messages} />
        </article>
        <ViewTable tables={tables} setTable={setCurrentTable} clickSync={() => fetchTableNames()} viewTable={viewingTable} />
        <Footer />
      </main>
    </>
  );
}