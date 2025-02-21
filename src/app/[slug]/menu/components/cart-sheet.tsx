import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../contexts/cart";
import { CartProductItem } from "./cart-product-item";

export const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetTitle className="text-left">Sacola</SheetTitle>
        <div className="py-5">
          {products.map((product) => (
            <CartProductItem key={product.id} product={product} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
