import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { CartContext, type CartProduct } from "../contexts/cart";

interface CartProductItemProps {
  product: CartProduct;
}

export const CartProductItem = ({ product }: CartProductItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative size-20 rounded-xl bg-gray-200">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>

        <div className="space-y-1">
          <p className="max-w-[90%] truncate text-ellipsis text-xs">
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>

          <div className="flex items-center gap-1 text-center">
            <Button
              variant="outline"
              className="size-7 rounded-lg"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button
              variant="destructive"
              className="size-7 rounded-lg"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="size-7 rounded-lg"
        onClick={() => removeProduct(product.id)}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};
