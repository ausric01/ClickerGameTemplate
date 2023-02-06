import { Session } from "next-auth";
import { FC, useEffect, useState } from "react";
import { autoClickers, increments } from "../../models/upgrades";
import IncrementShopItem from "../shop/IncrementShopItem";
import { api } from "../../utils/api";
import { Config } from "@prisma/client";
import { useAutoSave } from "../../hooks/custom-hooks";
import AutoClickerShopItem from "../shop/AutoClickerShopitem";

const Shop: FC<{
  config: Config;
  setConfig: (config: Config) => void;
}> = ({ config, setConfig }) => {
  const [state, toggle] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [section, setSection] = useState<"increment" | "autoclicker">(
    "increment"
  );

  useEffect(() => {
    setError("");
  }, [state]);

  const upgrade = api.config.update.useMutation();

  const purchaseIncrementUpgrade = (increment: number) => {
    const upgradeItem = increments.find((i) => i.increment === increment);
    if (upgradeItem === undefined) return;
    if (config.balance < upgradeItem.price) {
      setError("Not enough money to purchase this upgrade.");
    } else {
      setConfig({
        ...config,
        increment: upgradeItem.increment,
        balance: config.balance - upgradeItem.price,
      });
      upgrade.mutate({
        config: {
          ...config,
        },
      });
    }
  };

  const purchaseAutoClickerUpgrade = (autoclicker: number) => {
    const upgradeItem = autoClickers.find((i) => i.autoclicker === autoclicker);
    if (upgradeItem === undefined) return;
    if (config.balance < upgradeItem.price) {
      setError("Not enough money to purchase this upgrade.");
    } else {
      setConfig({
        ...config,
        autoclickers: upgradeItem.autoclicker,
        balance: config.balance - upgradeItem.price,
      });
      upgrade.mutate({
        config: {
          ...config,
        },
      });
    }
  };

  if (state) {
    return (
      <div className="fixed top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-slate-800/75 text-white">
        <div className="flex w-1/4 flex-col items-center gap-2">
          <div className="mb-2 flex flex-row items-center justify-center gap-2">
            <button
              className="rounded bg-zinc-200/75 p-2 px-4 text-slate-800 transition-colors hover:bg-zinc-200"
              onClick={() => setSection("increment")}
            >
              Increment
            </button>
            <button
              className="rounded bg-zinc-200/75 p-2 px-4 text-slate-800 transition-colors hover:bg-zinc-200"
              onClick={() => setSection("autoclicker")}
            >
              Auto-Clickers
            </button>
          </div>
          {section === "increment" &&
            increments.map((i) => {
              return (
                <IncrementShopItem
                  key={i.increment}
                  increment={i.increment}
                  price={i.price}
                  purchase={purchaseIncrementUpgrade}
                  config={config}
                />
              );
            })}
          {section === "autoclicker" &&
            autoClickers.map((i) => {
              return (
                <AutoClickerShopItem
                  key={i.autoclicker}
                  autoclicker={i.autoclicker}
                  price={i.price}
                  purchase={purchaseAutoClickerUpgrade}
                  config={config}
                />
              );
            })}
        </div>
        <button
          className="absolute bottom-8 left-[calc(50%-4rem)] w-32 rounded-full bg-zinc-200/75 py-1 text-lg font-medium text-slate-800 transition-colors hover:bg-zinc-200"
          onClick={() => toggle(!state)}
        >
          Close Shop
        </button>
      </div>
    );
  } else {
    return (
      <button
        className="absolute bottom-8 left-[calc(50%-4rem)] w-32 rounded-full bg-zinc-200/75 py-1 text-lg font-medium text-slate-800 transition-colors hover:bg-zinc-200"
        onClick={() => toggle(!state)}
      >
        Open Shop
      </button>
    );
  }
};

export default Shop;
