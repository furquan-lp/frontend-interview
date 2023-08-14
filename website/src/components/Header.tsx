import { AiFillGithub } from 'react-icons/ai';

export default function Header() {
  return (
    <header className='flex p-2 bg-white/30 text-2xl justify-between items-center'>
      <span className='font-titlefont text-white md:text-4xl select-none'>frontend-interview 2023</span>
      <a href="https://github.com/furquan-lp/frontend-interview"
        className='text-green-50 border border-green-100 p-1' ><AiFillGithub /></a>
    </header>
  );
}