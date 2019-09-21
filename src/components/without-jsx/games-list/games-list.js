import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import { useSelector, useDispatch } from 'react-redux';

import GameItem from './components/game-item/game-item';

import { setNewRomIndex } from '../../../redux/roms/roms.actions';
import { selectAllRoms } from '../../../redux/roms/roms.selectors';
import { useLoadingState } from './hooks';

import './games-list.less';

const classes = { root: 'list-item-container__progress-indicator' };

const GamesList = ({ goToGameState }) => {
  const roms = useSelector(selectAllRoms);
  const fileInputRef = useRef();
  const [state, loadFile] = useLoadingState(fileInputRef);
  const { loading } = state;

  const dispatch = useDispatch();

  function onItemStartButton(i) {
    return function () {
      dispatch(setNewRomIndex(i));
      goToGameState();
    }
  }

  const list = roms.map(({ name }, i) => (
    <div key={i} className='list-item-container'>
      <GameItem name={name} disabled={loading} onStart={onItemStartButton(i)} />
    </div>
    )
  );

  if (loading) {
    const { progress, name } = state;

    list.push(
      <div key={-1} className='list-item-container'>
        <LinearProgress classes={classes} variant='determinate' value={progress} />
        <GameItem name={name} disabled={loading} onStart={onItemStartButton(-1)} />
      </div>
    );
  }

  return (
    <div>
      <List>{list}</List>

      <input
        id='contained-button-file'
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={loadFile}
        disabled={loading} />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' component='span' disabled={loading}>
          Upload
        </Button>
      </label>
    </div>
  );
}

GamesList.propTypes = {
  goToGameState: PropTypes.func.isRequired,
};

export default GamesList;
