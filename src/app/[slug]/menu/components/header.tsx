"use client";

import { Button } from "@/components/ui/button";
import type { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
}

export const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const handleBackClick = () => router.back();
  const handleOrdersClick = () => router.push(`${slug}/orders`);

  return (
    <div className="relative h-[250px] w-full">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50"
        onClick={handleOrdersClick}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};
