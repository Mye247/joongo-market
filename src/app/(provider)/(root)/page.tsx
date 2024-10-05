import dealsAPI from "@/api/client";
import Link from "next/link";

async function HomePage() {
  const deals = await dealsAPI.getDeals();
  console.log(deals);

  if (!deals) return alert("정보가 없습니다.");

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold text-center mb-5">전체 판매글</h2>
      <ul className="grid grid-cols-3 gap-4">
        {deals?.map((deal) => (
          <li key={deal.id} className="border border-gray-300 rounded-md p-2">
            <Link href={`/deals/${deal.id}`}>
              <img src="" alt="" />
            </Link>
            <h3 className="text-lg font-semibold mb-2">{deal.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{deal.price.toLocaleString()}원</p>
            <p className="text-sm text-gray-500 mb-2">{deal.location}</p>
            <p className="text-sm text-gray-500 mb-2">관심 22</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
