import React from 'react';
import moment from 'moment';
import './_comment.scss';

function Comment({ comment }) {
  const {
    snippet: {
      topLevelComment: {
        snippet: {
          textOriginal,
          authorDisplayName,
          authorProfileImageUrl,
          publishedAt,
        },
      },
    },
  } = comment;
  return (
    <div className="comment">
      <img
        className="rounded-circle"
        alt="Anjan Rai"
        src={authorProfileImageUrl}
      />
      <div className="comment__body">
        <p className="comment__header">
          <span style={{ fontWeight: 600 }}>{authorDisplayName}</span>{' '}
          {moment(publishedAt).fromNow()}
        </p>
        <p>{textOriginal}</p>
      </div>
    </div>
  );
}

export default Comment;
