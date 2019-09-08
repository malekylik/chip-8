import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useSelector, useDispatch } from 'react-redux';

import { selectResolutionValue, selectSpeedModeValue } from '../../../redux/settings/settings.selectors';
import { RESOLUTIONS_MODS, LOOP_MODS_OPTIONS } from '../../../redux/settings/const/index';
import { setResolutionMode, setSpeedMode } from '../../../redux/settings/settings.actions';
import { findOptinByValue } from '../../../util/index';

import './menu-settings.css';

const MenuSettings = (props) => {
  const { open, onCloseModal } = props;

  const speedMode = useSelector(selectSpeedModeValue);
  const resolution = useSelector(selectResolutionValue);

  const dispatch = useDispatch();

  function changeResolution(event) {
    dispatch(setResolutionMode(findOptinByValue(RESOLUTIONS_MODS, event.target.value)));
  }

  function changeSpeedMode(event) {
    dispatch(setSpeedMode(findOptinByValue(LOOP_MODS_OPTIONS, event.target.value)));
  }

  return (
    <Dialog fullWidth open={open} onClose={onCloseModal}>
      <div className='menu-settings'>
        <FormControl fullWidth>
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

        <FormControl fullWidth>
          <InputLabel htmlFor='speed-mode'>Speed Mode</InputLabel>
          <Select
            inputProps={{
              name: 'speed-mode',
              id: 'speed-mode',
            }}
            value={speedMode}
            onChange={changeSpeedMode}>
            {
              LOOP_MODS_OPTIONS.map(({ value, label }, i) => (
                <MenuItem key={i} value={value}>{label}</MenuItem>
              ))
            }
          </Select>
        </FormControl>

      </div>
    </Dialog>
  )
};

MenuSettings.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default MenuSettings;
