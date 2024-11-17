import React from "react";
import { Barcharts } from "../bar";
import { Bar1 } from "../bar1";
import { Bar2 } from "../bar2";

function page() {
  return (
    <div>
      <h1 className="text-xl text-center m-5 font-bold">Dashboard</h1>
      <div>
        
      </div>
      <div className="w-80 mx-auto ">
        <Bar2 />
      </div>
    </div>
  );
}

export default page;
