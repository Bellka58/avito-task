import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

import { getReposesByName, getTrendingRepos } from '../api';
import SearchInput from '../components/search-input';
import RepositoriesList from '../components/repositories-list';
import Pagination from '../components/pagination';
import { checkTotalCount } from '../utils/utils';

const MainPage = () => {  
  const [searchValue, setSearchValue] = useState(localStorage.getItem('search-value') || '');

  const [trending, setTrending] = useState(false);
  const [reposList, setReposList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pages, setPages] = useState({
    currentPage: +localStorage.getItem('page') || 1,
    totalPages: 1,
  });
  const { currentPage, totalPages } = pages;

  const trendingRequest = () => {
    setIsError(false)
    setIsLoading(true);
    setTrending(true)

    getTrendingRepos()
      .then((res) => {
        setReposList(res);
        setPages({ currentPage: 1, totalPages: 1 });
        localStorage.setItem("page", 1);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
    };

  const repositoriesRequest = (value, page) => {
    setIsError(false)
    setIsLoading(true);
    setTrending(false)
    localStorage.setItem("page", page);

    getReposesByName(value, page)
    .then(({ items, totalCount }) => {
      setReposList(items);
      setPages({
        currentPage: page,
        totalPages: checkTotalCount(totalCount),
      });
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      setIsError(true)
    });};

  useEffect(() => {
    if (!searchValue) {
      trendingRequest()
    } else {
      repositoriesRequest(searchValue, currentPage)
    }
  }, [searchValue, currentPage]);

  return (
    <div className="main-page">
      <SearchInput
        inputValue={searchValue}
        setInputValue={debounce(setSearchValue, 1500)}
      />
      <RepositoriesList isError={isError} list={reposList} isLoading={isLoading} trending={trending} />
      {totalPages > 1 && <Pagination
        currentPage={currentPage}
        setCurrentPage={(page) => setPages({ ...pages, currentPage: page })}
        pagesCount={totalPages}
      />}
    </div>
  );
};

export default MainPage;
