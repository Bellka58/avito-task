import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

import { getReposesByName, getTrendingRepos } from '../api';
import SearchInput from '../components/search-input';
import RepositoriesList from '../components/repositories-list';
import Pagination from '../components/pagination';
import { checkTotalCount } from '../utils/utils';

const MainPage = () => {  
  const [searchValue, setSearchValue] = useState(localStorage.getItem('search-value') || '');

  const [reposList, setReposList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pages, setPages] = useState({
    currentPage: +localStorage.getItem('page') || 1,
    totalPages: 1,
  });

  const { currentPage, totalPages } = pages;
  useEffect(() => {
    setIsError(false)
    setIsLoading(true);
    localStorage.setItem("page", currentPage);
    localStorage.setItem('search-value', searchValue);
    console.log(searchValue)
    if (!searchValue) {
      getTrendingRepos()
        .then((res) => {
          console.log(res)
          setReposList(res);
          setPages({ currentPage: 1, totalPages: 1 });
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false);
          setIsError(true);
        });
    } else {
    getReposesByName(searchValue, pages.currentPage)
      .then(({ items, totalCount }) => {
        setReposList(items);
        setPages({
          ...pages,
          totalPages: checkTotalCount(totalCount),
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true)
      });
    }
  }, [searchValue, currentPage]);

  return (
    <div className="main-page">
      <SearchInput
        inputValue={searchValue}
        setInputValue={debounce(setSearchValue, 1000)}
        setPage={(page) => setPages({ ...pages, currentPage: page })}
      />
      <RepositoriesList isError={isError} list={reposList} isLoading={isLoading} />
      {totalPages > 1 && <Pagination
        currentPage={currentPage}
        setCurrentPage={(value) => setPages({...pages, currentPage: value})}
        pagesCount={totalPages}
      />}
    </div>
  );
};

export default MainPage;
