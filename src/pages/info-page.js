import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { getRepos } from "../api";
import RepositoryInfo from "../components/repository-info";
import ErrorIndicator from "../components/error-indicator";
import Loader from "../components/loader";

const InfoPage = ({ owner, repo }) => {
  const [repositoryInfo, setRepositoryInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getRepos(owner, repo)
      .then((res) => {
        setRepositoryInfo(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      })
  }, [owner, repo]);
    
  if (isError) {
    return <ErrorIndicator />;
  }

  if (isLoading) {
    return (
      <div className="info-page__loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="info-page">
        {!!repositoryInfo && <RepositoryInfo isError={isError} isLoading={isLoading} repository={repositoryInfo} />}
    </div>
  );
};

export default withRouter(InfoPage);
