type Callback<K extends keyof RequestMethodReturnMap> = (
  error?: Error | ObsError,
  response?: RequestMethodReturnMap[K]
) => void;

interface ObsError {
  messageId: string;
  status: 'error';
  error: string;
}

interface SceneItem {
  cy: number;
  cx: number;
  alignment: number;
  name: string;
  id: number;
  render: boolean;
  muted: boolean;
  locked: boolean;
  source_cx: number;
  source_cy: number;
  type: string;
  volume: number;
  x: number;
  y: number;
  parentGroupName?: string;
  groupChildren?: SceneItem[];
}

interface SceneItemTransform {
  rotation: number;
  visible: boolean;
  locked: boolean;
  sourceWidth: number;
  sourceHeight: number;
  width: number;
  height: number;
  parentGroupName?: string;
  groupChildren?: SceneItemTransform[];
  position: { x: number; y: number; alignment: number };
  scale: { x: number; y: number; filter: string };
  crop: { top: number; right: number; bottom: number; left: number };
  bounds: { type: string; alignment: number; x: number; y: number };
}

interface OBSStats {
  fps: number;
  'render-total-frames': number;
  'render-missed-frames': number;
  'output-total-frames': number;
  'output-skipped-frames': number;
  'average-frame-time': number;
  'cpu-usage': number;
  'memory-usage': number;
  'free-disk-space': number;
}

interface Output {
  name: string;
  type: string;
  width: number;
  height: number;
  flags: {
    rawValue: number;
    audio: boolean;
    video: boolean;
    encoded: boolean;
    multiTrack: boolean;
    service: boolean;
  };
  settings: {};
  active: boolean;
  reconnecting: boolean;
  congestion: number;
  totalFrames: number;
  droppedFrames: number;
  totalBytes: number;
}

interface ScenesCollection {
  'sc-name': string;
}

interface Scene {
  name: string;
  sources: SceneItem[];
}
//}

interface RequestMethodsArgsMap {
  GetVersion: void;

  GetAuthRequired: void;

  Authenticate: { auth: string };

  SetHeartbeat: { enable: boolean };

  SetFilenameFormatting: { 'filename-formatting': string };

  GetFilenameFormatting: void;

  GetStats: void;

  BroadcastCustomMessage: { realm: string; data: {} };

  GetVideoInfo: void;

  OpenProjector: {
    type?: string;
    monitor?: number;
    geometry?: string;
    name?: string;
  };

  TriggerHotkeyByName: { hotkeyName: string };

  TriggerHotkeyBySequence: {
    keyId: string;
    keyModifiers?: {
      shift: boolean;
      alt: boolean;
      control: boolean;
      command: boolean;
    };
  };

  ExecuteBatch: {
    requests: {
      'request-type': string;
      'message-id'?: string;
      [k: string]: any;
    }[];
    abortOnFail?: boolean;
  };

  Sleep: { sleepMillis: number };

  PlayPauseMedia: { sourceName: string; playPause: boolean };

  RestartMedia: { sourceName: string };

  StopMedia: { sourceName: string };

  NextMedia: { sourceName: string };

  PreviousMedia: { sourceName: string };

  GetMediaDuration: { sourceName: string };

  GetMediaTime: { sourceName: string };

  SetMediaTime: { sourceName: string; timestamp: number };

  ScrubMedia: { sourceName: string; timeOffset: number };

  GetMediaState: { sourceName: string };

  GetMediaSourcesList: void;

  CreateSource: {
    sourceName: string;
    sourceKind: string;
    sceneName: string;
    sourceSettings?: {};
    setVisible?: boolean;
  };

  GetSourcesList: void;

  GetSourceTypesList: void;

  GetVolume: { source: string; useDecibel?: boolean };

  SetVolume: { source: string; volume: number; useDecibel?: boolean };

  SetTracks: { sourceName: string; track: number; active: boolean };

  GetTracks: { sourceName: string };

  GetMute: { source: string };

  SetMute: { source: string; mute: boolean };

  ToggleMute: { source: string };

  GetSourceActive: { sourceName: string };

  GetAudioActive: { sourceName: string };

  SetSourceName: { sourceName: string; newName: string };

  SetSyncOffset: { source: string; offset: number };

  GetSyncOffset: { source: string };

  GetSourceSettings: { sourceName: string; sourceType?: string };

