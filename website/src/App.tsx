import Header from './components/Header';

function AssignmentCardTag({ tag }: { tag: string }) {
  return (
    <div className='bg-white/25 text-white my-1 mr-2 p-0.5 rounded md:text-lg font-mono underline border-slate-200
     border'>#{tag}</div>
  );
}

function AssignmentCard({ title, blurb, image, tags, children }: {
  title: string, blurb: string, image: string,
  tags?: string[], children?: JSX.Element
}) {
  return (
    <article className='flex flex-col gap-y-2 border rounded border-white p-2 text-white my-4 md:my-10 w-full bg-white/5'>
      <section className='flex flex-col border-b'>
        <span className='text-3xl font-bold'>{title}</span>
        {tags && <div className='flex my-2'>{tags.map(t => <AssignmentCardTag tag={t} />)}</div>}
      </section>
      <section className='flex gap-x-2 justify-between'>
        <div className='flex flex-col gap-y-2'>
          <span className='text-xl'>{blurb}</span>
          {children}
        </div>
        <img src={image} className='w-2/3 rounded-md' />
      </section>
      <span></span>
    </article>
  );
}

function App() {
  return (
    <main>
      <Header />
      <section className='flex flex-col md:mt-10 w-2/3 mx-auto'>
        <span className='text-white text-2xl italic'>Assorted frontend projects, interview questions
          and assignments. </span>
        <AssignmentCard title='React Circles' blurb='This is a frontend React interview assignment (junior level).
         Written in TypeScript and React, built with Vite.' image='/react-circles-screenshot.webp' tags={['React', 'TypeScript']}>
          <span>???</span>
        </AssignmentCard>
      </section>
    </main>
  );
}

export default App;
