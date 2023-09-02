import Image from "next/image";

type ProductPhone = {
  imageUrl?: string;
  name: string;
  brand?: string;
  price: number;
};

export function ProductCard({ imageUrl, name, brand, price }: ProductPhone) {
  return (
    <article className='flex flex-col items-center m-10 p-2 border rounded-md shadow-md'>
      <Image src={`/${imageUrl || 'sample-phone.webp'}`} width={220} height={380} alt='product phone photo' />
      <span className='text-xl'>{name}</span>
      <span className='text-slate-500'>{brand || 'Unknown'}</span>
      <span className='text-lg'>&#8377;{price}</span>
    </article>
  );
}

export function ProductInfoDialog({ imageUrl, name, brand, price, open }: ProductPhone & { open: boolean }) {
  return (
    <dialog open={open} className='flex gap-x-10 p-2 border shadow rounded'>
      <Image src={`/${imageUrl || 'sample-phone.webp'}`} width={320} height={480} alt={`product ${name} photo`}
        className='m-2 mx-10' />
      <section className='flex flex-col mt-10 justify-around'>
        <span>
          <span className='md:text-4xl m-1'>{name}</span>
          <span className='flex items-center m-1 my-4 text-xl'>Rating: {[...Array(5)].map((e, i) =>
            <span data-feather="star" className='ml-1 text-yellow-500 fill-yellow-400' />)}
          </span>
          <span className='m-1 my-2 text-xl'>By <span className='text-slate-600'>{brand || 'Unknown'}</span></span>
        </span>
        <span className='m-1 my-2 text-2xl'>&#8377;{price}</span>
      </section>
    </dialog>
  );
}