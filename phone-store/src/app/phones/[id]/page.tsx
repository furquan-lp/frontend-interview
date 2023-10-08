import Footer from '@/app/components/footer';
import Header from './components/header';
import Script from 'next/script';

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
    console.log(phone![0]);
    return (
      <>
        <Script src='https://unpkg.com/feather-icons' strategy='beforeInteractive' />
        <Script strategy='lazyOnload'>
          feather.replace()
        </Script>
        <main>
          <Header />
          <h1>Name: <b>{phone![0].brand} {phone![0].model}</b></h1>
          <Footer />
        </main>
      </>
    );
  }
}