export default function Header({ version }: { version?: number }) {
  return (
    <header className='flex items-center justify-between bg-emerald-700 dark:bg-sky-700 p-2 text-white'>
      <span className='flex gap-1 items-center'>
        <span className='text-2xl font-logofont select-none'>SQL Editor {version}</span>
        <button className='rounded bg-green-600 active:bg-green-500 dark:bg-cyan-600 dark:active:bg-cyan-500
         text-lg font-bold ml-6 px-2 p-1'>Run <span
            className='material-symbols-outlined align-[-6px]'>arrow_forward</span></button>
        <button className='rounded bg-emerald-600 active:bg-emerald-500 dark:bg-sky-600 dark:active:bg-sky-500
         text-lg font-bold px-2 p-1'>Clear <span
            className='material-symbols-outlined align-[-6px]'>clear_all</span></button>
      </span>
      <span className='flex gap-1 items-center'>
        <span className='material-symbols-outlined cursor-pointer select-none hover:bg-emerald-600
         dark:hover:bg-sky-600 p-1 rounded-full'>dark_mode</span>
        <a href='https://github.com/furquan-lp/frontend-interview/tree/master/sql-editor'
          className='material-symbols-outlined border p-0.5 rounded-md select-none'>code</a>
      </span>
    </header>
  );
}