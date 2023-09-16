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

interface PriceIndex {
  a: number, b: number;
}


const closestSearch = function (arr: PhoneObject[], n: number): number {
  console.log('finding', n);
  let value = n * 1000;
  if (value < arr[0].price) {
    return 0;
  }
  if (value > arr[arr.length - 1].price) {
    return arr.length - 1;
  }

  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    let mid = Math.floor((hi + lo) / 2);

    if (value < arr[mid].price) {
      hi = mid - 1;
    } else if (value > arr[mid].price) {
      lo = mid + 1;
    } else {
      return mid;
    }
  }

  return (arr[lo].price - value) < (value - arr[hi].price) ? lo : hi;
}

const filterBrands = (phoneMap: Map<string, PhoneObject[]>, brandfilter: string): PhoneObject[] => {
  let arr: PhoneObject[] = [];
  if (brandfilter === 'none') {
    phoneMap.forEach((value, key, map) => {
      if (brandfilter === 'none') {
        arr = arr.concat(value);
      }
    });
  } else {
    arr = phoneMap.get(brandfilter)!;
  }
  arr.sort((a, b) => a.price < b.price ? 0 : 1);
  return arr;
}

const filterPrices = (phones: PhoneObject[], low: number, high: number): PhoneObject[] => {
  return phones.slice(closestSearch(phones, low), closestSearch(phones, high));
}

export default function Home() {
  const [phoneMap, setPhoneMap] = useState<Map<string, PhoneObject[]>>(new Map());
  const [phones, setPhones] = useState<[PhoneObject[], PhoneObject[]]>([[], []]);
  const [brandfilter, setBrandfilter] = useState<string>('');
  const [pricefilter, setPriceFilter] = useState<string>('');
  const priceIndices = useRef<PriceIndex[]>([]);
  const [phoneMetadata, setPhoneMetadata] = useState<{ brands: string[] }>({ brands: [] });

  useEffect(() => {
    (async function () {
      let data = await fetch('http://localhost:3000/api/db');
      let tx = await data.json();
      setPhoneMap(new Map(Object.entries(tx)));
      setBrandfilter('none');
      setPriceFilter('none');
      let metadataBrands = await fetch('http://localhost:3000/api/metadata/brands');
      let metadata = await metadataBrands.json();
      setPhoneMetadata({ brands: metadata });
    })();
  }, []);

  useEffect(() => {
    const phoneArray = filterBrands(phoneMap, brandfilter);
    setPhones([phoneArray, phoneArray]);
  }, [brandfilter]);

  useEffect(() => {
    if (pricefilter !== 'none' && pricefilter.length) {
      let filterStr: string[] = pricefilter.split(',');
      setPhones([filterPrices(phones[1], Number(filterStr[1]), Number(filterStr[2])), phones[1]]);
    } else if (pricefilter === 'none' && phones[1].length) {
      console.log('setting to')
      setPhones([phones[1], phones[1]]);
    }
  }, [pricefilter]);

  return (
    <main>
      <Header setBrand={setBrandfilter} brands={phoneMetadata.brands} setPrice={setPriceFilter} />
      <section className='flex items-center gap-2 flex-wrap mx-2'>
        {phones[0].length && phones[0].map((p: PhoneObject) => <ProductCard name={p.model} brand={p.brand} price={p.price}
          imageUrl={`phones/${p.image}`} key={p.id} />)}
      </section>
    </main>
  );
}