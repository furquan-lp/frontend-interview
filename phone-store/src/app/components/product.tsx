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