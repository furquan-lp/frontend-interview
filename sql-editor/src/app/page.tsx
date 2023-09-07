import Header from './components/header';
import SQLField from './components/sqlfield';

export default function Home() {
  return (
    <main className='flex flex-col'>
      <Header />
      <article className='flex gap-x-2 m-2'>
        <SQLField />
        <SQLField />
      </article>
    </main>
  );
}