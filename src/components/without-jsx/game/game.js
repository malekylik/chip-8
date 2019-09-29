import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import { tap } from 'rxjs/operators';
import { useSelector, useDispatch } from 'react-redux';

import Chip8 from '../chip-8/chip-8';
import MenuSettings from '../menu-settings/menu-settings';

import {
  initCpuThread,
  useGameAssetsLoading,
  useMenuOpen,
  useRom,
  mainLoop,
  startCpuThread,
  stopCpuThread,
  changeSpeedMode,
  executeNextInst,
} from './methods';
import { createSharedChip8, getMemory } from '../../../chip-8/chip-8';
import { selectCpuThreadUrlBlob } from '../../../redux/thread/thread.selectors';
import { selectResolutionValue, selectSpeedModeValue } from '../../../redux/settings/settings.selectors';
import { setResolutionMode } from '../../../redux/settings/settings.actions';
import { findOptinByValue } from '../../../util/index';
import { RESOLUTIONS_MODS } from '../../../redux/settings/const/index';
import { disassemblyCode } from '../../../redux/assembly/assembly.actions';
import { getBytesFromMemory } from '../../../chip-8/memory/memory';

import './game.less';

const Game = ({ goToGameListState }) => {
  const rom = useRom();

  const cpuThread = useRef(null);
  const chip8 = useRef(createSharedChip8(rom));
  const terminateLoop = useRef({ terminate: () => {} });

  const [menuOpen, setMenuClose] = useMenuOpen(false, switchLoopState, cpuThread.current);

  const cpuBlob = useSelector(selectCpuThreadUrlBlob);
  const speedMode = useSelector(selectSpeedModeValue);
  const resolution = useSelector(selectResolutionValue);
  const loaded = useGameAssetsLoading();

  const chip8Ref = useRef();

  const dispatch = useDispatch();

  function onCloseMenu() {
    startCpuThread(dispatch, cpuThread.current).subscribe(() => {
      start();
      setMenuClose();
    });
  }

  function switchLoopState(menuOpen) {
    if (menuOpen) {
      return startCpuThread(dispatch, cpuThread.current).pipe(tap(start));
    }

    return stopCpuThread(dispatch, cpuThread.current).pipe(tap(pause));
  }

  function start() {
    return mainLoop(terminateLoop.current, getBytesFromMemory(getMemory(chip8.current)).buffer, chip8Ref);
  }

  function executeNextInstruction() {
    return executeNextInst(cpuThread.current);
  }

  function pause() {
    terminateLoop.current.terminate()
  }

  useEffect(() => {
    dispatch(setResolutionMode(findOptinByValue(RESOLUTIONS_MODS, 10)));
    dispatch(disassemblyCode(rom));
  }, []);

  useEffect(() => {
    if (cpuBlob) {
      cpuThread.current = new Worker(cpuBlob);

      const subcription = initCpuThread(dispatch, cpuThread.current, chip8.current, speedMode)
      .subscribe(start);
  
      return () => {
        cpuThread.current.terminate();
        subcription.unsubscribe();
        terminateLoop.current.terminate();
      }
    }
  }, [cpuBlob]);

  useEffect(() => {
    if (cpuThread.current) {
      const subcription = changeSpeedMode(cpuThread.current, speedMode).subscribe();

      return () => subcription.unsubscribe();
    }
  }, [speedMode]);

  return (
    loaded ?
    (
      <div>
        <Chip8
          ref={chip8Ref}
          chip8={chip8.current}
          scale={resolution}
          switchLoopState={switchLoopState}
          executeNextInstruction={executeNextInstruction} />
        <MenuSettings open={menuOpen} goToGameListState={goToGameListState} onCloseModal={onCloseMenu} />
      </div>
    ) :
    <div className='game__loader'>
      <CircularProgress />
    </div>
  );
};

Game.propTypes = {
  goToGameListState: PropTypes.func.isRequired,
};

export default Game;
