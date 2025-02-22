import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart";
import { CartProductItem } from "./cart-product-item";
import { FinishOrderDialog } from "./finish-order-dialog";

export const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  const [finsishOrderDialogIsOpen, setFinsishOrderDialogIsOpen] =
    useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetTitle className="text-left">Sacola</SheetTitle>
        <div className="flex h-full flex-col py-5">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>

          <Card className="mb-6">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>

          <Button
            className="w-full rounded-full"
            onClick={() => setFinsishOrderDialogIsOpen(true)}
          >
            Finalizar pedido
          </Button>
          <FinishOrderDialog
            open={finsishOrderDialogIsOpen}
            onOpenChange={setFinsishOrderDialogIsOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
