import getAPI from "@/api/getAPI";
import { baseUrl } from "@/types/type";
import Link from "next/link";

async function HomePage() {
  const deals = await getAPI.getDeals();
  console.log(deals);

  if (!deals) return <div>정보가 없습니다!</div>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold text-center mb-5">전체 판매글</h2>
      <ul className="grid grid-cols-3 gap-4">
        {deals?.map((deal) => (
          <li key={deal.id} className="border border-gray-300 rounded-md p-2">
            <Link href={`/deals/${deal.id}`}>
              <img
                src={baseUrl + deal.imageUrl}
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
    </div>
  );
}

export default HomePage;
