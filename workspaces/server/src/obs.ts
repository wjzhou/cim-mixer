import OBSWebSocket from "obs-websocket-js";
import EventEmitter from "events";
import { logger } from "./logger";

export class Obs {
  obs = new OBSWebSocket();
  connnected = false;
  connecting = false;
  connectEvent = new EventEmitter();
  currentScene = "";
  scenes: string[] = [];

  /**
   *
   */
  constructor(public address: string, public name: string) {
    this.obs.on("ConnectionOpened", () => {
      logger.debug("obs ConnectionOpened", address);
    });
    this.obs.on("ConnectionClosed", () => {
      logger.debug("obs ConnectionClosed", address);
    });
    this.obs.on("AuthenticationSuccess", () => {
      logger.debug("obs AuthenticationSuccess", address);
      this.refreshScenes().catch((error) => {
        logger.warn("refreshScenes Error", error);
      });
    });
    this.obs.on("AuthenticationFailure", () => {
      logger.error("obs AuthenticationFailure", address);
    });
    this.obs.on("SwitchScenes", (data) => {
      this.currentScene = data["scene-name"];
    });
    this.obs.on("ScenesChanged", (data) => {
      this.scenes = data.scenes.map((a) => a.name);
    });
  }
  async connect(): Promise<void> {
    this.connecting = true;
    try {
      await this.obs.connect({ address: this.address, password: "worship" });
      this.connnected = true;
      this.connecting = false;
      this.connectEvent.emit("sucessful");
    } catch (error) {
      this.connnected = false;
      this.connecting = false;
      this.connectEvent.emit("error", error);
    }
  }

  async getScenes() {
    await this.refreshScenes();
    return {
      currentScene: this.currentScene,
      scenes: this.scenes,
    };
  }

  async refreshScenes() {
    await this.checkConnection();
    const scenes = await this.obs.send("GetSceneList");
    this.currentScene = scenes["current-scene"];
    this.scenes = scenes.scenes.map((a) => a.name);
  }

  async setScrene(scene: string) {
    await this.checkConnection();
    this.obs.send("SetCurrentScene", { "scene-name": scene });
  }

  async getScreenshot(scene: string, width: number) {
    await this.checkConnection();
    const result = await this.obs.send("TakeSourceScreenshot", {
      sourceName: scene,
      width,
      embedPictureFormat: "png",
    });
    return result.img;
  }

  async openProjector(monitor: number) {
    await this.checkConnection();
    await this.obs.send("OpenProjector", { type: "Preview", monitor: monitor });
  }

  async checkConnection() {
    if (!this.connnected) {
      if (!this.connecting) {
        await this.connect();
      } else {
        await new Promise((resolve, reject) => {
          let resolved = false;
          this.connectEvent.once("sucessful", () => {
            if (!resolved) {
              resolved = true;
              resolve(undefined);
            }
          });
          this.connectEvent.once("error", (error) => {
            if (!resolved) {
              resolved = true;
              reject(error);
            }
          });
        });
      }
    }
  }
}

export const obss = [
  new Obs("localhost:4444", "main-projector"),
  new Obs("localhost:4445", "zoom"),
  new Obs("localhost:4446", "tv"),
  new Obs("localhost:4447", "streaming"),
];
