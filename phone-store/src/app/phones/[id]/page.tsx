import Script from 'next/script';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/app/components/footer';
import Header from './components/header';

type Phone = [{
  id: string;
  brand?: string;
  model: string;
  price: number;
  description?: string;
  image?: string;
}];

export default async function PhonePage({ params }: { params: { id: string } }) {
  let data = await fetch(`${process.env.HOST_URL}/api/db/${params.id}`);
  if (data.ok) {
    let phone: Phone | null = await data.json();
    return (
      <>
        <Script src='https://unpkg.com/feather-icons' strategy='beforeInteractive' />
        <Script strategy='lazyOnload'>
          feather.replace()
        </Script>
        <main className='min-h-screen'>
          <Header />
          <article className='flex justify-around md:mx-40 xl:mx-60 2xl:mx-80 my-20 border rounded-md shadow-md p-2 py-4'>
            <Image src={`/phones/${phone![0].image || 'sample-phone.webp'}`} width={320} height={480}
              alt={`product ${phone![0].brand + ' ' + phone![0].model} photo`}
              className='m-2 mx-10' />
            <section className='flex flex-col my-2 justify-between'>
              <span className='flex flex-col'>
                <span className='md:text-4xl m-1'>{phone![0].model}</span>
                <span className='flex items-center m-1 my-4 text-xl'>Rating: {[...Array(5)].map((e, i) =>
                  <span className='ml-1 text-yellow-500 fill-yellow-400'
                    key={e + phone![0].model + phone![0].price + i}>&#9734;</span>)}
                </span>
                <span className='m-1 my-2 text-xl'>
                  By <span className='text-slate-600'>{phone![0].brand || 'Unknown'}</span>
                </span>
                <span className='m-1 my-2 text-xl'>
                  {phone![0].description}
                </span>
              </span>
              <span className='flex flex-col gap-y-2'>
                <span className='m-1 text-3xl'>&#8377;{phone![0].price}</span>
                <span className='flex gap-2'>
                  <button className='hover:bg-green-400 bg-green-500 text-white p-2 px-6 text-xl border
                   border-emerald-500 rounded-md shadow transition-colors duration-200'>
                    Buy
                  </button>
                  <button className='hover:bg-orange-300 bg-orange-400 text-white p-2 px-6 text-xl border
                   border-amber-500 rounded-md shadow transition-colors duration-200'>
                    Add to cart
                  </button>
                </span>
              </span>
            </section>
          </article>
          <Footer />
        </main>
      </>
    );
  } else {
    notFound();
  }
}