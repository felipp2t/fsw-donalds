"use client";

import { Button } from "@/components/ui/button";
import type { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductHeaderProps {
  product: Pick<Product, "imageUrl" | "name">;
}

export const ProductHeader = ({ product }: ProductHeaderProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative min-h-[250px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};
