import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ShoppingCartIcon,
  CheckCircle2Icon,
  ArrowRightIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EcommerceOnePageDemo() {
  const [addedToCart, setAddedToCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: product, 1: cart, 2: checkout success

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setCheckoutStep(1), 500); // Simulate adding to cart then go to cart view
  };

  const handleProceedToCheckout = () => {
    setCheckoutStep(2); // Simulate checkout success
  };

  const product = {
    name: "精選智慧手錶",
    price: 3999,
    description:
      "一款兼具時尚與功能的智慧手錶，支援心率監測、睡眠追蹤和多種運動模式。長效續航，伴您健康生活每一天。",
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMTg4NTcwMHw&ixlib=rb-4.0.3&q=80&w=400", // Placeholder image
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 min-h-[calc(100vh-100px)] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {checkoutStep === 0 && (
          <motion.div
            key="product"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-extrabold">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-lg">
                  體驗智慧生活，從此開始
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-md shadow-md mx-auto"
                />
                <p className="text-2xl font-semibold text-center text-primary-foreground">
                  NT$ {product.price}
                </p>
                <p className="text-muted-foreground text-center">
                  {product.description}
                </p>
                <Button
                  className="w-full py-6 text-xl"
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    "已加入購物車"
                  ) : (
                    <>
                      <ShoppingCartIcon className="mr-2 h-6 w-6" /> 加入購物車
                    </>
                  )}
                </Button>
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-gray-500">
                <span>免運費 • 30 天無條件退貨</span>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {checkoutStep === 1 && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">您的購物車</CardTitle>
                <CardDescription>確認商品並進行結帳</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="font-medium">{product.name}</span>
                  <span>NT$ {product.price}</span>
                </div>
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>總計</span>
                  <span>NT$ {product.price}</span>
                </div>
                <Button
                  className="w-full py-4"
                  onClick={handleProceedToCheckout}
                >
                  前往結帳 <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {checkoutStep === 2 && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md text-center"
          >
            <CheckCircle2Icon className="h-24 w-24 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-green-600 mb-4">
              訂單成功！
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              感謝您的購買！您的訂單已處理。
            </p>
            <Button
              onClick={() => {
                setAddedToCart(false);
                setCheckoutStep(0);
              }}
            >
              繼續購物
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
