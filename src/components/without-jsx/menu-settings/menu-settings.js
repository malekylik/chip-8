import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useSelector, useDispatch } from 'react-redux';

import { selectResolutionValue, selectSpeedModeValue } from '../../../redux/settings/settings.selectors';
import { RESOLUTIONS_MODS } from '../../../redux/settings/const/index';
import { setResolutionMode } from '../../../redux/settings/settings.actions';
import { findOptinByValue } from '../../../util/index';

const MenuSettings = (props) => {
  const { open } = props;

  const speedMode = useSelector(selectSpeedModeValue);
  const resolution = useSelector(selectResolutionValue);

  const dispatch = useDispatch();

  function changeResolution(event) {
    dispatch(setResolutionMode(findOptinByValue(RESOLUTIONS_MODS, event.target.value)));
  }

  return (
    <Dialog open={open}>
      <FormControl>
        <InputLabel htmlFor='resolution'>Resolution</InputLabel>
        <Select
          inputProps={{
            name: 'resolution',
            id: 'resolution',
          }}
          value={resolution}
          onChange={changeResolution}>
          {
            RESOLUTIONS_MODS.map(({ value, label }, i) => (
              <MenuItem key={i} value={value}>{label}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <span>speed {speedMode}</span>
      <span>resolution {resolution}</span>
    </Dialog>
  )
};

MenuSettings.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default MenuSettings;
