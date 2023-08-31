import Image from 'next/image';

import { ProductCard } from './components/product';
import Header from './components/header';

export default function Home() {
  return (
    <main>
      <Header />
      <section className='flex flex-col items-center'>
        <ProductCard name='Hello Phone 1' price={999} />
      </section>
    </main>
  );
}