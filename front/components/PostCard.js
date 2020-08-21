import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Popover, Avatar, List, Comment } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  EllipsisOutlined
} from '@ant-design/icons';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';
import PostCardContent from './PostCardContent';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const [onOpenCommentForm, setOnOpenCommentForm] = useState(false);
  const id = useSelector((state) => state.user.me?.id);

  const onClickLike = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id
    });
  }, [id]);
  const onClickUnLike = useCallback(() => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id
    });
  }, [id]);

  const toggleOpenCommentForm = useCallback(() => {
    setOnOpenCommentForm((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({ type: REMOVE_POST_REQUEST, data: post.id });
  }, []);

  const liked = post.Likers.find((v) => v.id === id);

  return (
    <div style={{ marginTop: '20px' }}>
      <Card
        extra={post.User.id != id && <FollowButton post={post} />}
        cover={post.Images[0] && <PostImages imgs={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartFilled key="heart-fill" onClick={onClickUnLike} />
          ) : (
            <HeartOutlined key="heart" onClick={onClickLike} />
          ),
          <MessageOutlined key="comment" onClick={toggleOpenCommentForm} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && id === post.User.id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {onOpenCommentForm && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          ></List>
        </div>
      )}
    </div>
  );
};

PostCard.propType = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.object),
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

export default PostCard;
