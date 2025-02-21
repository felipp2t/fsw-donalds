import { getRestaurantWithMenu } from "@/data/get-restaurant-with-menu";
import { notFound } from "next/navigation";
import { RestaurantCategories } from "./components/categories";
import { RestaurantHeader } from "./components/header";

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

  const { restaurant } = await getRestaurantWithMenu(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
}
