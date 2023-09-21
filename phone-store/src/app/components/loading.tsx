import * as React from 'react';

export default function Loading({ fetched, results }: { fetched: boolean, results?: number }) {
  if (fetched) {
    return (
      <div className='md:text-lg text-slate-600 md:m-2'>
        Found {results} results.
      </div>
    );
  } else {
    return (
      <div className='w-screen h-screen md:my-2 px-2'>
        <span className='md:text-lg text-slate-600'>Fetching items...</span>
        <div className='bg-slate-200 w-full h-full animate-pulse rounded-md py-2' />
      </div>
    );
  }
}