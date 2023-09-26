import { MouseEventHandler } from "react";
import { TableType } from "../lib/types";

export default function ViewTable({ tables, clickSync }: {
  tables: string[],
  clickSync: MouseEventHandler<HTMLElement>,
  viewTable: TableType | null
}) {
  return (
    <article className='flex flex-col gap-2'>
      <section className='flex gap-2 items-center text-slate-700 dark:text-slate-50 md:text-lg m-1 md:m-2'>
        <span>Spectating Table:</span>
        <select className='p-1 px-2 rounded-md bg-slate-200 dark:bg-slate-600'>
          <option value='none'>Select Table</option>
          {tables.length && tables.map((t, i) => <option value={`${t}`} key={t + ViewTable + i}>{t}</option>)}
        </select>
        <button className='material-symbols-outlined text-slate-600 hover:bg-slate-100 dark:text-slate-100
       dark:hover:bg-slate-600 p-1 rounded-full' onClick={clickSync}>Sync</button>
      </section>
    </article>
  );
};