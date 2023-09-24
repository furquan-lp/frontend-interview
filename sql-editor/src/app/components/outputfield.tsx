export default function SQLOutputField({ text }: { text?: string }) {
  return (
    <textarea className='border border-slate-300 bg-slate-500 text-white dark:bg-slate-50
     dark:border-slate-900 dark:text-slate-700 w-full h-64 md:h-96 p-2 py-5 rounded-md shadow focus:outline-none
      resize-none font-mono md:text-lg' value={`${text ? text : 'Loading...'}`} readOnly />
  );
}