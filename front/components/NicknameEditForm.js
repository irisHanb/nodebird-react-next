import React, { useCallback } from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';

const Wrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nick, onChangeNick] = useInput(me?.nickname || '');
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nick
    });
  }, [nick]);

  return (
    <Wrapper>
      <Input.Search
        value={nick}
        onChange={onChangeNick}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </Wrapper>
  );
};

export default NicknameEditForm;
