export default function Header() {
  return (
    <header className='flex items-center p-2 bg-cyan-800 justify-between m-2 rounded-lg'>
      <span className='font-source-code-pro italic text-2xl text-white select-none'>phone_store</span>
      <input type='text' placeholder='Enter Search Values' className='p-1 text-lg w-1/2 rounded-lg my-0.5' />
      <span>
        <select name='brand-filter' id='brand-filter' className='p-1 rounded-md'>
          <option value='placeholder'>Brand filter</option>
        </select>
        <select name='price-filter' id='price-filter' className='p-1 rounded-md mx-2'>
          <option value='placeholder'>Price filter</option>
        </select>
      </span>
    </header>
  );
}