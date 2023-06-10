import { FC } from 'react';
import { useList } from 'effector-react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

import { $messages } from '../../model';

import avatarImage from './avatar.svg';
import openaiImage from './openai.svg';

import styles from './dialog.module.scss';

export const Dialog: FC = () => {
  const list = useList($messages, (message) => (
    <li className={styles.item}>
      <img
        className={styles.avatar}
        src={message.role === 'user' ? avatarImage : openaiImage}
        alt="avatar"
      />
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            marked.parse(message.content, {
              headerIds: false,
              mangle: false,
              gfm: true,
              breaks: true,
            })
          ),
        }}
      ></div>
    </li>
  ));

  return <ul>{list}</ul>;
};
