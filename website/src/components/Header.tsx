import { AiFillGithub } from 'react-icons/ai';

export default function Header() {
  return (
    <header className='flex p-2 bg-white/30 text-2xl justify-between items-center'>
      <span className='flex md:gap-x-2 gap-x-1 items-center'>
        <img src='logo-1-dark-medium.webp' className='md:max-w-14 max-w-11' alt='wizard hat logo' />
        <span className='font-titlefont text-white md:text-4xl select-none'>frontend sorcerer</span>
      </span>
      <a href="https://github.com/furquan-lp/frontend-interview" className='text-slate-50 border border-slate-100
       p-1 rounded  hover:bg-slate-300/50 hover:border-slate-300 transition-all duration-200' ><AiFillGithub /></a>
    </header>
  );
}