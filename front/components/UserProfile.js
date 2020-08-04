import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
  const { me, logoutLoading, logoutError } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (logoutError) {
      alert(logoutError);
    }
  }, [logoutError]);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    });
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="followers">
          팔로워
          <br />
          {me.Followers.length}
        </div>
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname}</Avatar>} title={me.nickname}></Card.Meta>
      <Button onClick={onLogout} loading={logoutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
