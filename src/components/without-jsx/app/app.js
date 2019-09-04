import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Chip8 from '../chip-8/chip-8';

import { createSharedChip8, getMemory } from '../../../chip-8/chip-8';
import { MOCK_GAME } from '../../../chip-8/processor/const/index';
import { selectSubAssemblyLines } from '../../../redux/assembly/assembly.selectors';
import { disassemblyCode } from '../../../redux/assembly/assembly.actions';
import { loadShaders } from '../../../redux/shader/shader.actions';
import { selectLoadingShaders } from '../../../redux/shader/shader.selectors';
import { selectResolutionValue, selectSpeedModeValue } from '../../../redux/settings/settings.selectors';
import { createInitAction } from '../../../worker/actions/actions';
import { CPU_THREAD_SYNC } from '../../../chip-8/memory/const/index';
import { getBytesFromMemory } from '../../../chip-8/memory/memory';
import { byteIndexToFutexBufferIndex, createFutex, lock, unlock, promisifyPostMessage } from '../../../worker/utils/index';
import { runCpuThread, setCpuThreadSpeedMode, setResolutionMode } from '../../../redux/settings/settings.actions';
import { findOptinByValue } from '../../../util/index';
import { RESOLUTIONS_MODS } from '../../../redux/settings/const/index';
import { APP_STATES } from './const/index';

const syncIndex = byteIndexToFutexBufferIndex(CPU_THREAD_SYNC);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: APP_STATES.game,
    };

    this.chip8Ref = React.createRef();
    this.chip8 = createSharedChip8(MOCK_GAME);
    this.futex = createFutex(getBytesFromMemory(getMemory(this.chip8)).buffer, syncIndex);
    this.requestCallback = null;
    this.props.disassemblyCode(MOCK_GAME);
  }

  componentDidMount() {
    const { speedMode } = this.props;

    this.props.setResolutionMode(findOptinByValue(RESOLUTIONS_MODS, 10));

    Promise.all([
      this.props.loadShaders(
        './src/assets/shaders/main.vert',
        './src/assets/shaders/main.frag',
      ),
      fetch('./dist/cpu-thread.js')
    ])
    .then(([shaders, worker]) => worker.blob())
    .then(worker => {
      this.cpuThread = new Worker(URL.createObjectURL(worker));

      return promisifyPostMessage(this.cpuThread, createInitAction(this.chip8));
    })
    .then(() => this.props.setCpuThreadSpeedMode(this.cpuThread, speedMode))
    .then(() => this.props.runCpuThread(this.cpuThread))
    .then(() => this.mainLoop());
  }

  mainLoop = () => {
    this.requestCallback = requestAnimationFrame(this.mainLoop);
    const { futex } = this;

    lock(futex);
    this.nextStep();
    unlock(futex);
  }

  nextStep() {
    this.chip8Ref.current.executeNextCycly();
  }

  render() {
    const { appState } = this.state;
    const { shaderLoading, resolutionMode } = this.props;

    switch (appState) {
      case APP_STATES['games-list']: return null;
      case APP_STATES.game: return (
        shaderLoading ?
        React.createElement('span', null, 'loading') :
        React.createElement(Chip8, {
          ref: this.chip8Ref,
          chip8: this.chip8,
          scale: resolutionMode,
        }, null)
      );
    }

    return null;
  }
}

App.propTypes = {
  assemblyLines: PropTypes.arrayOf(PropTypes.object).isRequired,
  disassemblyCode: PropTypes.func.isRequired,
  loadShaders: PropTypes.func.isRequired,
  shaderLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return ({
    assemblyLines: selectSubAssemblyLines(state),
    shaderLoading: selectLoadingShaders(state),
    resolutionMode: selectResolutionValue(state),
    speedMode: selectSpeedModeValue(state),
  });
}

const mapDispatchToProps = {
  disassemblyCode,
  loadShaders,
  runCpuThread,
  setCpuThreadSpeedMode,
  setResolutionMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