  SetSourceSettings: {
    sourceName: string;
    sourceType?: string;
    sourceSettings: {};
  };

  GetTextGDIPlusProperties: { source: string };

  SetTextGDIPlusProperties: {
    source: string;
    align?: string;
    bk_color?: number;
    bk_opacity?: number;
    chatlog?: boolean;
    chatlog_lines?: number;
    color?: number;
    extents?: boolean;
    extents_cx?: number;
    extents_cy?: number;
    file?: string;
    read_from_file?: boolean;
    font?: { face?: string; flags?: number; size?: number; style?: string };
    gradient?: boolean;
    gradient_color?: number;
    gradient_dir?: number;
    gradient_opacity?: number;
    outline?: boolean;
    outline_color?: number;
    outline_size?: number;
    outline_opacity?: number;
    text?: string;
    valign?: string;
    vertical?: boolean;
    render?: boolean;
  };

  GetTextFreetype2Properties: { source: string };

  SetTextFreetype2Properties: {
    source: string;
    color1?: number;
    color2?: number;
    custom_width?: number;
    drop_shadow?: boolean;
    font?: { face?: string; flags?: number; size?: number; style?: string };
    from_file?: boolean;
    log_mode?: boolean;
    outline?: boolean;
    text?: string;
    text_file?: string;
    word_wrap?: boolean;
  };

  GetBrowserSourceProperties: { source: string };

  SetBrowserSourceProperties: {
    source: string;
    is_local_file?: boolean;
    local_file?: string;
    url?: string;
    css?: string;
    width?: number;
    height?: number;
    fps?: number;
    shutdown?: boolean;
    render?: boolean;
  };

  GetSpecialSources: void;

  GetSourceFilters: { sourceName: string };

  GetSourceFilterInfo: { sourceName: string; filterName: string };

  AddFilterToSource: {
    sourceName: string;
    filterName: string;
    filterType: string;
    filterSettings: {};
  };

  RemoveFilterFromSource: { sourceName: string; filterName: string };

  ReorderSourceFilter: {
    sourceName: string;
    filterName: string;
    newIndex: number;
  };

  MoveSourceFilter: {
    sourceName: string;
    filterName: string;
    movementType: string;
  };

  SetSourceFilterSettings: {
    sourceName: string;
    filterName: string;
    filterSettings: {};
  };

  SetSourceFilterVisibility: {
    sourceName: string;
    filterName: string;
    filterEnabled: boolean;
  };

  GetAudioMonitorType: { sourceName: string };

  SetAudioMonitorType: { sourceName: string; monitorType: string };

  GetSourceDefaultSettings: { sourceKind: string };

  TakeSourceScreenshot: {
    sourceName?: string;
    embedPictureFormat?: string;
    saveToFilePath?: string;
    fileFormat?: string;
    compressionQuality?: number;
    width?: number;
    height?: number;
  };

  RefreshBrowserSource: { sourceName: string };

  ListOutputs: void;

  GetOutputInfo: { outputName: string };

  StartOutput: { outputName: string };

  StopOutput: { outputName: string; force?: boolean };

  SetCurrentProfile: { 'profile-name': string };

  GetCurrentProfile: void;

  ListProfiles: void;

  GetRecordingStatus: void;

  StartStopRecording: void;

  StartRecording: void;

  StopRecording: void;

  PauseRecording: void;

  ResumeRecording: void;

  SetRecordingFolder: { 'rec-folder': string };

  GetRecordingFolder: void;

  GetReplayBufferStatus: void;

  StartStopReplayBuffer: void;

  StartReplayBuffer: void;

  StopReplayBuffer: void;

  SaveReplayBuffer: void;

  SetCurrentSceneCollection: { 'sc-name': string };

  GetCurrentSceneCollection: void;

  ListSceneCollections: void;

  GetSceneItemList: { sceneName?: string };

  GetSceneItemProperties: {
    'scene-name'?: string;
    item: { name?: string; id?: number };
  };

  SetSceneItemProperties: {
    'scene-name'?: string;
    item: { name?: string; id?: number };
    rotation?: number;
    visible?: boolean;
    locked?: boolean;
    position: { x?: number; y?: number; alignment?: number };
    scale: { x?: number; y?: number; filter?: string };
    crop: { top?: number; bottom?: number; left?: number; right?: number };
    bounds: { type?: string; alignment?: number; x?: number; y?: number };
  };

