import dealsAPI from "@/api/client";
import { deals } from "@/types/type";
import Link from "next/link";

async function HomePage() {
  const deals = (await dealsAPI.getDeals()) as deals[] | null;
  console.log(deals);

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold">전체 판매글</h2>
      <ul>
        {deals?.map((deal) => (
          <li key={deal.id}>
            <Link href={`/deals/${deal.id}`}>
              <img src="" alt="" />
            </Link>
            <h3>{deal.content}</h3>
            <p>{deal.price.toLocaleString()}원</p>
            <p>{deal.location}</p>
            <p>관심 22</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
