import Link from "next/link";

export default function Header({ setBrand, brands }: { setBrand: Function, brands: string[] }) {
  return (
    <header className='flex items-center p-2 bg-cyan-800 justify-between m-2 rounded-lg'>
      <span className='font-source-code-pro italic text-2xl text-white select-none'>phone_store</span>
      <span className='flex gap-x-2 items-center w-1/2'>
        <input type='text' placeholder='Enter Search Values' className='p-1 text-lg w-full rounded-lg my-0.5' />
        <select onChange={(e) => setBrand(e.target.value)}
          className='p-1 px-2 rounded-md bg-white'>
          <option value='none'>Select Brand</option>
          {brands.length && brands.map(b => <option value={b}>{b}</option>)}
        </select>
        <select className='p-1 px-2 rounded-md bg-white'>
          <option value='none'>Select Price</option>
        </select>
      </span>
      <span className='flex items-center'>
        <Link href='/about' className='text-white p-1 border rounded-md rounded-r-none'>About</Link>
        <a href='https://github.com/furquan-lp/frontend-interview/tree/master/phone-store'
          className='text-white p-1 border border-l-transparent rounded-l-none rounded-md'>
          <span className='p-0.5' data-feather='github' />
        </a>
      </span>
    </header>
  );
}