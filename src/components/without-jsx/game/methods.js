import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { from, fromEvent } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';

import { loadCpuThread } from '../../../redux/thread/thread.actions';
import { loadShaders } from '../../../redux/shader/shader.actions';
import { createFutex, promisifyPostMessage, lock, unlock } from '../../../worker/utils/index';
import { createInitAction, createSetLoopModeAction  } from '../../../worker/actions/actions';
import { runCpuThread, setCpuThreadSpeedMode, terminateCpuThread } from '../../../redux/settings/settings.actions';
import { selectLoadedShaders, selectLoadingShaders } from '../../../redux/shader/shader.selectors';
import { selectCpuThreadLoaded, selectCpuThreadLoading } from '../../../redux/thread/thread.selectors';
import { SYNC_INDEX } from '../../../worker/const/worker';

export function initCpuThread(dispatch, worker, chip8, speedMode) {
  return from(promisifyPostMessage(worker, createInitAction(chip8)))
  .pipe(
    mergeMap(() => from(dispatch(setCpuThreadSpeedMode(worker, speedMode)))),
    mergeMap(() => from(dispatch(runCpuThread(worker)))),
  );
}

export function startCpuThread(dispatch, worker) {
  return from(dispatch(runCpuThread(worker)));
}

export function stopCpuThread(dispatch, worker) {
  return from(dispatch(terminateCpuThread(worker)))
}

export function changeSpeedMode(worker, speedMode) {
  return from(promisifyPostMessage(worker, createSetLoopModeAction(speedMode)));
}

export function nextStep(chip8Ref) {
  chip8Ref.current.executeNextCycly();
}

export function useGameAssetsLoading() {
  const isShaderLoaded = useSelector(selectLoadedShaders);
  const isShaderLoading = useSelector(selectLoadingShaders);
  const isCpuThreadLoaded = useSelector(selectCpuThreadLoaded);
  const isCpuThreadLoading = useSelector(selectCpuThreadLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isShaderLoaded && !isShaderLoading) {
      dispatch(loadShaders(
        './src/assets/shaders/main.vert',
        './src/assets/shaders/main.frag',
      ));
    }

    if (!isCpuThreadLoaded && !isCpuThreadLoading) {
      dispatch(loadCpuThread('./dist/cpu-thread.js'));
    }
  }, []);

  return (
    (isShaderLoaded && !isShaderLoading) &&
    (isCpuThreadLoaded && !isCpuThreadLoading)
  );
}

export function useMenuOpen(defaultValue, callback, worker) {
  const [menuOpen, changeMenuOpen] = useState(defaultValue);

  function handleMenuClose() {
    changeMenuOpen(false);
  }

  useEffect(() => {
    const subscription = fromEvent(window, 'keypress')
    .pipe(
      filter((e) => e.code === 'Backslash'),
      mergeMap(() => callback(menuOpen))
    ).subscribe(() => {
      changeMenuOpen(!menuOpen);
    });

    return () => subscription.unsubscribe();
  }, [menuOpen, worker]);

  return [menuOpen, handleMenuClose];
}

export function mainLoop(terminate, chip8Buffer, chip8Ref) {
  const futex = createFutex(chip8Buffer, SYNC_INDEX);

  (function innerMainLoop() {
    const requestCallback = requestAnimationFrame(innerMainLoop);

    lock(futex);
    nextStep(chip8Ref);
    unlock(futex);

    terminate.terminate = () => cancelAnimationFrame(requestCallback);
  })();
}

// export function Stop
