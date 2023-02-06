import { Session } from "next-auth";
import { FC, useCallback, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Config } from "@prisma/client";
import { NumericFormat } from "react-number-format";
import Image from "next/image";
import { useAutoSave, useInterval } from "../../hooks/custom-hooks";
import Shop from "./Shop";

const Clicker: FC<{
  session: Session;
}> = ({ session }) => {
  //Run an autosave every minute
  const [config, setConfig] = useAutoSave(session.user.config, 1000 * 60);
  const [animate, toggle] = useState<boolean>(false);

  //Clicker function
  const onClick = () => {
    setConfig({
      ...config,
      balance: config.balance + config.increment,
    });
  };

  //Autoclicker interval
  useInterval(() => {
    if (config.autoclickers > 0) {
      setConfig({
        ...config,
        balance: config.balance + (config.autoclickers * config.increment) / 4,
      });
    }
  }, 1000 / config.autoclickers / 4);

  return (
    <div className="flex flex-col items-center">
      <Image
        src={"/assets/monster.png"}
        alt={"monster"}
        width={250}
        height={250}
        onClick={() => {
          !animate && toggle(!animate);
          onClick();
        }}
        onAnimationEnd={() => toggle(!animate)}
        className={`cursor-pointer select-none ${
          animate && "animate-enlarge1"
        }`}
      ></Image>
      <h1 className="absolute bottom-24 mt-4 select-none rounded bg-zinc-200/75 px-4 text-center text-xl font-medium text-slate-800">
        {
          <NumericFormat
            value={config.balance.toFixed(0)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        }
      </h1>
      <Shop config={config} setConfig={setConfig} />
    </div>
  );
};

export default Clicker;
