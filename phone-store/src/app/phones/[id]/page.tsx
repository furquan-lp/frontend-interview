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
          <article className='flex justify-around md:mx-40 xl:mx-96 my-20 border rounded-md shadow p-2'>
            <Image src={`/phones/${phone![0].image || 'sample-phone.webp'}`} width={320} height={480}
              alt={`product ${phone![0].brand + ' ' + phone![0].model} photo`}
              className='m-2 mx-10' />
          </article>
          <Footer />
        </main>
      </>
    );
  } else {
    notFound();
  }
}