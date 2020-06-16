import React from 'react';
import './repository-info.css';

import StarsCount from '../stars-count';
import { getFullDateString } from '../../utils/utils';
import ContributorsList from './contributors-list';

const RepositoryInfo = ({ repository }) => {
  const {
    name,
    starsCount,
    updatedAt,
    owner,
    description,
    languages,
    contributors,
  } = repository;
  const {login: ownerLogin, avatar: ownerAvatar, url: ownerUrl} = owner;
  return (
    <div className="repository-info">
      <div className="repository-info__main-info">
        <span className="repository-info__name">{name}</span>
        <StarsCount starsCount={starsCount} />
        <span className="repository-info__lastUpdate">
          последний коммит: {getFullDateString(updatedAt)}
        </span>
      </div>
      <span className="repository-info__owner-title">Владелец:</span>
      <div className="repository-info__owner">
        <img
          className="repository-info__owner-avatar avatar"
          src={ownerAvatar}
          alt=""
        />
        <a href={ownerUrl}>{ownerLogin}</a>
      </div>
      {!!languages.length && (
      <div className="repository-info__languages">
        <span>Используемые языки: </span>
        {languages.map((item, idx) => (
          <span key={idx}>{item}, </span>
        ))}
      </div>
      )}
      {!!description && (
      <div className="repository-info__description">
        <span>Описание: </span>
        {description}
      </div>
      )}
      <span>Топ наиболее активных контрибьютеров: </span>
      <ContributorsList contributors={contributors} />
    </div>
  );
};

export default RepositoryInfo;
