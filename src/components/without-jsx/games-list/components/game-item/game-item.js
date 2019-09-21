import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const GameItem = ({ name, disabled, onStart }) => {
  return (
    <ListItem>
      <ListItemText>{name}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton edge='end' disabled={disabled} onClick={onStart}>
          <ArrowRightIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

GameItem.propTypes = {
  name: PropTypes.string.isRequired,
  onStart: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default GameItem;
