"use client";

import getAPI from "@/api/getAPI";
import { BaseUrl } from "@/types/type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tables } from "../../../../../database.types";

function AllDeals() {
  const [deals, setDeals] = useState<Tables<"deals">[]>([]);

  useEffect(() => {
    (async () => {
      const deals = await getAPI.getDeals();
      if (!deals) return;
      setDeals(deals);
    })();
  }, []);

  if (!deals) return <div>정보가 없습니다!</div>;
  return (
    <ul className="grid grid-cols-3 gap-4">
      {deals?.map((deal) => (
        <li key={deal.id} className="border border-gray-300 rounded-md p-2">
          <Link href={`/deals/${deal.id}`}>
            <img
              src={BaseUrl + deal.imageUrl}
              alt=""
              className="w-[300px] h-[300px] ml-12 mb-3 rounded-lg"
            />

            <h3 className="text-lg font-semibold mb-2">{deal.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {deal.price.toLocaleString()}원
            </p>
            <p className="text-sm text-gray-500 mb-2">{deal.location}</p>
            <p className="text-sm text-gray-500 mb-2">관심 22</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default AllDeals;
