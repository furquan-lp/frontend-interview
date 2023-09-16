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
    let arr: PhoneObject[] = [];
    phoneMap.forEach((value, key, map) => {
      if (brandfilter === 'none' || key === brandfilter) {
        arr = arr.concat(value);
      }
    });
    arr.sort((a, b) => a.price < b.price ? 0 : 1);
    setPhones([arr, arr]);
  }, [brandfilter]);

  useEffect(() => {
    if (pricefilter !== 'none' && pricefilter.length) {
      let filterStr: string[] = pricefilter.split(',');

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

      if (priceIndices.current === null || priceIndices.current.length === 0) {
        priceIndices.current = new Array<PriceIndex>(Number(filterStr[3]));
      }

      priceIndices.current[Number(filterStr[0])] = {
        a: closestSearch(phones[1], Number(filterStr[1])),
        b: closestSearch(phones[1], Number(filterStr[2]))
      };

      console.log('current indices', priceIndices.current);
      setPhones([phones[1].slice(priceIndices.current[Number(filterStr[0])].a, priceIndices.current[Number(filterStr[0])].b), phones[1]]);
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