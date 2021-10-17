import React, { useState, useEffect, useRef } from "react";

export function useInterval(callback: () => Promise<unknown>, delay: number) {
  useEffect(() => {
    function tick() {
      callback().finally(() => {
        if (delay) {
          setTimeout(tick, delay);
        }
      });
    }
    tick();
  }, [delay]);
}
