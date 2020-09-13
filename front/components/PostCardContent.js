import PropTypes from 'prop-types';
import Link from 'next/link';

const PostCardContent = ({ postData }) => {
  const checkReg = /(#[^\s]+)/g;
  const datas = postData.split(checkReg);

  return (
    <div>
      {datas.map((v, idx) => {
        if (v.match(checkReg)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={idx}>
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
