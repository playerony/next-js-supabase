import Link from 'next/link';

import { supabaseInstance } from '@infrastructure';

import { ILesson } from '@interfaces';

import { IHomeProps } from './home.types';

export const Home = ({ lessons }: IHomeProps): JSX.Element => (
  <div className="w-full max-w-3xl mx-auto my-16 px-2">
    {lessons?.map((_lesson) => (
      <Link key={_lesson.id} href={`/${_lesson.id}`}>
        <a className="p-8 h-40 mb-4 rounded shadow text-xl flex">{_lesson.title}</a>
      </Link>
    ))}
  </div>
);

export const getStaticProps = async () => {
  const { data: lessons } = await supabaseInstance.from<ILesson>('lesson').select('*');

  return {
    props: {
      lessons,
    },
  };
};
