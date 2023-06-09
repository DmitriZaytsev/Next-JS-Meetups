import { useStytch, useStytchSession } from '@stytch/nextjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

import Loading from '../../components/utils/Loading';


const Authenticate = () => {
  const { session } = useStytchSession();
  const stytchClient = useStytch();
  const router = useRouter();

  useEffect(() => {
    if (session || session?.authentication_factors.length > 2) {

      router.replace('/?message=Welcome to NextJs Meetups!');

    } else {
      const token = new URLSearchParams(window.location.search).get('token');

      stytchClient.magicLinks.authenticate(token, {
        session_duration_minutes: 7 * 24 * 60,
      });

      //authenticated added to prevent display snackbar many times on homepage
      localStorage.setItem('authenticated', 'true');

      router.replace('/?message=Welcome to NextJs Meetups!');

      //reset attempts for validation if user will try to login again
      localStorage.removeItem('emailAttempts');
    }
  }, [stytchClient, session, router]);

  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta
          name='description'
          content='Fast authentication to a website with NextJS meetings'
        />
      </Head>
      <Loading />
    </>
  );
};

export default Authenticate;




