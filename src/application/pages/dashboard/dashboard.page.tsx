import Link from 'next/link';

import { ILesson } from '@interfaces';
import { IDashboardProps } from './dashboard.types';

import { useUser } from '@utils';
import { supabaseInstance } from '@infrastructure';

export const Dashboard = ({ lessons }: IDashboardProps): JSX.Element => {
  const { user } = useUser();

  console.log(user);

  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      {lessons?.map((_lesson) => (
        <Link key={_lesson.id} href={`/${_lesson.id}`}>
          <a className="p-8 h-40 mb-4 rounded shadow text-xl flex">{_lesson.title}</a>
        </Link>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const { data: lessons } = await supabaseInstance.from<ILesson>('lesson').select('*');

  return {
    props: {
      lessons,
    },
  };
};
