import Header from "./components/Header";

function AssignmentCard({ title, description }: { title: string, description: string }) {
  return (
    <section className='border rounded border-white p-2 text-white my-4 md:my-10 w-full bg-white/5'>
      <span className='text-3xl font-bold'>{title}</span>
    </section>
  );
}

function App() {
  return (
    <main>
      <Header />
      <section className='flex flex-col items-center md:mt-10 w-1/2 mx-auto'>
        <span className='text-white text-2xl italic'>A small collection of frontend web developer interview questions
          and assignments. </span>
        <AssignmentCard title='React Circles' description='foo bar' />
      </section>
    </main>
  );
}

export default App;
