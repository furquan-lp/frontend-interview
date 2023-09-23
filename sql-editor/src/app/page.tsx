import Header from './components/header';
import SQLOutputField from './components/outputfield';
import SQLField from './components/sqlfield';

export default function Home() {
  return (
    <main className='flex flex-col dark:bg-slate-700'>
      <Header />
      <article className='flex gap-x-2 m-2'>
        <SQLField />
        <SQLOutputField />
      </article>
    </main>
  );
}