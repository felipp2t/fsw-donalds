import { getProductById } from "@/data/get-product-by-id";
import { notFound } from "next/navigation";
import { ProductHeader } from "./components/header";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export default async function ProductPage(props: ProductPageProps) {
  const { slug, productId } = await props.params;

  const { product } = await getProductById(productId);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <ProductHeader product={product} />
    </>
  );
}
