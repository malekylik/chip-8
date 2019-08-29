import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Chip8 from '../chip-8/chip-8';

import { createSharedChip8, getInt32MemoryBytes } from '../../../chip-8/chip-8';
import { MOCK_GAME } from '../../../chip-8/processor/const/index';
import { selectSubAssemblyLines } from '../../../redux/assembly/assembly.selectors';
import { disassemblyCode } from '../../../redux/assembly/assembly.actions';
import { loadShaders } from '../../../redux/shader/shader.actions';
import { selectLoadingShaders } from '../../../redux/shader/shader.selectors';
import { createInitAction, createSetLoopModeAction, createStartLoopAction } from '../../../worker/actions/actions';
import { LOOP_MODS } from '../../../worker/const/mode';
import { CPU_THREAD_SYNC } from '../../../chip-8/memory/const/index';

const syncIndex = CPU_THREAD_SYNC >>> 2;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { scale: 10 };

    this.chip8Ref = React.createRef();
    this.chip8 = createSharedChip8(MOCK_GAME);
    this.lockMemory = getInt32MemoryBytes(this.chip8);
    this.requestCallback = null;
    this.props.disassemblyCode(MOCK_GAME);
  }

  componentDidMount() {
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

      this.cpuThread.postMessage(createInitAction(this.chip8));
      this.cpuThread.postMessage(createSetLoopModeAction(LOOP_MODS.DEFAULT_SPEED_MODE));
      this.cpuThread.postMessage(createStartLoopAction());
    })
    .then(this.mainLoop);
  }

  mainLoop = () => {
    this.requestCallback = requestAnimationFrame(this.mainLoop);
    const { lockMemory } = this;

    Atomics.store(lockMemory, syncIndex, 1);
    this.nextStep();
    Atomics.store(lockMemory, syncIndex, 0);

    Atomics.notify(lockMemory, syncIndex, 1);
  }

  nextStep() {
    this.chip8Ref.current.executeNextCycly();
  }

  render() {
    const { shaderLoading } = this.props;
    const { scale } = this.state;

    return (
      // null
      shaderLoading ?
      React.createElement('span', null, 'loading') :
      React.createElement(Chip8, {
        ref: this.chip8Ref,
        chip8: this.chip8,
        scale,
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
  });
}

const mapDispatchToProps = {
  disassemblyCode,
  loadShaders,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
