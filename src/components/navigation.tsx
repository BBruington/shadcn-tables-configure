import { NAVIGATION } from "@/app/constants";
import { Charts } from "@/app/types";
import { Dispatch, SetStateAction } from "react";

type NavigationProps = {
  setChart: Dispatch<SetStateAction<Charts>>;
};

export default function Navigation({setChart}: NavigationProps) {
  return (
    <div className="flex justify-between p-5">
      {NAVIGATION.map((navItem, index) => (
        <div onClick={() => setChart(navItem.enum as Charts)} key={index}>
          {navItem.label}
        </div>
      ))}
    </div>
  );
}
