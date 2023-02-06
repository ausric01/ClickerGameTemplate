import { useEffect, useRef, useState } from "react";
import { api } from "../utils/api";
import { Config } from "@prisma/client";

export function useAutoSave(
  config: Config,
  timer: number
): [Config, (config: Config) => void] {
  const [_config, _setConfig] = useState<Config>(config);
  const save = api.config.update.useMutation();

  //Whenever the user config changes, save it
  useInterval(() => {
    save.mutate({
      config: _config,
    });
  }, timer);

  return [_config, _setConfig];
}

/**
 * Hook-safe / React-safe setInterval
 * @param callback Function to run at interval
 * @param delay Interval frequency in ms
 */
export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      //@ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
