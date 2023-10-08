import Link from "next/link";

export default function Header() {
  return (
    <header className='flex items-center p-2 bg-cyan-800 justify-between m-2 rounded-lg'>
      <Link href='/' className='p-1 rounded-full text-white text-4xl hover:bg-cyan-700'>
        <span className='p-0.5' data-feather='arrow-left-circle' ></span>
      </Link>
      <span className='font-source-code-pro italic text-2xl text-white select-none'>phone_store</span>
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