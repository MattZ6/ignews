import { useSession, signIn } from 'next-auth/client';
import { useCallback } from 'react';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss';

interface ISubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({}: ISubscribeButtonProps) {
  const [session] = useSession();

  const handleSubscribe = useCallback(async () => {
    if (!session) {
      signIn('github');

      return;
    }

    try {
      const { data } = await api.post('/subscribe');

      const { session_id: sessionId } = data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({
        sessionId,
      });
    } catch (error) {
      alert(error.message);
    }
  }, [session]);

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={() => handleSubscribe()}
    >
      Subscribe
    </button>
  );
}
