import { Config } from "@prisma/client";
import { type FC } from "react";
import autoAnimate from "@formkit/auto-animate";

const IncrementShopItem: FC<{
  increment: number;
  price: number;
  description?: string;
  config: Config;
  purchase: (increment: number) => void;
}> = ({ increment, price, description, purchase, config }) => {
  if (config.increment >= increment) {
    return (
      <div className="flex w-[500px] select-none flex-row items-center justify-between rounded bg-zinc-200/25 p-4 px-8 text-zinc-200">
        <h1>{`Increment by ${increment}: $${price}`}</h1>
        <div className="hover:bg- rounded-full border-2 border-zinc-200/25 bg-green-800/25 px-8 py-1 transition-colors">
          Purchased
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-[500px] select-none flex-row items-center justify-between rounded bg-zinc-200/25 p-4 px-8 text-zinc-200">
        <h1>{`Increment by ${increment}: $${price}`}</h1>
        <button
          className="hover:bg- rounded-full border-2 border-zinc-200/25 bg-green-800 px-8 py-1 transition-colors"
          onClick={() => purchase(increment)}
        >
          Purchase
        </button>
      </div>
    );
  }
};

export default IncrementShopItem;
