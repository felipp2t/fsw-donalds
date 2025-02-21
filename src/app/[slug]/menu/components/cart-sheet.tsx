import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../contexts/cart";

export const CartSheet = () => {
  const { isOpen, toggleCart, products } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetTitle>Cart</SheetTitle>
        {products.map((product) => (
          <h1 key={product.id}>
            {product.name} - {product.quantity}
          </h1>
        ))}
      </SheetContent>
    </Sheet>
  );
};
