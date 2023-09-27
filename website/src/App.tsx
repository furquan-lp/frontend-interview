import Footer from './components/Footer';
import Header from './components/Header';
import AssignmentCard from './components/AssignmentCard';

function App() {
  return (
    <main>
      <Header />
      <section className='flex flex-col gap-y-6 md:gap-y-10 mt-4 md:mt-10 md:w-2/3 mx-1 md:mx-auto'>
        <span className='text-white text-xl md:text-2xl italic'>Assorted frontend projects, interview questions
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
        <AssignmentCard title='Phone Store' blurb='A Next.js store front website with search and filters, running
         without any backend server.'
          image='/phone-store-screenshot.webp' tags={['Next.js', 'TypeScript', 'PostgreSQL', 'Python', 'Flask']}
          livelink='https://store.frontend.nextdev.in/'
          repolink='https://github.com/furquan-lp/frontend-interview/tree/master/phone-store'>
          <ul className='list-disc list-inside md:text-lg'>
            <div className='font-bold md:text-xl mb-2'>Features:</div>
            <li>Fetch the data from the PostgreSQL database using Next.js API routes and node/pg</li>
            <li>Filters for search, brand and price</li>
            <li>Price filters use a modified binary search and brand filters use a cached Map allowing them to be ~3-4x
              faster than linear solutions.</li>
            <li>Data written to the PostgreSQL database using a Flask application</li>
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
      <Footer />
    </main>
  );
}

export default App;
