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
  const [phoneMetadata, setPhoneMetadata] = useState<{ brands: string[] }>({ brands: [] });

  useEffect(() => {
    (async function () {
      let data = await fetch('http://localhost:3000/api/db');
      let tx = await data.json();
      setPhoneMap(new Map(Object.entries(tx)));
      setBrandfilter('none');
      let metadataBrands = await fetch('http://localhost:3000/api/metadata/brands');
      let metadata = await metadataBrands.json();
      setPhoneMetadata({ brands: metadata });
    })();
  }, []);

  console.log(phoneMetadata)

  useEffect(() => {
    let arr: PhoneObject[] = [];
    phoneMap.forEach((value, key, map) => {
      if (brandfilter === 'none' || key === brandfilter) {
        arr = arr.concat(value);
      }
    });
    arr.sort((a, b) => a.price < b.price ? 0 : 1);
    setPhones(arr);
  }, [brandfilter]);

  return (
    <main>
      <Header setBrand={setBrandfilter} brands={phoneMetadata.brands} />
      <section className='flex items-center gap-2 flex-wrap mx-2'>
        {phones.length && phones.map((p: PhoneObject) => <ProductCard name={p.model} brand={p.brand} price={p.price}
          imageUrl={`phones/${p.image}`} key={p.id} />)}
      </section>
    </main>
  );
}