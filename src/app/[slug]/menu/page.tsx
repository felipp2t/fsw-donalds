import { notFound } from "next/navigation";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

export default async function RestaurantPage(props: RestaurantPageProps) {
  const { slug } = await props.params;
  const { consumptionMethod } = await props.searchParams;

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  return (
    <div>
      <h1>sdasd</h1>
    </div>
  );
}
