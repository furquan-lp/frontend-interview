export default function SQLOutputField({ messages }: { messages?: string[] }) {
  return (
    <div className='flex flex-col border border-slate-300 bg-slate-500 text-white dark:bg-slate-100
     dark:border-slate-900 dark:text-slate-700 w-full h-64 md:h-96 p-2 py-5 rounded-md shadow focus:outline-none
      resize-none font-mono md:text-lg overflow-y-auto'>{messages ? messages.map((m, i) =>
      <span className={m.includes('Error') ? 'text-red-400 dark:text-orange-500' : undefined} key={i + m}>
        {m}
      </span>
    ) : 'Loading...'}
    </div>
  );
}