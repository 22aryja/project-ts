import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import format from "date-fns/format";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Dates } from "../../pages/RootPage";
import "./datepicker.scss";

// type RangeType = {
//   startDate: Date;
//   endDate: Date;
//   key: string;
// };

type DatepickerProps = {
  dates: Dates;
  setDates: Dispatch<SetStateAction<Dates>>;
};

export default function Datepicker({ dates, setDates }: DatepickerProps) {
  const [range, setRange] = useState<any[]>([
    {
      startDate: dates.left,
      endDate: dates.right,
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState<boolean>(false);

  const refOne = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);

    // Синхронизировать состояние range с dates при изменении dates
    setRange([
      {
        startDate: dates.left,
        endDate: dates.right,
        key: "selection",
      },
    ]);
  }, [dates]);

  // hide dropdown on ESC press
  const hideOnEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // hide on outside click
  const hideOnClickOutside = (e: Event) => {
    if (refOne.current && !refOne.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  const handleSelect = (ranges: any) => {
    console.log(ranges);
    const { startDate, endDate } = ranges.selection;
    setRange([ranges.selection]);
    setDates({ left: startDate, right: endDate });
  };

  return (
    <div className="calendarWrap">
      <input
        value={`${format(range[0].startDate, "yyyy/MM/dd")} to ${format(
          range[0].endDate,
          "yyyy/MM/dd"
        )}`}
        onClick={() => setOpen(!open)}
      ></input>

      <div className="date-picker-wrapper" ref={refOne}>
        {open && (
          <div className="date-picker-dropdown">
            <DateRangePicker
              onChange={handleSelect}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={3}
              direction="vertical"
              className="calendarElement"
            />
          </div>
        )}
      </div>
    </div>
  );
}
