import React, { useCallback } from 'react';
import ProtoTypes from 'prop-types';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import { Menu, Input, Row, Col } from 'antd';
import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import useInput from '../hooks/useInput';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');
  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search
            enterButton
            style={{ verticalAlign: 'middle' }}
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8} style={{ padding: '10px' }}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://irishanb.github.io/hanbrang-site/portfolio/"
            target="_blank"
            rel="noreferrer noopener"
          >
            web developer Han HeeOk
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: ProtoTypes.node.isRequired
};

export default AppLayout;
