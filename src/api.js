const apiBaseGithub = 'https://api.github.com';

export const getResource = async (url, apiBase = apiBaseGithub) => {
    const res = await fetch(`${apiBase}${url}`);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url} , received ${res.status}`);
    }
    const body = await res.json();
    return body;
};


export const getPopularReposes = async () => {
    const res = await getResource('/search/repositories?q=a');
    return res;
};



export const transformRepositoryItem = (repository) => {
  return {
    id: repository.id,
    name: repository.name,
    starsCount: repository.stargazers_count,
    url: repository.html_url,
    updatedAt: repository.updated_at,
    owner: repository.owner.login,
  };
};

export const transformRepository = (repository) => {
  return {
    id: repository.id,
    name: repository.name,
    starsCount: repository.stargazers_count,
    url: repository.html_url,
    updatedAt: repository.updated_at,
    owner: {
      login: repository.owner.login,
      avatar: repository.owner.avatar_url,
      url: repository.owner.html_url,
    },
    description: repository.description,
  };
};

export const transformContributor = (contributor) => {
  return {
    login: contributor.login,
    avatar: contributor.avatar_url,
    contributions: contributor.contributions,
    url: contributor.html_url,
  };
};

export const getReposesByName = async (name, page) => {
    const res = await getResource(
      `/search/repositories?q=${name}+in:name&sort=stars&order=desc&page=${page}&per_page=10`
    );
    console.log(res)
    return {
      items: res.items.map(transformRepositoryItem),
      totalCount: res.total_count,
    };
};

export const getRepos = async (owner, repo) => {
  const res = await getResource(`/repos/${owner}/${repo}`);
  const languages = await getResource(`/repos/${owner}/${repo}/languages`);
  const contributors = await getResource(
    `/repos/${owner}/${repo}/contributors?per_page=10`
  );
  return {
    ...transformRepository(res),
    languages: Object.keys(languages),
    contributors: contributors.map(transformContributor),
  };
};

export const transformTrendingRepository = (repository, idx) => {
  return {
    id: idx,
    name: repository.name,
    starsCount: repository.stars,
    url: repository.url,
    updatedAt: null,
    owner: repository.author,
  };
};

export const getTrendingRepos = async () => {
  const res = await getResource('https://github-trending-api.now.sh/repositories?language=&since=daily', '');
  console.log(res);
  return res.slice(0,10).map(transformTrendingRepository)
};