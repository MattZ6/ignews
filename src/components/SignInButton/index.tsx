import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/client';

import styles from './styles.module.scss';

export function SignInButton() {
  const [session] = useSession();

  if (session) {
    return (
      <button
        type="button"
        className={styles.signInButton}
        onClick={() => signOut()}
      >
        <FaGithub color="#04d361" />
        <strong>{ session.user?.name }</strong>
        <FiX color="#737380" className={styles.closeIcon} />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417" />
      <strong>Sign in with Github</strong>
    </button>
  );
}
