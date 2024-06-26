import { useState } from "react";
import "./timekiller.scss";

export default function Timekiller() {
  const CRASH: number = Math.random() * Math.random() * 100;
  console.log(CRASH);

  const [sec, setSec] = useState<number>(0);

  if (sec <= CRASH) {
    setSec(setInterval(() => sec + 1, 1000));
  }

  return (
    <div className="block">
      <div className="zone">
        <span>{CRASH}</span>
        <span>{sec}</span>
      </div>
    </div>
  );
}
