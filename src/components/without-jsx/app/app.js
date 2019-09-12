import React, { useState } from 'react';

import GamesList from '../games-list/games-list';
import Game from '../game/game';

import { APP_STATES } from './const/index';

const App = () => {
  const [appState] = useState(APP_STATES.gamesList);

  switch (appState) {
    case APP_STATES.gamesList: return <GamesList />;
    case APP_STATES.game: return (
      React.createElement(Game)
    );
  }

  return null;
};

export default App;
