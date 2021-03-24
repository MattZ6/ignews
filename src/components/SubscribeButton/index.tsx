import styles from './styles.module.scss';

interface ISubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({}: ISubscribeButtonProps) {
  return (
    <button
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe
    </button>
  );
}
