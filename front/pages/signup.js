import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';

const ErrorMsg = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signupLoading, signupDone, signupError } = useSelector((state) => state.user);

  useEffect(() => {
    if (signupDone) Router.push('/');
  }, [signupDone]);

  useEffect(() => {
    if (signupError) alert(signupError);
  }, [signupError]);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onPasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback(
    (e) => {
      setTerm(e.target.checked);
      setTermError(false);
    },
    [term]
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, nickname, password }
    });
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input type="email" name="user-email" value={email} required onChange={onChangeEmail} />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-password">비말번호</label>
          <br />
          <Input
            name="user-password"
            value={password}
            type="password"
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비말번호 확인</label>
          <br />
          <Input
            name="user-password-check"
            value={passwordCheck}
            type="password"
            required
            onChange={onPasswordCheck}
          />
          {passwordError && (
            <ErrorMsg style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</ErrorMsg>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            열심히 활동할 것을 동의합니다.
          </Checkbox>
          {termError && <ErrorMsg>약관에 동의하셔야 합니다.</ErrorMsg>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signupLoading}>
            회원가입
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
