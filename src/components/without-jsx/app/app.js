import React, { useState } from 'react';

import Game from '../game/game';

import { APP_STATES } from './const/index';

const App = () => {
  const [appState] = useState(APP_STATES.game);

  switch (appState) {
    case APP_STATES['games-list']: return null;
    case APP_STATES.game: return (
      React.createElement(Game)
    );
  }

  return null;
};

export default App;
