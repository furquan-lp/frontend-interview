export default function Header() {
  return (
    <header className='flex items-center p-2 bg-cyan-600 justify-between m-2 rounded-lg'>
      <span className='font-source-code-pro text-2xl text-white'>phone_store</span>
      <input type='text' placeholder='Enter Search Values' className='p-1 text-lg w-1/2 rounded-lg my-0.5' />
      <select name='filter' id='filter' className='p-1 rounded-md'>
        <option value='placeholder'>Placeholder for filter</option>
      </select>
    </header>
  );
}