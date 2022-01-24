import { GetStaticPropsContext } from 'next';

import { ILesson } from '@interfaces';
import { ILessonDetailsProps } from './lesson-details.types';

import { supabaseInstance } from '@infrastructure';

export const LessonDetails = ({ lesson }: ILessonDetailsProps): JSX.Element => (
  <div className="lesson-details-wrapper">
    <h1>{lesson?.title}</h1>
    <p>{lesson?.description}</p>
  </div>
);

export const getStaticPaths = async () => {
  const { data: lessons } = await supabaseInstance.from<ILesson>('lesson').select('id');

  const paths = lessons?.map((_lesson) => ({
    params: {
      id: _lesson.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ id: string }>) => {
  const { data: lesson } = await supabaseInstance
    .from<ILesson>('lesson')
    .select('*')
    .eq('id', params?.id || '')
    .single();

  return {
    props: {
      lesson,
    },
  };
};
