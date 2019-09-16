import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { useSelector, useDispatch } from 'react-redux';

import { setNewRomIndex } from '../../../redux/roms/roms.actions';
import { selectAllRoms } from '../../../redux/roms/roms.selectors';

const GamesList = ({ goToGameState }) => {
  const roms = useSelector(selectAllRoms);

  const dispatch = useDispatch();

  function onItemStartButton(i) {
    return function () {
      dispatch(setNewRomIndex(i));
      goToGameState();
    }
  }

  return (
    <List>
      {
        roms.map(({ name }, i) => (
          <ListItem key={i}>
            <ListItemText>{name}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton edge='end' onClick={onItemStartButton(i)}>
                  <ArrowRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        )
      }
    </List>
  );
}

GamesList.propTypes = {
  goToGameState: PropTypes.func.isRequired,
};

export default GamesList;
