import { Config } from "@prisma/client";
import { type FC } from "react";
import autoAnimate from "@formkit/auto-animate";

const AutoClickerShopItem: FC<{
  autoclicker: number;
  price: number;
  description?: string;
  config: Config;
  purchase: (autoclicker: number) => void;
}> = ({ autoclicker, price, description, config, purchase }) => {
  if (config.autoclickers >= autoclicker) {
    return (
      <div className="flex w-[500px] select-none flex-row items-center justify-between rounded bg-zinc-200/25 p-4 px-8 text-zinc-200">
        <h1>{`Autoclicker #${autoclicker}: $${price}`}</h1>
        <div className="hover:bg- rounded-full border-2 border-zinc-200/25 bg-purple-800/25 px-8 py-1 transition-colors">
          Purchased
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-[500px] select-none flex-row items-center justify-between rounded bg-zinc-200/25 p-4 px-8 text-zinc-200">
        <h1>{`Autoclicker #${autoclicker}: $${price}`}</h1>
        <button
          className="hover:bg- rounded-full border-2 border-zinc-200/25 bg-purple-800 px-8 py-1 transition-colors"
          onClick={() => purchase(autoclicker)}
        >
          Purchase
        </button>
      </div>
    );
  }
};

export default AutoClickerShopItem;
