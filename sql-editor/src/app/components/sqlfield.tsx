import { ChangeEventHandler, MutableRefObject } from "react";

export default function SQLField({ onChange, loaded }: {
  onChange: ChangeEventHandler<HTMLTextAreaElement>,
  loaded: boolean
}) {
  return (
    <textarea className='border border-slate-300 bg-slate-50 bg-clip-content w-full h-64 md:h-96 p-1 py-2 md:p-2
     md:py-5 rounded-md shadow focus:outline-none dark:bg-clip-padding dark:bg-slate-600 dark:text-slate-50
      font-editorfont md:text-xl' placeholder='SELECT * FROM sqlite_master;' onChange={onChange} disabled={!loaded}
      id='sqltextarea' />
  );
}