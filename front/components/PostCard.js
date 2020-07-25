import React, { useState, useCallback } from 'react';
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
import { actionType, REMOVE_POST_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const { removePostLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const [onOpenCommentForm, setOnOpenCommentForm] = useState(false);

  const onClickLiked = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const toggleOpenCommentForm = useCallback(() => {
    setOnOpenCommentForm((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({ type: REMOVE_POST_REQUEST, data: post.id });
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <Card
        extra={id && <FollowButton post={post} />}
        cover={post.Images[0] && <PostImages imgs={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartFilled key="heart-fill" onClick={onClickLiked} />
          ) : (
            <HeartOutlined key="heart" onClick={onClickLiked} />
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
          description={post.content}
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
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

export default PostCard;
