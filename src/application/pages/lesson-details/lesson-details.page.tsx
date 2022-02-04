import { GetStaticPropsContext } from 'next';
import { useEffect, useState } from 'react';
import VideoPlayer from 'react-player/youtube';

import { supabaseInstance } from '@infrastructure';

import { ILesson } from '@interfaces';

import { ILessonDetailsProps } from './lesson-details.types';

export const LessonDetails = ({ lesson }: ILessonDetailsProps): JSX.Element => {
  const [videoUrl, setVideoUrl] = useState('');

  const getPremiumContent = async () => {
    const { data } = await supabaseInstance
      .from('premium_content')
      .select('video_url')
      .eq('id', lesson?.id)
      .single();

    setVideoUrl(data?.video_url);
  };

  useEffect(() => {
    getPremiumContent();
  }, []);

  return (
    <div className="lesson-details-wrapper">
      <h1>{lesson?.title}</h1>
      <p>{lesson?.description}</p>
      {videoUrl && <VideoPlayer url={videoUrl} width="100%" />}
    </div>
  );
};

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
