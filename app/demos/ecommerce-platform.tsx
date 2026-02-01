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
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import {
  StarIcon,
  SearchIcon,
  FilterIcon,
  ShoppingCartIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

// Hardcoded data for demonstration purposes
const allProducts = [
  {
    id: "p1",
    name: "輕薄型筆記型電腦",
    category: "電子產品",
    price: 32000,
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1616071477546-2432a5146c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMTg4NTcwMHw&ixlib=rb-4.0.3&q=80&w=400",
    description: "高性能處理器，輕薄設計，非常適合商務和學習。",
    reviews: 120,
  },
  {
    id: "p2",
    name: "高音質藍牙耳機",
    category: "電子產品",
    price: 4500,
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMTg4NTcwMHw&ixlib=rb-4.0.3&q=80&w=400",
    description: "沉浸式音效體驗，長時間佩戴舒適。",
    reviews: 85,
  },
  {
    id: "p3",
    name: "時尚簡約後背包",
    category: "服飾配件",
    price: 1800,
    rating: 4.2,
    imageUrl:
      "https://images.unsplash.com/photo-1549298816-d8726e0e6439?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMTg4NTcwMHw&ixlib=rb-4.0.3&q=80&w=400",
    description: "多功能收納，適合日常通勤或旅行。",
    reviews: 50,
  },
  {
    id: "p4",
    name: "智能運動手環",
    category: "電子產品",
    price: 2500,
    rating: 4.0,
    imageUrl:
      "https://images.unsplash.com/photo-1579586392095-2ca73602f90a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMTg4NTcwMHw&ixlib=rb-4.0.3&q=80&w=400",
    description: "實時監測健康數據，助您保持活力。",
    reviews: 30,
  },
  {
    id: "p5",
    name: "多功能料理鍋",
    category: "家居生活",
    price: 2800,
    rating: 4.7,
    imageUrl:
      "https://images.unsplash.com/photo-1582299066699-2d128d5d4d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMTg4NTcwMHw&ixlib=rb-4.0.3&q=80&w=400",
    description: "一鍋多用，輕鬆烹飪美味佳餚。",
    reviews: 65,
  },
];

const categories = ["所有", "電子產品", "服飾配件", "家居生活"];

export default function EcommercePlatformDemo() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("所有");

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "所有" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedProduct) {
    return (
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <Button
          variant="outline"
          onClick={() => setSelectedProduct(null)}
          className="mb-6"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> 返回商品列表
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{selectedProduct.name}</CardTitle>
            <CardDescription className="text-lg">
              NT$ {selectedProduct.price}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="w-full h-96 object-cover rounded-md mb-6"
            />
            <p className="text-muted-foreground mb-4">
              {selectedProduct.description}
            </p>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500 mr-2">
                {[...Array(Math.floor(selectedProduct.rating))].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-current" />
                ))}
                {selectedProduct.rating % 1 !== 0 && (
                  <StarIcon className="h-5 w-5 fill-current opacity-50" />
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                ({selectedProduct.reviews} 評論)
              </span>
            </div>
            <Button className="w-full text-lg">
              <ShoppingCartIcon className="mr-2 h-5 w-5" /> 加入購物車
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">購物平台 Demo</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="搜尋商品..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <FilterIcon className="mr-2 h-4 w-4" />
            <SelectValue placeholder="分類" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader className="p-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <CardTitle className="text-xl font-semibold line-clamp-2">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-1 mb-2 line-clamp-2">
                  {product.description}
                </CardDescription>
                <div className="flex items-center text-yellow-500 mb-2">
                  {[...Array(Math.floor(product.rating))].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-1 text-sm text-muted-foreground">
                    ({product.rating})
                  </span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  NT$ {product.price}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full"
                  onClick={() => setSelectedProduct(product)}
                >
                  查看詳情
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground text-lg">
            沒有找到符合條件的商品。
          </p>
        )}
      </div>
    </div>
  );
}
