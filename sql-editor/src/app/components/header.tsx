export default function Header({ version }: { version?: number }) {
  return (
    <header className='bg-emerald-700 dark:bg-sky-700 p-2 text-white'>
      <span className='text-2xl font-logofont select-none'>SQL Editor {version}</span>
    </header>
  );
}