  ResetSceneItem: {
    'scene-name'?: string;
    item: { name?: string; id?: number };
  };

  SetSceneItemRender: {
    'scene-name'?: string;
    source?: string;
    item?: number;
    render: boolean;
  };

  SetSceneItemPosition: {
    'scene-name'?: string;
    item: string;
    x: number;
    y: number;
  };

  SetSceneItemTransform: {
    'scene-name'?: string;
    item: string;
    'x-scale': number;
    'y-scale': number;
    rotation: number;
  };

  SetSceneItemCrop: {
    'scene-name'?: string;
    item: string;
    top: number;
    bottom: number;
    left: number;
    right: number;
  };

  DeleteSceneItem: { scene?: string; item: { name: string; id: number } };

  AddSceneItem: {
    sceneName: string;
    sourceName: string;
    setVisible?: boolean;
  };

  DuplicateSceneItem: {
    fromScene?: string;
    toScene?: string;
    item: { name: string; id: number };
  };

  SetCurrentScene: { 'scene-name': string };

  GetCurrentScene: void;

  GetSceneList: void;

  CreateScene: { sceneName: string };

  ReorderSceneItems: {
    scene?: string;
    items: { id?: number; name?: string }[];
  };

  SetSceneTransitionOverride: {
    sceneName: string;
    transitionName: string;
    transitionDuration?: number;
  };

  RemoveSceneTransitionOverride: { sceneName: string };

  GetSceneTransitionOverride: { sceneName: string };

  GetStreamingStatus: void;

  StartStopStreaming: void;

  StartStreaming: {
    stream?: {
      type?: string;
      metadata?: {};
      settings?: {
        server?: string;
        key?: string;
        use_auth?: boolean;
        username?: string;
        password?: string;
      };
    };
  };

  StopStreaming: void;

  SetStreamSettings: {
    type: string;
    settings: {
      server?: string;
      key?: string;
      use_auth?: boolean;
      username?: string;
      password?: string;
    };
    save: boolean;
  };

  GetStreamSettings: void;

  SaveStreamSettings: void;

  SendCaptions: { text: string };

  GetStudioModeStatus: void;

  GetPreviewScene: void;

  SetPreviewScene: { 'scene-name': string };

  TransitionToProgram: {
    'with-transition'?: { name: string; duration?: number };
  };

  EnableStudioMode: void;

  DisableStudioMode: void;

  ToggleStudioMode: void;

  GetTransitionList: void;

  GetCurrentTransition: void;

  SetCurrentTransition: { 'transition-name': string };

  SetTransitionDuration: { duration: number };

  GetTransitionDuration: void;

  GetTransitionPosition: void;

  GetTransitionSettings: { transitionName: string };

  SetTransitionSettings: { transitionName: string; transitionSettings: {} };

  ReleaseTBar: void;

  SetTBarPosition: { position: number; release?: boolean };

  GetVirtualCamStatus: void;

  StartStopVirtualCam: void;

  StartVirtualCam: void;

  StopVirtualCam: void;
}

interface RequestMethodReturnMap {
  GetVersion: {
    messageId: string;
    status: 'ok';
    version: number;
    'obs-websocket-version': string;
    'obs-studio-version': string;
    'available-requests': string;
    'supported-image-export-formats': string;
  };

  GetAuthRequired: {
    messageId: string;
    status: 'ok';
    authRequired: boolean;
    challenge?: string;
    salt?: string;
  };

  Authenticate: void;

  SetHeartbeat: void;

  SetFilenameFormatting: void;

  GetFilenameFormatting: {
    messageId: string;
    status: 'ok';
    'filename-formatting': string;
  };

  GetStats: { messageId: string; status: 'ok'; stats: OBSStats };

  BroadcastCustomMessage: void;

  GetVideoInfo: {
    messageId: string;
    status: 'ok';
    baseWidth: number;
    baseHeight: number;
    outputWidth: number;
    outputHeight: number;
    scaleType: string;
    fps: number;
    videoFormat: string;
    colorSpace: string;
    colorRange: string;
  };

  OpenProjector: void;

  TriggerHotkeyByName: void;

  TriggerHotkeyBySequence: void;

  ExecuteBatch: {
    messageId: string;
    status: 'ok';
    results: {
      'message-id': string;
      status: string;
      error?: string;
      [k: string]: any;
    }[];
  };

  Sleep: void;

  PlayPauseMedia: void;

