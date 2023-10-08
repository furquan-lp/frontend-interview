import Footer from '@/app/components/footer';
import Header from './components/header';
import Script from 'next/script';
import { notFound } from 'next/navigation';

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
          <article className='mx-auto w-40 border rounded-md shadow p-2 flex'>
            Name: {phone![0].brand + ' ' + phone![0].model}
          </article>
          <Footer />
        </main>
      </>
    );
  } else {
    notFound();
  }
}