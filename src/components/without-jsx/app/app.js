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
import { createInitAction, createSetLoopModeAction, createStartLoopAction } from '../../../worker/actions/actions';
import { LOOP_MODS } from '../../../worker/const/mode';
import { CPU_THREAD_SYNC } from '../../../chip-8/memory/const/index';
import { getBytesFromMemory } from '../../../chip-8/memory/memory';
import { byteIndexToFutexBufferIndex, createFutex, lock, unlock, promisifyPostMessage } from '../../../worker/utils/index';

const syncIndex = byteIndexToFutexBufferIndex(CPU_THREAD_SYNC);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.chip8Ref = React.createRef();
    this.chip8 = createSharedChip8(MOCK_GAME);
    this.futex = createFutex(getBytesFromMemory(getMemory(this.chip8)).buffer, syncIndex);
    this.requestCallback = null;
    this.props.disassemblyCode(MOCK_GAME);
  }

  componentDidMount() {
    const { speedMode } = this.props;

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
    .then(() => promisifyPostMessage(this.cpuThread, createSetLoopModeAction(speedMode)))
    .then(() => promisifyPostMessage(this.cpuThread, createStartLoopAction()))
    .then(this.mainLoop);
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
    const { shaderLoading, resolutionMode } = this.props;

    return (
      shaderLoading ?
      React.createElement('span', null, 'loading') :
      React.createElement(Chip8, {
        ref: this.chip8Ref,
        chip8: this.chip8,
        scale: resolutionMode,
      }, null)
    );
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
