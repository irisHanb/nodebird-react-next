import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ imgs }) => {
  const [onZoom, setOnZoom] = useState(false);

  const onClickZoom = useCallback(() => {
    setOnZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setOnZoom(false);
  }, []);

  if (imgs.length === 1) {
    return (
      <div>
        <img
          role="presentation"
          width="100%"
          src={`http://localhost:3065/${imgs[0].src}`}
          alt={`http://localhost:3065/${imgs[0].src}`}
          onClick={onClickZoom}
        />
        {onZoom && <ImagesZoom imgs={imgs} onClose={onClose} />}
      </div>
    );
  }
  if (imgs.length === 2) {
    return (
      <div>
        <img
          role="presentation"
          width="50%"
          src={`http://localhost:3065/${imgs[0].src}`}
          alt={`http://localhost:3065/${imgs[0].src}`}
          onClick={onClickZoom}
        />
        <img
          role="presentation"
          width="50%"
          src={`http://localhost:3065/${imgs[1].src}`}
          alt={`http://localhost:3065/${imgs[1].src}`}
          onClick={onClickZoom}
        />
        {onZoom && <ImagesZoom imgs={imgs} onClose={onClose} />}
      </div>
    );
  }
  return (
    <div>
      <img
        role="presentation"
        width="50%"
        src={`http://localhost:3065/${imgs[0].src}`}
        alt={`http://localhost:3065/${imgs[0].src}`}
        onClick={onClickZoom}
      />
      <div
        role="presentation"
        style={{
          display: 'inline-block',
          width: '50%',
          textAlign: 'center',
          verticalAlign: 'middle'
        }}
        onClick={onClickZoom}
      >
        <PlusOutlined />
        <br />
        {imgs.length - 1} 개 더보기
      </div>
      {onZoom && <ImagesZoom imgs={imgs} onClose={onClose} />}
    </div>
  );
};

PostImages.propTypes = {
  imgs: PropTypes.array.isRequired
};

export default PostImages;
