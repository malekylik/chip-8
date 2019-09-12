import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { useSelector } from 'react-redux';

import { selectAllRoms } from '../../../redux/roms/roms.selectors';

const GamesList = () => {
  const roms = useSelector(selectAllRoms);

  return (
    <List>
      {
        roms.map(({ name }, i) => (
          <ListItem key={i}>
            <ListItemText>{name}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton edge='end'>
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

export default GamesList;
