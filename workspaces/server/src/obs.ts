import WebSocket from 'ws';
import EventEmitter from 'events';
import { logger } from './logger';
import { ObsRequestEvent, ObsSendType, ObsUpdateEvent } from './obs-types';

export class Obs {
  ws: WebSocket | null = null;
  connecting = false;
  currentScene = '';
  scenes: string[] = [];

  constructor(public address: string, public name: string) {}

  handleUpdateEvent(event: ObsUpdateEvent) {
    switch (event['update-event']) {
      case 'ScenesChanged':
        this.scenes = event.scenes.map((a) => a.name);
        break;
      case 'SwitchScenes':
        this.currentScene = event['scene-name'];
        break;
    }
  }
  async connect(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      if (this.connecting) {
        this.ws?.once('open', resolve);
        this.ws?.once('close', reject);
      }
      this.connecting = true;
      const ws = new WebSocket(this.address, {
        perMessageDeflate: false,
      });
      ws.once('open', () => {
        this.connecting = false;
        resolve(ws);
      });
      ws.once('error', (error) => {
        logger.warn('websocket error %s', error);
        this.connecting = false;
        reject(error);
      });
      ws.once('close', (code, reason) => {
        logger.warn('websocket closed %d, %s', code, reason);
      });
      ws.onmessage = (event) => {
        const response = JSON.parse(event.data.toString()) as
          | ObsRequestEvent
          | ObsUpdateEvent;
        if ('message-id' in response) {
          const key = Number(response['message-id']);
          const callback = this.listeners.get(key);
          if (callback) {
            callback(response);
          }
          this.listeners.delete(key);
        } else if ('update-type' in response) {
          this.handleUpdateEvent(response);
        } else {
          logger.info('Unknown event:', response);
        }
      };
    });
  }

  async getScenes() {
    await this.refreshScenes();
    return {
      currentScene: this.currentScene,
      scenes: this.scenes,
    };
  }

  async refreshScenes() {
    const scenes = await this.send('GetSceneList');
    this.currentScene = scenes['current-scene'];
    this.scenes = scenes.scenes.map((a) => a.name);
  }

  async setScrene(scene: string) {
    const scenes = await this.send('GetSceneList');
    let targetScene = 'Projector';
    for ( let s of scenes.scenes){
      if (s.name === scene){
        targetScene = scene
        break;
      }
    }
    this.send('SetCurrentScene', { 'scene-name': targetScene });
  }

  async getScreenshot(scene: string, width: number) {
    const result = await this.send('TakeSourceScreenshot', {
      width,
      embedPictureFormat: 'png',
    });
    return result.img;
  }

  async openProjector(monitor: number) {
    await this.send('OpenProjector', { type: 'Preview', monitor: monitor });
  }

  async getConnection(): Promise<WebSocket> {
    if (this.ws && this.ws.readyState == WebSocket.OPEN) {
      return this.ws;
    }
    return await this.connect();
  }

  listeners = new Map<number, (event: ObsRequestEvent) => void>();
  msgId = 1;
  send: ObsSendType = async (requestType, args) => {
    const ws = await this.getConnection();
    return new Promise((resolve, reject) => {
      const msgId = this.msgId++;
      const data = {
        'request-type': requestType,
        'message-id': msgId.toString(),
        ...args,
      };
      const jsonData = JSON.stringify(data);
      console.debug('Obs Websocket send: %O', data);
      ws.send(jsonData);
      this.listeners.set(msgId, (event) => {
        if (event.status === 'error') {
          reject(event.error);
        } else {
          // this is returned from the server
          resolve(event as any);
        }
      });
    });
  };
}

export const obss = [
  new Obs('ws://localhost:4444', 'main-projector'),
  new Obs('ws://localhost:4445', 'zoom'),
  new Obs('ws://localhost:4446', 'podium-tv'),
  new Obs('ws://localhost:4447', 'streaming'),
];
