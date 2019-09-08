import React, { useEffect, useRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { tap } from 'rxjs/operators';
import { useSelector, useDispatch } from 'react-redux';

import Chip8 from '../chip-8/chip-8';
import MenuSettings from '../menu-settings/menu-settings';

import { initCpuThread, useGameAssetsLoading, useMenuOpen, mainLoop, startCpuThread, stopCpuThread } from './methods';
import { MOCK_GAME } from '../../../chip-8/processor/const/index';
import { createSharedChip8, getMemory } from '../../../chip-8/chip-8';
import { selectCpuThreadUrlBlob } from '../../../redux/thread/thread.selectors';
import { selectResolutionValue, selectSpeedModeValue } from '../../../redux/settings/settings.selectors';
import { setResolutionMode } from '../../../redux/settings/settings.actions';
import { findOptinByValue } from '../../../util/index';
import { RESOLUTIONS_MODS } from '../../../redux/settings/const/index';
import { disassemblyCode } from '../../../redux/assembly/assembly.actions';
import { getBytesFromMemory } from '../../../chip-8/memory/memory';

import './game.css';

let cpuThread = null;
let chip8 = null;
let terminateLoop = { terminate: () => {} };

function pause() {
  terminateLoop.terminate()
}

const Game = () => {
  const [menuOpen, setMenuClose] = useMenuOpen(false, switchLoopState, cpuThread);

  const cpuBlob = useSelector(selectCpuThreadUrlBlob);
  const speedMode = useSelector(selectSpeedModeValue);
  const resolution = useSelector(selectResolutionValue);
  const loaded = useGameAssetsLoading();

  const chip8Ref = useRef();

  const dispatch = useDispatch();

  function onCloseMenu() {
    startCpuThread(dispatch, cpuThread).subscribe(() => {
      start();
      setMenuClose();
    });
  }

  function switchLoopState(menuOpen) {
    if (menuOpen) {
      return startCpuThread(dispatch, cpuThread).pipe(tap(start));
    }

    return stopCpuThread(dispatch, cpuThread).pipe(tap(pause));
  }

  function start() {
    return mainLoop(terminateLoop, getBytesFromMemory(getMemory(chip8)).buffer, chip8Ref);
  }

  useEffect(() => {
    chip8 = createSharedChip8(MOCK_GAME);
    dispatch(setResolutionMode(findOptinByValue(RESOLUTIONS_MODS, 10)));
    dispatch(disassemblyCode(MOCK_GAME));
  }, []);

  useEffect(() => {
    if (cpuBlob) {
      cpuThread = new Worker(cpuBlob);

      const subcription = initCpuThread(dispatch, cpuThread, chip8, speedMode)
      .subscribe(start);
  
      return () => { 
        subcription.unsubscribe();
        terminateLoop.terminate();
      }
    }
  }, [cpuBlob]);

  return (
    loaded ?
    (
      <div>
        <Chip8 ref={chip8Ref} chip8={chip8} scale={resolution} />
        <MenuSettings open={menuOpen} onCloseModal={onCloseMenu} />
      </div>
    ) :
    <div className='game__loader'>
      <CircularProgress />
    </div>
  );
};

export default Game;
