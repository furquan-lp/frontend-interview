'use client';
import { useRef, useState, useEffect } from 'react';
import { ProductCard, ProductInfoDialog } from './components/product';
import Header from './components/header';

interface PhoneObject {
  id: string,
  brand: string,
  model: string,
  price: number,
  image: string,
}

export default function Home() {
  const [phones, setPhones] = useState<PhoneObject[]>([]);

  useEffect(() => {
    (async function () {
      let data = await fetch('http://localhost:3000/api/db');
      let tx = await data.json();
      setPhones(tx);
    })();
  }, []);

  return (
    <main>
      <Header />
      <section className='flex items-center gap-2 flex-wrap mx-2'>
        {phones.length && phones.map((p: PhoneObject) => <ProductCard name={p.model} brand={p.brand} price={p.price}
          imageUrl={`phones/${p.image}`} key={p.id} />)}
      </section>
    </main>
  );
}

/* export default async function Home() {
  let data = await fetch('http://localhost:3000/api/db');
  let tx = await data.json();
  return (
    <main>
      <Header />
      <section className='flex items-center gap-2 flex-wrap mx-2'>
        {tx.map((t: PhoneObject) => <ProductCard name={t.model} brand={t.brand} price={t.price} imageUrl={`phones/${t.image}`} key={t.id} />)}
      </section>
    </main>
  );
} */