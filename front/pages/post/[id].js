import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import wrapper from '../../store/configureStore';

import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import Head from 'next/head';
import { useEffect } from 'react';

const Post = ({ errorMsg }) => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0]?.src} />
        <meta property="og:url" content={``} />
      </Head>
      {errorMsg ? <div>{errorMsg}</div> : <PostCard post={singlePost}></PostCard>}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.query.id
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();

  // TODO: error 처리는 어덯게 하지?
  if (context.store.getState().post.loadPostError) {
    // console.log('error', context.store.getState().post.loadPostError);
    return {
      props: { errorMsg: context.store.getState().post.loadPostError }
    };
  }
});

export default Post;
