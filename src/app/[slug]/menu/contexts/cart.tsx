"use client";

import type { Product } from "@prisma/client";
import { type ReactNode, createContext, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

interface ICartContextStates {
  isOpen: boolean;
  products: CartProduct[];
  total: number;
}

interface ICartContextActions {
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
}

type ICartContext = ICartContextStates & ICartContextActions;

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
  total: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  const total = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  const addProduct = (product: CartProduct) => {
    const productIsAlreadyOnTheCart = products.some(
      (prev) => prev.id === product.id,
    );

    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }

    setProducts((prev) => {
      return prev.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id !== productId) return product;
        if (product.quantity === 1) return product;

        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }),
    );
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id !== productId) return product;

        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }),
    );
  };

  const removeProduct = (productId: string) =>
    setProducts((prev) => prev.filter((product) => product.id !== productId));

  return (
    <CartContext.Provider
      value={{
        total,
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
