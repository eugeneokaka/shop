"use client";
import { set } from "date-fns";
import Image from "next/image";
import imgs from "./public/up.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
interface Product {
  name: string;
  category: string;
  bprice: number;
  price: number;
  amount: number;
  createdAt: Date;
  _id: string;
}
export default function Home() {
  const [data, setdata] = useState<Product[]>([]);
  const [q, setq] = useState("1");
  const [category, setcategory] = useState("");
  const [query, setquery] = useState("");
  const handleselect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const qu = e.target.value;
    setq(qu);
    // const res = await fetch(`http://localhost:5000/product/?q=${query}`, {
    //   cache: "no-store",
    // });
  };
  const handlecategory = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newcategory = e.target.value;
    console.log(newcategory);
    setcategory(newcategory);
    const res = await fetch(`http://localhost:5000/product?q=-1`, {
      cache: "no-store",
    });
    const getdata = await res.json();

    setdata(getdata);
  };
  const fetchdata = async () => {
    const res = await fetch(
      `http://localhost:5000/transaction?q=${q}&c=${category}&query=${query}`,
      {
        cache: "no-store",
      }
    );

    const getdata = await res.json();

    setdata(getdata);
    console.log(getdata);
  };

  useEffect(() => {
    fetchdata();
  }, [q, category, query]);
  return (
    <div className="h-full">
      <div className="flex justify-between">
        <div className="w-36 m-5">
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={handleselect}
          >
            <option disabled selected>
              sort
            </option>
            <option value={-1}>latest</option>
            <option value={1}>oldest</option>
          </select>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full max-w-xs border border-gray-500 outline-gray-500"
            onChange={(e) => setquery(e.target.value.toLowerCase())}
          />
        </div>

        <div className="w-36 m-5">
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={handlecategory}
          >
            <option disabled selected>
              category
            </option>
            <option value={"food"}>food</option>
            <option value={"electronics"}>electronic</option>
            <option value={""}>all</option>
          </select>
        </div>
      </div>

      <h1 className="text-center text-2xl font-bold">Transactions</h1>

      <div className="w-3/4 mt-14 mb-96  mx-auto">
        <div>
          <div className="overflow-x-auto">
            <table className="table ">
              {/* head */}
              <thead>
                <tr className="">
                  <th>name</th>
                  <th>category</th>
                  {/* <th>bprice</th> */}
                  <th>price</th>
                  <th>amount</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {data.map((product) => (
                  <tr>
                    <th>{product.name}</th>
                    <td>{product.category}</td>
                    {/* <td>{product.bprice}</td> */}
                    <td>{product.price}</td>
                    <td>{product.amount}</td>
                    <td>{new Date(product.createdAt).toDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
