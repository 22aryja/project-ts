import "./timekiller.scss";

export default function Timekiller() {
  const CRASH: number = Math.random() * Math.random() * 100;
  let sec: number = 0;
  const tick = () => {
    sec++;
  };
  setInterval(tick, 1000);
  console.log(CRASH);
  return (
    <div className="block">
      <div className="zone">
        <span>{sec}</span>
      </div>
    </div>
  );
}
