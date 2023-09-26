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

const globalVersion = 0.9;

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
  };

  const fetchTable = (table: string): TableType => database.exec(`SELECT * FROM ${table};`);

  useEffect(() => {
    if (database) {
      database.exec('DROP TABLE IF EXISTS cars;');
      database.exec('DROP TABLE IF EXISTS states;');
      database.exec('CREATE TABLE cars ( \
        id INT PRIMARY KEY, \
        name VARCHAR(50), \
        model VARCHAR(50), \
        year INT, \
        maker VARCHAR(50), \
        price DECIMAL(10,2) \
      );');
      database.exec('INSERT INTO cars (id, name, model, year, maker, price) VALUES \
                      (1, \'Toyota\', \'Corolla\', \'2018\', \'Toyota\', 25000.00), \
                      (2, \'Ford\', \'Focus\', \'2015\', \'Ford\', 18000.00), \
                      (3, \'Honda\', \'Civic\', \'2017\', \'Honda\', 22000.00), \
                      (4, \'BMW\', \'3-Series\', \'2019\', \'BMW\', 35000.00), \
                      (5, \'Chevrolet\', \'Silverado\', \'2016\', \'Chevrolet\', 28000.00), \
                      (6, \'Hyundai\', \'Elantra\', \'2019\', \'Hyundai\', 20000.00), \
                      (7, \'Volkswagen\', \'Jetta\', \'2018\', \'Volkswagen\', 23000.00), \
                      (8, \'Mazda\', \'MX-5 Miata\', \'2016\', \'Mazda\', 21000.00), \
                      (9, \'Subaru\', \'Outback\', \'2017\', \'Subaru\', 24000.00), \
                      (10, \'Kia\', \'Sorento\', \'2018\', \'Kia\', 26000.00);');
      database.exec('CREATE TABLE states ( name VARCHAR(255), capital VARCHAR(255), lat DECIMAL(9,6), long DECIMAL(10,7));');
      database.exec('INSERT INTO states (name, capital, lat, long) VALUES \
      (\'Andhra Pradesh\', \'Hyderabad\', 13.4125, 79.3861), \
      (\'Arunachal Pradesh\', \'Itanagar\', 27.3451, 93.3851), \
      (\'Assam\', \'Dispur\', 26.1567, 91.7397), \
      (\'Bihar\', \'Patna\', 25.3479, 85.1919);');
      logOutputText('Created sample tables.');
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