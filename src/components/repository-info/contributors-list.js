import React from 'react';

const ContributorsList = ({contributors}) => {
    const renderContributorsListItem = (contributor, idx) => {
        const {login, avatar, contributions, url} = contributor;
        return (
          <div key={idx} className="contributors-list__item">
            <img
              className="repository-info__owner-avatar avatar"
              src={avatar}
              alt=""
            />
            <div>
                <a href={url}>{login}</a>
                <div>{contributions}</div>
            </div>
          </div>
        );
    };
  return (
    <div className="contributors-list">
      {contributors.map(renderContributorsListItem)}
    </div>
  );
};

export default ContributorsList;