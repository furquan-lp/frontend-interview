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
  const [phoneMap, setPhoneMap] = useState<Map<string, PhoneObject[]>>(new Map());
  const [phones, setPhones] = useState<PhoneObject[]>([]);
  const [brandfilter, setBrandfilter] = useState<string>('');

  useEffect(() => {
    (async function () {
      let data = await fetch('http://localhost:3000/api/db');
      let tx = await data.json();
      setPhoneMap(new Map(Object.entries(tx)));
      setBrandfilter('none');
    })();
  }, []);

  useEffect(() => {
    let arr: PhoneObject[] = [];
    phoneMap.forEach((value, key, map) => {
      arr = arr.concat(value);
    });
    arr.sort((a, b) => a.price < b.price ? 0 : 1);
    setPhones(arr);
  }, [brandfilter]);

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