  RestartMedia: void;

  StopMedia: void;

  NextMedia: void;

  PreviousMedia: void;

  GetMediaDuration: {
    messageId: string;
    status: 'ok';
    mediaDuration: number;
  };

  GetMediaTime: { messageId: string; status: 'ok'; timestamp: number };

  SetMediaTime: void;

  ScrubMedia: void;

  GetMediaState: { messageId: string; status: 'ok'; mediaState: string };

  GetMediaSourcesList: {
    messageId: string;
    status: 'ok';
    mediaSources: {
      sourceName: string;
      sourceKind: string;
      mediaState: string;
    }[];
  };

  CreateSource: { messageId: string; status: 'ok'; itemId: number };

  GetSourcesList: {
    messageId: string;
    status: 'ok';
    sources: { name: string; typeId: string; type: string }[];
  };

  GetSourceTypesList: {
    messageId: string;
    status: 'ok';
    types: {
      typeId: string;
      displayName: string;
      type: string;
      defaultSettings: {};
      caps: {
        isAsync: boolean;
        hasVideo: boolean;
        hasAudio: boolean;
        canInteract: boolean;
        isComposite: boolean;
        doNotDuplicate: boolean;
        doNotSelfMonitor: boolean;
      };
    }[];
  };

  GetVolume: {
    messageId: string;
    status: 'ok';
    name: string;
    volume: number;
    muted: boolean;
  };

  SetVolume: void;

  SetTracks: void;

  GetTracks: {
    messageId: string;
    status: 'ok';
    track1: boolean;
    track2: boolean;
    track3: boolean;
    track4: boolean;
    track5: boolean;
    track6: boolean;
  };

  GetMute: { messageId: string; status: 'ok'; name: string; muted: boolean };

  SetMute: void;

  ToggleMute: void;

  GetSourceActive: { messageId: string; status: 'ok'; sourceActive: boolean };

  GetAudioActive: { messageId: string; status: 'ok'; audioActive: boolean };

  SetSourceName: void;

  SetSyncOffset: void;

  GetSyncOffset: {
    messageId: string;
    status: 'ok';
    name: string;
    offset: number;
  };

  GetSourceSettings: {
    messageId: string;
    status: 'ok';
    sourceName: string;
    sourceType: string;
    sourceSettings: {};
  };

  SetSourceSettings: {
    messageId: string;
    status: 'ok';
    sourceName: string;
    sourceType: string;
    sourceSettings: {};
  };

  GetTextGDIPlusProperties: {
    messageId: string;
    status: 'ok';
    source: string;
    align: string;
    bk_color: number;
    bk_opacity: number;
    chatlog: boolean;
    chatlog_lines: number;
    color: number;
    extents: boolean;
    extents_cx: number;
    extents_cy: number;
    file: string;
    read_from_file: boolean;
    font: { face: string; flags: number; size: number; style: string };
    gradient: boolean;
    gradient_color: number;
    gradient_dir: number;
    gradient_opacity: number;
    outline: boolean;
    outline_color: number;
    outline_size: number;
    outline_opacity: number;
    text: string;
    valign: string;
    vertical: boolean;
  };

  SetTextGDIPlusProperties: void;

  GetTextFreetype2Properties: {
    messageId: string;
    status: 'ok';
    source: string;
    color1: number;
    color2: number;
    custom_width: number;
    drop_shadow: boolean;
    font: { face: string; flags: number; size: number; style: string };
    from_file: boolean;
    log_mode: boolean;
    outline: boolean;
    text: string;
    text_file: string;
    word_wrap: boolean;
  };

  SetTextFreetype2Properties: void;

  GetBrowserSourceProperties: {
    messageId: string;
    status: 'ok';
    source: string;
    is_local_file: boolean;
    local_file: string;
    url: string;
    css: string;
    width: number;
    height: number;
    fps: number;
    shutdown: boolean;
  };

  SetBrowserSourceProperties: void;

  GetSpecialSources: {
    messageId: string;
    status: 'ok';
    'desktop-1'?: string;
    'desktop-2'?: string;
    'mic-1'?: string;
    'mic-2'?: string;
    'mic-3'?: string;
  };

  GetSourceFilters: {
    messageId: string;
    status: 'ok';
    filters: { enabled: boolean; type: string; name: string; settings: {} }[];
  };

