import React, { useState } from 'react';

import GamesList from '../games-list/games-list';
import Game from '../game/game';

import { APP_STATES } from './const/index';

const App = () => {
  const [appState, setAppState] = useState(APP_STATES.gamesList);

  function goToGameListState() {
    setAppState(APP_STATES.gamesList);
  }

  function goToGameState() {
    setAppState(APP_STATES.game);
  }

  switch (appState) {
    case APP_STATES.gamesList: return <GamesList goToGameState={goToGameState} />;
    case APP_STATES.game: return (
      React.createElement(Game, { goToGameListState })
    );
  }

  return null;
};

export default App;
