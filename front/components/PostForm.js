import React, { useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { addPost } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
  const { imagePaths, addPostDone, addPostLoading, addPostError } = useSelector(
    (state) => state.post
  );

  const [postText, onChangePostText, setPostText] = useInput('');
  const imageInput = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (addPostError) {
      alert(addPostError);
    }
  }, [addPostError]);

  useEffect(() => {
    if (addPostDone) {
      setPostText('');
    }
  }, [addPostDone]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onSubmit = useCallback(() => {
    dispatch(addPost(postText));
  }, [postText]);

  return (
    <Form style={{ marginTop: '20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        style={{ marginBottom: '10px' }}
        value={postText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
        onChange={onChangePostText}
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{ float: 'right' }}
          loading={addPostLoading}
        >
          짹찍
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} alt={v} style={{ width: '200px' }} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
