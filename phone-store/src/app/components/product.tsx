import Image from 'next/image';
import { MouseEventHandler } from 'react';

type ProductPhone = {
  imageUrl?: string;
  name: string;
  brand?: string;
  price: number;
};

export function ProductCard({ imageUrl, name, brand, price, onClick }: ProductPhone & { onClick: MouseEventHandler }) {
  return (
    <article className='flex flex-col items-center p-2 border border-slate-300 rounded-md shadow-md cursor-pointer'
      onClick={onClick}>
      <Image src={`/${imageUrl || 'sample-phone.webp'}`} width={220} height={380} alt='product phone photo' />
      <span className='text-xl'>{name}</span>
      <span className='text-slate-500'>{brand || 'Unknown'}</span>
      <span className='text-lg'>&#8377;{price}</span>
    </article>
  );
}

export function ProductInfoDialog({ imageUrl, name, brand, price, open, clickClose }: ProductPhone & {
  open: boolean,
  clickClose: MouseEventHandler
}) {
  if (open) {
    return (
      <dialog open={open} className='flex gap-x-10 p-2 border border-slate-400 shadow-lg rounded'>
        <Image src={`/phones/${imageUrl || 'sample-phone.webp'}`} width={320} height={480} alt={`product ${name} photo`}
          className='m-2 mx-10' />
        <section className='flex flex-col mt-10 justify-around'>
          <span>
            <span className='md:text-4xl m-1'>{name}</span>
            <span className='flex items-center m-1 my-4 text-xl'>Rating: {[...Array(5)].map((e, i) =>
              <span className='ml-1 text-yellow-500 fill-yellow-400' key={e + name + price + i}>&#9734;</span>)}
            </span>
            <span className='m-1 my-2 text-xl'>By <span className='text-slate-600'>{brand || 'Unknown'}</span></span>
          </span>
          <span className='flex flex-col gap-y-2'>
            <span className='m-1 text-3xl'>&#8377;{price}</span>
            <span className='flex gap-2'>
              <button className='hover:bg-emerald-300 p-2 px-6 text-xl border-2 border-emerald-500 rounded-md'>
                Buy
              </button>
              <button className='hover:bg-red-300 p-2 px-6 text-xl border-2 border-red-500 rounded-md'
                onClick={clickClose}>
                Close
              </button>
            </span>
          </span>
        </section>
      </dialog>
    );
  }
}