import getAPI from "@/api/getAPI";
import { BaseUrl, Deals } from "@/types/type";
import Button from "./_components/Button";

async function DealsDetailPage(props: { params: { dealsId: number } }) {
  const dealId = props.params.dealsId;
  console.log(dealId);

  const deal = (await getAPI.getDeal(dealId)) as Deals;
  console.log(deal);

  if (!deal) return alert("정보가 없습니다...");

  return (
    <main className="p-5">
      <ul className="flex justify-center border border-gray-300 rounded-md p-5 w-[500px] h-screen mx-auto">
        <li key={deal.id}>
          <img
            src={BaseUrl + deal.imageUrl}
            alt=""
            className="w-[300px] h-[300px] mb-5"
          />
          <h3 className="text-xl font-semibold mb-2">{deal.title}</h3>
          <p className="mb-2">{deal.content}</p>
          <p className="mb-2">{deal.price}</p>
          <p className="mb-20">{deal.location}</p>

          <div className="flex justify-end gap-2">
            <Button dealId={dealId} />
          </div>
        </li>
      </ul>
    </main>
  );
}

export default DealsDetailPage;
