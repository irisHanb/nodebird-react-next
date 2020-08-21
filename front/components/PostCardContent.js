import PropTypes from 'prop-types';
import Link from 'next/link';

const PostCardContent = ({ postData }) => {
  const checkReg = /(#[^\s]+)/g;
  const datas = postData.split(checkReg);

  return (
    <div>
      {datas.map((v) => {
        if (v.match(checkReg)) {
          return (
            <Link href={{ pathname: 'hashtag', query: { tag: v.slice(1) } }}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired
};

export default PostCardContent;
