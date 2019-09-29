import { useRef, useReducer, useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { useDispatch } from 'react-redux';

import { setNewRom } from '../../../redux/roms/roms.actions';

const initState = {
  name: null,
  progress: -1,
  loading: false,
};

const SET_LOADING = 'SET_LOADING';
const SET_PROGRESS = 'SET_PROGRESS';
const SET_NAME = 'SET_NAME';

export function useLoadingState(fileInputRef) {
  const [state, localDispatch] = useReducer(reducer, initState);
  const loadRequestSubscrtiption = useRef({ unsubscribe: noop });
  const progressRequestSubscrtiption = useRef({ unsubscribe: noop });

  const dispatch = useDispatch();

  function loadFile() {
    const files = fileInputRef.current.files;

    if (files.length) {
      const fileReader = new FileReader();
      const file = files[0];

      loadRequestSubscrtiption.current = fromEvent(fileReader, 'load').subscribe(
        (e) => {
          const bin = e.target.result;
          localDispatch(createSetLoading(false));
          dispatch(setNewRom(file.name, new Uint8Array(bin)));

          loadRequestSubscrtiption.current.unsubscribe();
          progressRequestSubscrtiption.current.unsubscribe();
        }
      );

      progressRequestSubscrtiption.current = fromEvent(fileReader, 'progress').subscribe(
        (e) => {
          const { loaded, total } = e;

          localDispatch(createSetProgress(((loaded / total) * 100) | 0));
        }
      );

      fileReader.readAsArrayBuffer(file);

      localDispatch(createSetName(file.name));
      localDispatch(createSetProgress(0));
      localDispatch(createSetLoading(true));
    }
  }

  useEffect(() => {
    return () => {
      loadRequestSubscrtiption.current.unsubscribe();
      progressRequestSubscrtiption.current.unsubscribe();
    };
  }, []);

  return [state, loadFile];
}

function reducer(state, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload.loading };
    case SET_PROGRESS:
      return { ...state, progress: action.payload.progress };
    case SET_NAME:
      return { ...state, name: action.payload.name };
  }
}

function createSetLoading(loading) {
  return ({
    type: SET_LOADING,
    payload: { loading }
  });
}

function createSetProgress(progress) {
  return ({
    type: SET_PROGRESS,
    payload: { progress }
  });
}

function createSetName(name) {
  return ({
    type: SET_NAME,
    payload: { name }
  });
}

function noop() {};
