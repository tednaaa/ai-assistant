import { useList } from 'effector-react';
import { FC } from 'react';

import openaiImage from './openai.svg';

import styles from './images.module.scss';
import { $images } from '../model';

export const Images: FC = () => {
  const list = useList($images, (image) => (
    <li className={styles.item}>
      <div className={styles.head}>
        <img className={styles.avatar} src={openaiImage} alt="avatar" />
        <span className={styles.prompt}>{image.prompt}</span>
      </div>
      <a href={image.url} target="_blank" rel="noreferrer">
        <img className={styles.image} src={image.url} alt="generated image" />
      </a>
    </li>
  ));

  return <ul className={styles.dialog}>{list}</ul>;
};
