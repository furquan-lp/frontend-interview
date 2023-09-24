export default function Header({ version }: { version?: number }) {
  return (
    <header className='flex items-center justify-between bg-emerald-700 dark:bg-sky-700 p-2 text-white'>
      <span className='text-2xl font-logofont select-none'>SQL Editor {version}</span>
      <span className='flex gap-1 items-center'>
        <span className='material-symbols-outlined'>dark_mode</span>
        <a href='https://github.com/furquan-lp/frontend-interview/tree/master/sql-editor'
          className='material-symbols-outlined border p-0.5 rounded-md'>code</a>
      </span>
    </header>
  );
}