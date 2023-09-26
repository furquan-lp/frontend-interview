import Header from './components/Header';

function AssignmentCardTag({ tag }: { tag: string }) {
  return (
    <div className='bg-white/25 text-white my-1 mr-2 p-0.5 rounded md:text-lg font-mono underline border-slate-200
     border'>#{tag}</div>
  );
}

function AssignmentCard({ title, blurb, image, tags, livelink, repolink, children }: {
  title: string, blurb: string, image: string,
  tags?: string[], livelink?: string, repolink: string, children?: JSX.Element
}) {
  return (
    <article className='flex flex-col gap-y-2 border rounded border-white p-2 text-white w-full bg-white/5'>
      <header className='flex flex-col border-b'>
        <span className='text-3xl font-bold'>{title}</span>
        {tags && <div className='flex my-2'>{tags.map(t => <AssignmentCardTag tag={t} />)}</div>}
      </header>
      <section className='flex gap-x-2 justify-between'>
        <div className='flex flex-col justify-around md:w-2/3'>
          <span className='text-xl'>{blurb}</span>
          {children}
        </div>
        <img src={image} className='flex md:w-1/2 grow rounded-md' />
      </section>
      <footer className='flex justify-between border-t py-2 mt-1'>
        {livelink ?
          <a className='hover:bg-white/10 text-white p-1 md:text-lg hover:underline border-orange-100 border'
            href={livelink}>Visit Live</a> : null}
        <a className='hover:bg-white/10 text-white p-1 md:text-lg hover:underline border-blue-100 border'
          href={repolink}>View Source</a>
      </footer>
    </article>
  );
}

function App() {
  return (
    <main>
      <Header />
      <section className='flex flex-col gap-y-4 md:gap-y-10 md:mt-10 w-2/3 mx-auto'>
        <span className='text-white text-2xl italic'>Assorted frontend projects, interview questions
          and assignments. </span>
        <AssignmentCard title='SQL Editor' blurb='A backendless responsive SQL Editor web app built with Next.js and
         TypeScript. Runs SQLite in the browser using WebAssembly and requires nothing on the backend.'
          image='/sql-editor-screenshot.webp' tags={['Next.js', 'TypeScript', 'SQLite', 'WASM']}
          livelink='https://sql.frontend.nextdev.in/'
          repolink='https://github.com/furquan-lp/frontend-interview/tree/master/sql-editor'>
          <ul className='list-disc list-inside md:text-lg'>
            <div className='font-bold md:text-xl mb-2'>Features:</div>
            <li>Execute SQL code locally without requiring an external database or a file and display the output of
              queries being run</li>
            <li>Live viewing of any table in the database</li>
            <li>Seamless toggle for dark mode theming while respecting system choice</li>
            <li>Run on a mobile screen or smaller sized viewports (responsive design)</li>
          </ul>
        </AssignmentCard>
        <AssignmentCard title='React Circles' blurb='This is a frontend React interview assignment (junior level).
         Written in TypeScript and React, built with Vite.' image='/react-circles-screenshot.webp'
          tags={['React', 'TypeScript']} livelink='https://circles.frontend.nextdev.in/'
          repolink='https://github.com/furquan-lp/frontend-interview/tree/master/react-circles'>
          <ul className='list-disc list-inside md:text-lg'>
            <div className='font-bold md:text-xl mb-2'>Problem Statement:</div>
            <li>Make a basic single page app where the user can click anywhere on the page to place a circle on that
              location</li>
            <li>Add two buttons—undo and redo—to undo and redo these placements</li>
            <li>Add a reset button to clear the entire page of these circles
            </li>
          </ul>
        </AssignmentCard>
      </section>
    </main>
  );
}

export default App;
