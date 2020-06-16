import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { MainPage, InfoPage } from "../../pages";

const App = () => {

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route
          path="/repository/:owner/:repo"
          render={({ match }) => {
            const { owner, repo } = match.params;
            return <InfoPage owner={owner} repo={repo} />;
          }}
        />
      </Switch>
    </div>
  );
};

export default App;
