import { GetStaticProps } from 'next';
import Head from 'next/head';

import { stripe } from '../services/stripe';

import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';

interface IPriceProduct {
  priceId: string;
  amount: string;
}
interface IHomeProps {
  product: IPriceProduct;
}

export default function Home({ product }: IHomeProps) {
  return (
    <>
      <Head>
        <title>Home — ig.news 🔥</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome!</span>

          <h1>News about the <span>React</span> world.</h1>

          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding"/>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  const price = await stripe.prices.retrieve('price_1IYgBSKa9duKxv20TJ1or6Wb');

  return {
    revalidate: 60 * 60 * 24, // 24 hours
    props: {
      product: {
        priceId: price.id,
        amount: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price.unit_amount / 100),
      }
    }
  }
}