  GetSourceFilterInfo: {
    messageId: string;
    status: 'ok';
    enabled: boolean;
    type: string;
    name: string;
    settings: {};
  };

  AddFilterToSource: void;

  RemoveFilterFromSource: void;

  ReorderSourceFilter: void;

  MoveSourceFilter: void;

  SetSourceFilterSettings: void;

  SetSourceFilterVisibility: void;

  GetAudioMonitorType: {
    messageId: string;
    status: 'ok';
    monitorType: string;
  };

  SetAudioMonitorType: void;

  GetSourceDefaultSettings: {
    messageId: string;
    status: 'ok';
    sourceKind: string;
    defaultSettings: {};
  };

  TakeSourceScreenshot: {
    messageId: string;
    status: 'ok';
    sourceName: string;
    img: string;
    imageFile: string;
  };

  RefreshBrowserSource: void;

  ListOutputs: {
    messageId: string;
    status: 'ok';
    outputs: Output[];
  };

  GetOutputInfo: {
    messageId: string;
    status: 'ok';
    outputInfo: Output;
  };

  StartOutput: void;

  StopOutput: void;

  SetCurrentProfile: void;

  GetCurrentProfile: {
    messageId: string;
    status: 'ok';
    'profile-name': string;
  };

  ListProfiles: {
    messageId: string;
    status: 'ok';
    profiles: { 'profile-name': string }[];
  };

  GetRecordingStatus: {
    messageId: string;
    status: 'ok';
    isRecording: boolean;
    isRecordingPaused: boolean;
    recordTimecode?: string;
    recordingFilename?: string;
  };

  StartStopRecording: void;

  StartRecording: void;

  StopRecording: void;

  PauseRecording: void;

  ResumeRecording: void;

  SetRecordingFolder: void;

  GetRecordingFolder: {
    messageId: string;
    status: 'ok';
    'rec-folder': string;
  };

  GetReplayBufferStatus: {
    messageId: string;
    status: 'ok';
    isReplayBufferActive: boolean;
  };

  StartStopReplayBuffer: void;

  StartReplayBuffer: void;

  StopReplayBuffer: void;

  SaveReplayBuffer: void;

  SetCurrentSceneCollection: void;

  GetCurrentSceneCollection: {
    messageId: string;
    status: 'ok';
    'sc-name': string;
  };

  ListSceneCollections: {
    messageId: string;
    status: 'ok';
    'scene-collections': ScenesCollection[];
  };

  GetSceneItemList: {
    messageId: string;
    status: 'ok';
    sceneName: string;
    sceneItems: {
      itemId: number;
      sourceKind: string;
      sourceName: string;
      sourceType: string;
    }[];
  };

  GetSceneItemProperties: {
    messageId: string;
    status: 'ok';
    name: string;
    itemId: number;
    rotation: number;
    visible: boolean;
    muted: boolean;
    locked: boolean;
    sourceWidth: number;
    sourceHeight: number;
    width: number;
    height: number;
    parentGroupName?: string;
    groupChildren?: SceneItemTransform[];
    position: { x: number; y: number; alignment: number };
    scale: { x: number; y: number; filter: string };
    crop: { top: number; right: number; bottom: number; left: number };
    bounds: { type: string; alignment: number; x: number; y: number };
  };

  SetSceneItemProperties: void;

  ResetSceneItem: void;

  SetSceneItemRender: void;

  SetSceneItemPosition: void;

  SetSceneItemTransform: void;

  SetSceneItemCrop: void;

  DeleteSceneItem: void;

  AddSceneItem: { messageId: string; status: 'ok'; itemId: number };

  DuplicateSceneItem: {
    messageId: string;
    status: 'ok';
    scene: string;
    item: { id: number; name: string };
  };

  SetCurrentScene: void;

  GetCurrentScene: {
    messageId: string;
    status: 'ok';
    name: string;
    sources: SceneItem[];
  };

  GetSceneList: {
    messageId: string;
    status: 'ok';
    'current-scene': string;
    scenes: Scene[];
  };

  CreateScene: void;

  ReorderSceneItems: void;

  SetSceneTransitionOverride: void;

  RemoveSceneTransitionOverride: void;

  GetSceneTransitionOverride: {
    messageId: string;
    status: 'ok';
    transitionName: string;
    transitionDuration: number;
  };

