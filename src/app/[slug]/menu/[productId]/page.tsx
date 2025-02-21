import { getProductWithRestaurantById } from "@/data/get-product-by-id";
import { notFound } from "next/navigation";
import { ProductHeader } from "./components/header";
import { ProductDetails } from "./components/product-details";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductPage(props: ProductPageProps) {
  const { productId } = await props.params;

  const { product } = await getProductWithRestaurantById(productId);

  if (!product) {
    return notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </div>
  );
}
