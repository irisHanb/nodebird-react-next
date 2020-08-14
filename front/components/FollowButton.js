import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from '../reducers/user';
import { Button } from 'antd';

const FollowButton = ({ post }) => {
  const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onClickBtn = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id
      });
    }
  }, [isFollowing]);

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickBtn}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

export default FollowButton;
