import { useEffect, useState } from 'react';

export function useDB() {
  const [engine, setEngine] = useState(null);
  const [db, setDB] = useState(null);
  const [windowWatcher, setWindowWatcher] = useState(false);

  useEffect(() => {
    if (window) {
      console.log('Running in a browser, checking for loadSQL');
      const timer = setInterval(() => {
        if (window.loadSQL) {
          console.log('Clearing timer');
          clearInterval(timer);
          setWindowWatcher(true);
        }
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (window.loadSQL) {
      window.loadSQL().then((db) => {
        setEngine(db);
      });
    }
    return () => { };
  }, [windowWatcher]);

  useEffect(() => {
    if (engine) {
      setDB(new engine.Database());
    }
    return () => { };
  }, [engine]);

  return db;
}