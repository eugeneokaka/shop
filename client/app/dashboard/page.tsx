"use client";
import React, { useState, useEffect } from "react";
import { Barcharts } from "../bar";
import { Bar1 } from "../bar1";
import { Bar2 } from "../bar2";
interface expensedata {
  total: number;
  sales: number;
  sold: number;
}
interface content {
  name: string;
  number_sold: number;
  profit: number;
}
interface stats {
  expense: expensedata;
  leastsolditem: content;
  lestprofit: content;
  maxprofit: content;
  mostsolditem: content;
}
interface Product {
  name: string;
  category: string;
  bprice: number;
  price: number;
  amount: number;
  createdAt: Date;
  profit: number;
  _id: string;
}
function page() {
  const [data, setdata] = useState<stats>();
  const fetchdata = async () => {
    const res = await fetch(`http://localhost:5000/expense`, {
      cache: "no-cache",
    });

    const getdata: stats = await res.json();

    setdata(getdata);
    console.log(getdata);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  console.log(data?.mostsolditem.name);
  return (
    <div>
      <h1 className="text-xl text-center m-5 font-bold">Dashboard</h1>
      <div
        className="w-2/3 p-5 mx-auto rounded-md mb-5
       bg-slate-300 flex justify-around"
      >
        <div>
          <h1>Total:{data?.expense.total}</h1>
          <h1>sold:{data?.expense.sold}</h1>
        </div>
        <div>
          <h1>sales:{data?.expense.sales}</h1>
        </div>
      </div>
      <div className="w-80 mx-auto ">
        <Bar2 />
      </div>
      <h1 className="text-center text-lg">Sales stats</h1>
      <div className="w-2/3 mx-auto h-30 my-9 rounded-md bg-slate-300">
        <h1 className="text-center text-lg font-extrabold">most sold iteme</h1>
        <div>
          <h1>most sold item: {data?.mostsolditem.name}</h1>
          <h1>number of times sold: {data?.mostsolditem.number_sold}</h1>
        </div>
      </div>

      <div className="w-2/3 mx-auto h-30 my-9 rounded-md bg-slate-300">
        <h1 className="text-center text-lg font-extrabold">least sold iteme</h1>
        <div>
          <h1>least sold item: {data?.leastsolditem.name}</h1>
          <h1>number of times sold: {data?.leastsolditem.number_sold}</h1>
        </div>
      </div>
      <div className="w-2/3 mx-auto h-30 my-9 rounded-md bg-slate-300">
        <h1 className="text-center text-lg font-extrabold">highest profit</h1>
        <div>
          <h1>highest profit: {data?.maxprofit.name}</h1>
          <h1>profit:ksh {data?.maxprofit.profit}</h1>
          <h1>number of times sold: {data?.maxprofit.number_sold}</h1>
        </div>
      </div>
      <div className="w-2/3 mx-auto h-30 my-9 rounded-md bg-slate-300">
        <h1 className="text-center text-lg font-extrabold">lowest profit</h1>
        <div>
          <h1>lowest profit: {data?.lestprofit.name}</h1>
          <h1>profit:ksh {data?.lestprofit.profit}</h1>
          <h1>number of times sold: {data?.lestprofit.number_sold}</h1>
        </div>
      </div>
    </div>
  );
}

export default page;
