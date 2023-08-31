export default function Header() {
  return (
    <header className='flex items-center p-2 bg-cyan-600 justify-between'>
      <span className='font-source-code-pro text-2xl text-white'>phone_store</span>
      <input type='text' placeholder='Enter Search Values' className='p-1 bg-slate-100'></input>
    </header>
  );
}