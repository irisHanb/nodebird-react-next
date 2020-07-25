import { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import useInput from '../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((store) => store.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const [commentText, onChangeComment, setComment] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setComment('');
    }
  }, [addCommentDone]);

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id }
    });
  }, [commentText, id]);

  return (
    <div style={{ marginTop: '20px' }}>
      <Form onFinish={onSubmit}>
        <Form.Item>
          <Input.TextArea value={commentText} onChange={onChangeComment} rows={4} />
          <Button
            style={{ float: 'right', marginTop: '5px' }}
            type="primary"
            htmlType="submit"
            loading={addCommentLoading}
          >
            댓글달기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CommentForm;
