export const selectSettingsReducer = state => state.settingsReducer;

export const selectResolutionValue = state => selectSettingsReducer(state).resolution.value;

export const selectSpeedModeValue = state => selectSettingsReducer(state).speedMode.value;

export const selectRendererModeValue = state => selectSettingsReducer(state).rendererMode.value;

export const selectShowDebbugInfo = state => selectSettingsReducer(state).showDebbugInfo;

export const selectIsRunning = state => selectSettingsReducer(state).isRunning;
