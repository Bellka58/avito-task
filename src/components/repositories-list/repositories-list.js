import React from 'react';

import './repositories-list.css';
import Loader from '../loader';
import RepositoriesListItem from './repositories-list-item';
import ErrorIndicator from '../error-indicator';

const RepositoriesList = ({ list, isLoading, isError }) => {
  const renderListItem = (repository) => {
    return (
      <RepositoriesListItem key={repository.id} item={repository} />
    );
  };

  if (isError) {
    return <ErrorIndicator />;
  }

  if (isLoading) {
    return (
      <div className="repositories-list__loader">
        <Loader />
      </div>
    );
  }

  return <ul className="repositories-list">{list.map(renderListItem)}</ul>;
};


export default RepositoriesList;
