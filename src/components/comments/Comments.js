import React, { useEffect, useState } from 'react';
import './_comments.scss';
import Comment from '../comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsList } from '../../redux/actions/comments.action';
import { addComment } from '../../redux/actions/comments.action';

function Comments({ videoId, commentsCount }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommentsList(videoId));
  }, [dispatch, videoId]);

  const [videoComment, setVideoComment] = useState('');
  const { comments } = useSelector((state) => state.videoComments);
  const handleComment = (e) => {
    e.preventDefault();
    dispatch(addComment(videoId, videoComment));
    setVideoComment('');
  };
  return (
    <div className="comments">
      <p>{commentsCount} comments</p>
      <div className="comments__form">
        <img
          className="rounded-circle"
          alt="Anjan Rai"
          src="https://lh3.googleusercontent.com/a/AATXAJxGu2JAXmOanDGdz1UnsFLzeI-VvpmUPWvIHTRW=s96-c"
        />
        <form onSubmit={handleComment}>
          <input
            value={videoComment}
            onChange={(e) => setVideoComment(e.target.value)}
            type="text"
            placeholder="Add a public comment..."
          />
          <button>COMMENT</button>
        </form>
      </div>
      <div className="comments__list">
        {comments.length
          ? comments.map((commentDetail, index) => (
              <Comment key={index} comment={commentDetail} />
            ))
          : ''}
      </div>
    </div>
  );
}

export default Comments;
