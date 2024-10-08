import AllDeals from "./_components/AllDeals";

async function HomePage() {
  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold text-center mb-5">전체 판매글</h2>
      <AllDeals />
    </div>
  );
}

export default HomePage;
