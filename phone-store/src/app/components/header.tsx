import Link from 'next/link';
import { MutableRefObject } from 'react';

export default function Header({ setBrand, brands, setPrice, searchValue, setSearch, fetched }: {
  setBrand: Function, brands: string[], setPrice: Function, searchValue: MutableRefObject<string>, setSearch: Function,
  fetched: boolean
}) {
  return (
    <header className='flex items-center p-2 bg-cyan-800 justify-between m-2 rounded-lg'>
      <span className='font-source-code-pro italic text-2xl text-white select-none'>phone_store</span>
      <span className='flex gap-x-2 items-center w-1/2'>
        <input type='text' placeholder='Press enter to search...' className='p-1 text-lg w-full rounded-lg my-0.5'
          onChange={(e) => searchValue.current = e.target.value} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearch(searchValue.current);
            }
          }} disabled={!fetched} />
        <select onChange={(e) => setBrand(e.target.value)} className='p-1 px-2 rounded-md bg-white'
          disabled={!fetched}>
          <option value='none'>Select Brand</option>
          {brands.length && brands.map((b, i) => <option value={b} key={b + i}>{b}</option>)}
        </select>
        <select onChange={(e) => setPrice(e.target.value)} className='p-1 px-2 rounded-md bg-white'
          disabled={!fetched}>
          <option value='none'>Select Price</option>
          <option value='0,6,10,4'>&#8377;6000 to &#8377;10,000</option>
          <option value='1,10,20,4'>&#8377;10,000 to &#8377;20,000</option>
          <option value='2,20,30,4'>&#8377;20,000 to &#8377;30,000</option>
          <option value='3,30,90,4'>&#8377;30,000+</option>
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