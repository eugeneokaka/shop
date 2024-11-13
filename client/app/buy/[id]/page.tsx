"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
interface Product {
  name: string;
  category: string;
  bprice: number;
  price: number;
  amount: number;
  createdAt: Date;
  _id: string;
}
function page({ params }: { params: { id: string } }) {
  const [data, setdata] = useState<Product>();
  const [amount, setamount] = useState<number>(0);
  const pathname = usePathname();
  console.log(pathname);
  console.log(params.id);
  const fetchdata = async () => {
    const res = await fetch(`http://localhost:5000/product/${params.id}`, {
      cache: "no-store",
    });

    const getdata = await res.json();

    setdata(getdata);
    console.log(getdata);
  };
  const hanlesubmit = async (e) => {
    e.preventDefault();
    console.log(amount);
    if (amount === 0) {
      alert("enter amount");
      return;
    }
    if (amount > data?.amount) {
      alert("not enought");
      return;
    }
    const response = await fetch("http://localhost:5000/transaction", {
      method: "POST",
      body: JSON.stringify({
        name: data?.name,
        category: data?.category,
        price: data?.price * amount,
        id: data?._id,
        amount: amount,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("👍");
    } else {
      alert("something went wrong");
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <h1 className="text-center mt-4 text-2xl font-bold">Buy</h1>
      <form
        onSubmit={hanlesubmit}
        action=""
        className=" w-3/5 mx-auto flex flex-col gap-4 mt-10"
      >
        <div className="text-lg font-bold">
          <label className="mr-4" htmlFor="">
            name:
          </label>
          <span>{data?.name}</span>
        </div>
        <div className="text-lg font-bold">
          only {data?.amount} {data?.name} left
        </div>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            onChange={(e) => setamount(e.target.value)}
            type="text"
            className="grow"
            placeholder="amount"
          />
        </label>
        <button type="submit" className="btn btn-info">
          buy
        </button>
      </form>
      <div className="w-3/5 mx-auto mt-8  flex justify-center">
        <Link href={"/"}>
          <button className="btn btn-accent">back</button>
        </Link>
      </div>
    </div>
  );
}

export default page;
