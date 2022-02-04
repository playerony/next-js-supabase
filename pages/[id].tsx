import { lessonDetailsPage } from '@application';

const { getStaticPaths, getStaticProps, LessonDetails } = lessonDetailsPage;

// eslint-disable-next-line no-restricted-exports
export { LessonDetails as default, getStaticProps, getStaticPaths };
