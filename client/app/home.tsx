"use client";
import { set } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Home() {
  const [data, setdata] = useState([]);
  const fetchdata = async () => {
    const res = await fetch("http://localhost:5000/product", {
      cache: "no-store",
    });
    const getdata = await res.json();
    setdata(getdata);
    console.log(getdata);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="h-full">
      <div className="w-3/4 mt-20 mb-96  mx-auto">
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>
                    <button className="btn btn-primary">sell</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

<table className="table">
  {/* head */}
  <thead>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Job</th>
      <th>Favorite Color</th>
    </tr>
  </thead>
  <tbody>
    {/* row 1 */}
    <tr>
      <th>1</th>
      <td>Cy Ganderton</td>
      <td>Quality Control Specialist</td>
      <td>Blue</td>
    </tr>
    {/* row 2 */}
  </tbody>
</table>;
