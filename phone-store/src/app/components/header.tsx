import Link from "next/link";

export default function Header() {
  return (
    <header className='flex items-center p-2 bg-cyan-800 justify-between m-2 rounded-lg'>
      <span className='font-source-code-pro italic text-2xl text-white select-none'>phone_store</span>
      <input type='text' placeholder='Enter Search Values' className='p-1 text-lg w-1/2 rounded-lg my-0.5' />
      <span className='flex gap-x-2 items-center'>
        <select name='brand-filter' id='brand-filter' className='p-1 px-2 rounded-md bg-white'>
          <option value='placeholder'>Brand filter</option>
        </select>
        <select name='price-filter' id='price-filter' className='p-1 px-2 rounded-md bg-white'>
          <option value='placeholder'>Price filter</option>
        </select>
        <span className='flex items-center'>
          <Link href='/about' className='text-white p-1 border rounded-md rounded-r-none'>About</Link>
          <a href='https://github.com/furquan-lp/frontend-interview/tree/master/phone-store'
            className='text-white p-1 border border-l-transparent rounded-l-none rounded-md'>
            <span className='p-0.5' data-feather='github' />
          </a>
        </span>
      </span>
    </header>
  );
}