  GetStreamingStatus: {
    messageId: string;
    status: 'ok';
    streaming: boolean;
    recording: boolean;
    'recording-paused': boolean;
    virtualcam: boolean;
    'preview-only': boolean;
    'stream-timecode'?: string;
    'rec-timecode'?: string;
    'virtualcam-timecode'?: string;
  };

  StartStopStreaming: void;

  StartStreaming: void;

  StopStreaming: void;

  SetStreamSettings: void;

  GetStreamSettings: {
    messageId: string;
    status: 'ok';
    type: string;
    settings: {
      server: string;
      key: string;
      use_auth: boolean;
      username: string;
      password: string;
    };
  };

  SaveStreamSettings: void;

  SendCaptions: void;

  GetStudioModeStatus: {
    messageId: string;
    status: 'ok';
    'studio-mode': boolean;
  };

  GetPreviewScene: {
    messageId: string;
    status: 'ok';
    name: string;
    sources: SceneItem[];
  };

  SetPreviewScene: void;

  TransitionToProgram: void;

  EnableStudioMode: void;

  DisableStudioMode: void;

  ToggleStudioMode: void;

  GetTransitionList: {
    messageId: string;
    status: 'ok';
    'current-transition': string;
    transitions: { name: string }[];
  };

  GetCurrentTransition: {
    messageId: string;
    status: 'ok';
    name: string;
    duration?: number;
  };

  SetCurrentTransition: void;

  SetTransitionDuration: void;

  GetTransitionDuration: {
    messageId: string;
    status: 'ok';
    'transition-duration': number;
  };

  GetTransitionPosition: {
    messageId: string;
    status: 'ok';
    position: number;
  };

  GetTransitionSettings: {
    messageId: string;
    status: 'ok';
    transitionSettings: {};
  };

  SetTransitionSettings: {
    messageId: string;
    status: 'ok';
    transitionSettings: {};
  };

  ReleaseTBar: void;

  SetTBarPosition: void;

  GetVirtualCamStatus: {
    messageId: string;
    status: 'ok';
    isVirtualCam: boolean;
    virtualCamTimecode?: string;
  };

  StartStopVirtualCam: void;

  StartVirtualCam: void;

  StopVirtualCam: void;
}

interface EventHandlersDataMap {
  ConnectionOpened: void;
  ConnectionClosed: void;
  AuthenticationSuccess: void;
  AuthenticationFailure: void;
  error: {
    error: any;
    message: string;
    type: string;
    // This would require importing all of the WebSocket types so leaving out for now.
    // target: WebSocket;
  };
  SwitchScenes: { 'scene-name': string; sources: SceneItem[] };

  ScenesChanged: { scenes: Scene[] };

  SceneCollectionChanged: { sceneCollection: string };

  SceneCollectionListChanged: { sceneCollections: { name: string }[] };

  SwitchTransition: { 'transition-name': string };

  TransitionListChanged: { transitions: { name: string }[] };

  TransitionDurationChanged: { 'new-duration': number };

  TransitionBegin: {
    name: string;
    type: string;
    duration: number;
    'from-scene'?: string;
    'to-scene': string;
  };

  TransitionEnd: {
    name: string;
    type: string;
    duration: number;
    'to-scene': string;
  };

  TransitionVideoEnd: {
    name: string;
    type: string;
    duration: number;
    'from-scene'?: string;
    'to-scene': string;
  };

  ProfileChanged: { profile: string };

  ProfileListChanged: { profiles: { name: string }[] };

  StreamStarting: { 'preview-only': boolean };

  StreamStarted: void;

  StreamStopping: { 'preview-only': boolean };

  StreamStopped: void;

  StreamStatus: {
    streaming: boolean;
    recording: boolean;
    'replay-buffer-active': boolean;
    'bytes-per-sec': number;
    'kbits-per-sec': number;
    strain: number;
    'total-stream-time': number;
    'num-total-frames': number;
    'num-dropped-frames': number;
    fps: number;
    'render-total-frames': number;
    'render-missed-frames': number;
    'output-total-frames': number;
    'output-skipped-frames': number;
    'average-frame-time': number;
    'cpu-usage': number;
    'memory-usage': number;
    'free-disk-space': number;
    'preview-only': boolean;
  };

  RecordingStarting: void;

  RecordingStarted: { recordingFilename: string };

  RecordingStopping: { recordingFilename: string };

  RecordingStopped: { recordingFilename: string };

  RecordingPaused: void;

