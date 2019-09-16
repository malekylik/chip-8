import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Button from '@material-ui/core/Button';

import { useSelector, useDispatch } from 'react-redux';

import { setNewRomIndex } from '../../../redux/roms/roms.actions';
import { selectAllRoms } from '../../../redux/roms/roms.selectors';

const GamesList = ({ goToGameState }) => {
  const [loading, setLoading] = useState(false);
  const roms = useSelector(selectAllRoms);
  const fileInputRef = useRef();

  const dispatch = useDispatch();

  function onItemStartButton(i) {
    return function () {
      dispatch(setNewRomIndex(i));
      goToGameState();
    }
  }

  function loadFile() {
    const files = fileInputRef.current.files;

    if (files.length) {
      const fileReader = new FileReader();

      fileReader.addEventListener('load', (bin) => {
        console.log('bin', bin.target.result);
        setLoading(false);
      });

      const file = files[0];

      fileReader.readAsArrayBuffer(file);

      setLoading(true);
      console.log('loadFile file', file);
    }
  }

  return (
    <div>
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
