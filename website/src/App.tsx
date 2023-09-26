import Header from './components/Header';

function AssignmentCardTag({ tag }: { tag: string }) {
  return (
    <div className='bg-white/25 text-white my-1 mr-2 p-0.5 rounded md:text-lg font-mono underline border-slate-200
     border'>#{tag}</div>
  );
}

function AssignmentCard({ title, description, tags }: { title: string, description: string, tags?: string[] }) {
  return (
    <article className='border rounded border-white p-2 text-white my-4 md:my-10 w-full bg-white/5'>
      <section className='flex flex-col border-b'>
        <span className='text-3xl font-bold'>{title}</span>
        {tags && <div className='flex my-2'>{tags.map(t => <AssignmentCardTag tag={t} />)}</div>}
      </section>
    </article>
  );
}

function App() {
  return (
    <main>
      <Header />
      <section className='flex flex-col items-center md:mt-10 w-1/2 mx-auto'>
        <span className='text-white text-2xl italic'>Welcome to my frontend portfolio. </span>
        <AssignmentCard title='React Circles' description='foo bar' tags={['React', 'TypeScript']} />
      </section>
    </main>
  );
}

export default App;