  RecordingResumed: void;

  VirtualCamStarted: void;

  VirtualCamStopped: void;

  ReplayStarting: void;

  ReplayStarted: void;

  ReplayStopping: void;

  ReplayStopped: void;

  Exiting: void;

  Heartbeat: {
    pulse: boolean;
    'current-profile'?: string;
    'current-scene'?: string;
    streaming?: boolean;
    'total-stream-time'?: number;
    'total-stream-bytes'?: number;
    'total-stream-frames'?: number;
    recording?: boolean;
    'total-record-time'?: number;
    'total-record-bytes'?: number;
    'total-record-frames'?: number;
    stats: OBSStats;
  };

  BroadcastCustomMessage: { realm: string; data: {} };

  SourceCreated: {
    sourceName: string;
    sourceType: string;
    sourceKind: string;
    sourceSettings: {};
  };

  SourceDestroyed: {
    sourceName: string;
    sourceType: string;
    sourceKind: string;
  };

  SourceVolumeChanged: {
    sourceName: string;
    volume: number;
    volumeDb: number;
  };

  SourceMuteStateChanged: { sourceName: string; muted: boolean };

  SourceAudioDeactivated: { sourceName: string };

  SourceAudioActivated: { sourceName: string };

  SourceAudioSyncOffsetChanged: { sourceName: string; syncOffset: number };

  SourceAudioMixersChanged: {
    sourceName: string;
    mixers: { id: number; enabled: boolean }[];
    hexMixersValue: string;
  };

  SourceRenamed: {
    previousName: string;
    newName: string;
    sourceType: string;
  };

  SourceFilterAdded: {
    sourceName: string;
    filterName: string;
    filterType: string;
    filterSettings: {};
  };

  SourceFilterRemoved: {
    sourceName: string;
    filterName: string;
    filterType: string;
  };

  SourceFilterVisibilityChanged: {
    sourceName: string;
    filterName: string;
    filterEnabled: boolean;
  };

  SourceFiltersReordered: {
    sourceName: string;
    filters: { name: string; type: string; enabled: boolean }[];
  };

  MediaPlaying: { sourceName: string; sourceKind: string };

  MediaPaused: { sourceName: string; sourceKind: string };

  MediaRestarted: { sourceName: string; sourceKind: string };

  MediaStopped: { sourceName: string; sourceKind: string };

  MediaNext: { sourceName: string; sourceKind: string };

  MediaPrevious: { sourceName: string; sourceKind: string };

  MediaStarted: { sourceName: string; sourceKind: string };

  MediaEnded: { sourceName: string; sourceKind: string };

  SourceOrderChanged: {
    'scene-name': string;
    'scene-items': { 'source-name': string; 'item-id': number }[];
  };

  SceneItemAdded: {
    'scene-name': string;
    'item-name': string;
    'item-id': number;
  };

  SceneItemRemoved: {
    'scene-name': string;
    'item-name': string;
    'item-id': number;
  };

  SceneItemVisibilityChanged: {
    'scene-name': string;
    'item-name': string;
    'item-id': number;
    'item-visible': boolean;
  };

  SceneItemLockChanged: {
    'scene-name': string;
    'item-name': string;
    'item-id': number;
    'item-locked': boolean;
  };

  SceneItemTransformChanged: {
    'scene-name': string;
    'item-name': string;
    'item-id': number;
    transform: SceneItemTransform;
  };

  SceneItemSelected: {
    'scene-name': string;
    'item-name': string;
    'item-id': number;
  };

  SceneItemDeselected: {
    'scene-name': string;
    'item-name': string;
    'item-id': number;
  };

  PreviewSceneChanged: {
    'scene-name': string;
    sources: SceneItem[];
  };

  StudioModeSwitched: { 'new-state': boolean };
}

export type ObsSendType = <K extends keyof RequestMethodsArgsMap>(
  requestType: K,
  args?: RequestMethodsArgsMap[K]
) => Promise<RequestMethodReturnMap[K]>;

type ObsEventGeneric<K extends keyof EventHandlersDataMap> = {
  'update-event': K;
} & EventHandlersDataMap[K];

export type ObsRequestEvent = {
  'message-id': string;
  status: 'ok' | 'error';
  error?: string;
};

export type ObsUpdateEvent =
  | ObsEventGeneric<'SwitchScenes'>
  | ObsEventGeneric<'ScenesChanged'>;
