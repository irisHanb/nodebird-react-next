import React, { useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from '../reducers/post';
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
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', postText);
    console.log('formData> ', formData);
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData
    });
  }, [postText, imagePaths]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData
    });
  });

  const onRemoveImage = useCallback((idx) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: idx
    });
  });

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
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
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
        {imagePaths.map((v, idx) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3065/${v}`} alt={v} style={{ width: '200px' }} />
            <div>
              <Button onClick={onRemoveImage(idx)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
