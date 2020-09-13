import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';
import Link from 'next/link';

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
          <Link href={`/user/${me.id}`}>
            <a>짹짹</a>
          </Link>
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          <Link href={`/profile`}>
            <a>팔로잉</a>
          </Link>
          <br />
          {me.Followings.length}
        </div>,
        <div key="followers">
          <Link href={`/profile`}>
            <a>팔로워</a>
          </Link>
          <br />
          {me.Followers.length}
        </div>
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${me.id}`}>
            <a>
              <Avatar>{me.nickname}</Avatar>
            </a>
          </Link>
        }
        title={me.nickname}
      ></Card.Meta>
      <Button onClick={onLogout} loading={logoutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
