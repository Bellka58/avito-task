import React from 'react';
import { getFullDateString } from '../../utils/utils';
import { Link } from 'react-router-dom';
import StarsCount from '../stars-count';

const RepositoriesListItem = ({ item }) => {
    const { name, starsCount, url, updatedAt, owner } = item;
    return (
      <li className="repositories-list__item list-item">
        <div>
          <Link className="list-item__name" to={`/repository/${owner}/${name}`}>{name}</Link>
        </div>
        <StarsCount starsCount={starsCount} />
        {updatedAt &&(
          <span className="list-item__last-commit">
            последний коммит: {getFullDateString(updatedAt)}
          </span>
        )}
        <div>
          <a className="url" href={url}>{url}</a>
        </div>
      </li>
    );
};

export default RepositoriesListItem;