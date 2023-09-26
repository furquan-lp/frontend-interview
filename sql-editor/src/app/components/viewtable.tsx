import { MouseEventHandler } from "react";
import { TableType } from "../lib/types";

export default function ViewTable({ tables, setTable, clickSync, viewTable }: {
  tables: string[],
  setTable: Function,
  clickSync: MouseEventHandler<HTMLElement>,
  viewTable: TableType | null
}) {
  return (
    <article className='flex flex-col gap-2 grow text-slate-700 dark:text-slate-50'>
      <section className='flex gap-2 items-center md:text-lg m-1 md:m-2'>
        <span>Spectating Table:</span>
        <select className='p-1 px-2 rounded-md bg-slate-200 dark:bg-slate-600' onChange={(e) => setTable(e.target.value)}>
          <option value='none'>Select Table</option>
          {tables.length && tables.map((t, i) => <option value={`${t}`} key={t + ViewTable + i}>{t}</option>)}
        </select>
        <button className='material-symbols-outlined text-slate-600 hover:bg-slate-100 dark:text-slate-100
       dark:hover:bg-slate-600 p-1 rounded-full' onClick={clickSync}>Sync</button>
      </section>
      {viewTable !== null && viewTable.length ? <table className="text-center mx-1 md:mx-2 shadow">
        <thead>
          <tr>
            {viewTable[0].columns.map(c =>
              <th className="border border-slate-400 dark:border-slate-500" key={c}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {viewTable[0].values.map((r, i) => <tr key={i + r.toString()}>{r.map(v =>
            <td className="border border-slate-400 dark:border-slate-500" key={v}>{v}</td>)}</tr>)}
        </tbody>
      </table>
        : <section className='flex mx-2 border rounded-md grow items-center justify-center'>No table selected</section>
      }
    </article>
  );
};