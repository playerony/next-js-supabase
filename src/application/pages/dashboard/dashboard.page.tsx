import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { useUser } from '@utils';

import { supabaseInstance } from '@infrastructure';

export const Dashboard = (): JSX.Element => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  const loadPortal = async () => {
    const { data } = await axios.get('/api/portal');

    router.push(data.url);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8">
      <h1 className="text-3xl mb-6">Dashboard</h1>
      {!isLoading && (
        <>
          <p className="mb-6">
            {user?.is_subscribed ? `Subscribed: ${user.interval}` : 'Not subscribed'}
          </p>
          <button onClick={loadPortal}>Manage Subscription</button>
        </>
      )}
    </div>
  );
};

// @ts-expect-error
export const getServerSideProps = async ({ req }: GetServerSideProps) => {
  const { user } = await supabaseInstance.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
