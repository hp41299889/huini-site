import React, { useState, useMemo } from "react";
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
import { Separator } from "~/components/ui/separator";
import {
  Star,
  Search,
  Filter,
  ShoppingCart,
  ArrowLeft,
  ChevronRight,
  Heart,
  Eye,
  ShoppingBag,
  LayoutGrid,
  List as ListIcon,
  Plus,
  Minus,
  X,
  CreditCard,
  CheckCircle2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";
import { AiAssistant } from "~/components/ai-assistant";
import { useTranslation } from "react-i18next";

// Types
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  imageUrl: string;
  description: string;
  reviews: number;
  isNew?: boolean;
  onSale?: boolean;
}

export default function EcommercePlatformDemo() {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);

  const allProducts: Product[] = [
    { id: "p1", name: "Huini Book Pro 14", category: t("ecommerce.platform.categories.electronics"), price: 32000, originalPrice: 38000, rating: 4.8, imageUrl: "/images/shop-laptop.jpg", description: t("ecommerce.platform.products.p1.desc"), reviews: 120, isNew: true },
    { id: "p2", name: "Studio Pro Wireless", category: t("ecommerce.platform.categories.electronics"), price: 4500, rating: 4.9, imageUrl: "/images/shop-headphones.jpg", description: t("ecommerce.platform.products.p2.desc"), reviews: 245, onSale: true },
    { id: "p3", name: "Urban Backpack", category: t("ecommerce.platform.categories.clothing"), price: 1800, rating: 4.5, imageUrl: "/images/shop-backpack.jpg", description: t("ecommerce.platform.products.p3.desc"), reviews: 56 },
    { id: "p4", name: "Active Watch", category: t("ecommerce.platform.categories.electronics"), price: 2500, originalPrice: 3200, rating: 4.2, imageUrl: "/images/shop-watch.jpg", description: t("ecommerce.platform.products.p4.desc"), reviews: 89, onSale: true },
    { id: "p5", name: "Ceramic Set", category: t("ecommerce.platform.categories.home"), price: 1200, rating: 4.7, imageUrl: "/images/shop-ceramic.jpg", description: t("ecommerce.platform.products.p5.desc"), reviews: 112 },
    { id: "p6", name: "Air Purifier", category: t("ecommerce.platform.categories.home"), price: 6800, rating: 4.6, imageUrl: "/images/shop-purifier.jpg", description: t("ecommerce.platform.products.p6.desc"), reviews: 34 },
  ];

  const categories = ["All", t("ecommerce.platform.categories.electronics"), t("ecommerce.platform.categories.clothing"), t("ecommerce.platform.categories.home")];

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory || (selectedCategory === "Electronics" && p.category === t("ecommerce.platform.categories.electronics")); // Fallback logic
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, t, allProducts]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);

  return (
    <div className="flex bg-background min-h-screen relative text-foreground">
      {/* Sidebar Filters */}
      <aside className="w-64 border-r p-6 space-y-8 hidden lg:block sticky top-0 h-screen overflow-y-auto bg-background">
        <div className="flex items-center gap-2 font-black text-2xl text-purple-600 mb-8">
          <ShoppingBag className="h-8 w-8" />
          <span>{t("demos_list.ecommerce_platform_title")}</span>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">{t("ecommerce.category_filter")}</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <div 
                key={cat} 
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm font-medium",
                  selectedCategory === cat ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600" : "hover:bg-muted"
                )}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === "All" ? t("common.all") : cat}
                {selectedCategory === cat && <ChevronRight className="h-4 w-4" />}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">{t("ecommerce.price_range")}</h3>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Min" type="number" className="h-8 text-xs bg-background" />
            <Input placeholder="Max" type="number" className="h-8 text-xs bg-background" />
          </div>
          <Button size="sm" variant="outline" className="w-full bg-background">{t("ecommerce.apply")}</Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">{t("ecommerce.hot_tags")}</h3>
          <div className="flex flex-wrap gap-2">
            {[
              t("ecommerce.platform.tags.discount"),
              t("ecommerce.platform.tags.new"),
              t("ecommerce.platform.tags.free_shipping"),
              t("ecommerce.platform.tags.fast_delivery")
            ].map(tag => (
              <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/40 bg-muted text-muted-foreground">{tag}</Badge>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-8 bg-background/50 backdrop-blur-md sticky top-0 z-20">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t("ecommerce.search_placeholder")} 
              className="pl-10 bg-muted/50 border-none rounded-full h-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 md:gap-4 ml-2">
            <Button variant="ghost" size="icon" className="relative text-foreground" onClick={() => setCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </span>
              )}
            </Button>
            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 hidden sm:block" />
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-8">
          <AnimatePresence mode="wait">
            {selectedProduct ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <Button variant="ghost" onClick={() => setSelectedProduct(null)} className="group text-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> {t("common.back")}
                </Button>
                
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <img src={selectedProduct.imageUrl} className="w-full aspect-square object-cover rounded-3xl shadow-xl" alt={selectedProduct.name} />
                    <div className="grid grid-cols-4 gap-4">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="aspect-square bg-muted rounded-xl border-2 border-transparent hover:border-purple-500 cursor-pointer overflow-hidden">
                          <img src={selectedProduct.imageUrl} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" alt="Thumb" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">{selectedProduct.category}</Badge>
                      <h1 className="text-4xl font-black">{selectedProduct.name}</h1>
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("h-4 w-4", i < Math.floor(selectedProduct.rating) ? "fill-current" : "")} />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">{selectedProduct.reviews} {t("ecommerce.platform.reviews")}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-baseline gap-4">
                      <span className="text-4xl font-black text-purple-600">NT$ {selectedProduct.price.toLocaleString()}</span>
                      {selectedProduct.originalPrice && (
                        <span className="text-xl text-muted-foreground line-through">NT$ {selectedProduct.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {selectedProduct.description}
                    </p>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-full h-12 bg-background">
                          <Button variant="ghost" size="icon" className="rounded-l-full text-foreground"><Minus className="h-4 w-4" /></Button>
                          <span className="w-12 text-center font-bold">1</span>
                          <Button variant="ghost" size="icon" className="rounded-r-full text-foreground"><Plus className="h-4 w-4" /></Button>
                        </div>
                        <Button className="h-12 flex-1 rounded-full bg-purple-600 hover:bg-purple-700 font-bold gap-2 text-white" onClick={() => addToCart(selectedProduct)}>
                          <ShoppingCart className="h-5 w-5" /> {t("ecommerce.add_to_cart")}
                        </Button>
                      </div>
                      <Button variant="outline" className="w-full h-12 rounded-full font-bold border-2 gap-2 bg-background text-foreground">
                        <Heart className="h-5 w-5" /> {t("ecommerce.platform.add_wishlist")}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black">{t("ecommerce.product_list")}</h2>
                  <div className="flex items-center gap-2 border rounded-lg p-1 bg-muted/50">
                    <Button variant="ghost" size="sm" className="h-8 bg-background shadow-sm text-foreground"><LayoutGrid className="h-4 w-4 mr-2" /> {t("ecommerce.platform.view_mode.grid")}</Button>
                    <Button variant="ghost" size="sm" className="h-8 text-foreground"><ListIcon className="h-4 w-4 mr-2" /> {t("ecommerce.platform.view_mode.list")}</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="group border-none shadow-none bg-transparent flex flex-col h-full">
                      <div className="aspect-square rounded-2xl overflow-hidden relative mb-4">
                        <img 
                          src={product.imageUrl} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          alt={product.name}
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.isNew && <Badge className="bg-purple-600 border-none text-white">NEW</Badge>}
                          {product.onSale && <Badge className="bg-red-500 border-none text-white">SALE</Badge>}
                        </div>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="absolute top-3 right-3 h-9 w-9 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg bg-background text-foreground"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                          <Button className="w-full bg-background/90 backdrop-blur-sm text-foreground hover:bg-background font-bold gap-2 border" onClick={() => addToCart(product)}>
                            <Plus className="h-4 w-4" /> {t("ecommerce.quick_add")}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2 flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold group-hover:text-purple-600 transition-colors cursor-pointer" onClick={() => setSelectedProduct(product)}>
                            {product.name}
                          </h4>
                          <span className="font-black">NT$ {product.price.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                      </div>
                      <div className="flex items-center gap-1 pt-3">
                        <div className="flex text-amber-500">
                          <Star className="h-3 w-3 fill-current" />
                        </div>
                        <span className="text-[10px] font-bold">{product.rating}</span>
                        <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setCartOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" /> {t("ecommerce.cart")} ({cart.length})
                </h2>
                <Button variant="ghost" size="icon" className="text-foreground" onClick={() => setCartOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground/20" />
                    <p className="text-muted-foreground">{t("ecommerce.platform.cart_empty")}</p>
                    <Button variant="outline" className="bg-background text-foreground" onClick={() => setCartOpen(false)}>{t("ecommerce.platform.go_shopping")}</Button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <img src={item.product.imageUrl} className="h-20 w-20 object-cover rounded-xl" alt={item.product.name} />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-bold text-sm">{item.product.name}</p>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-foreground" onClick={() => removeFromCart(item.product.id)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{item.product.category}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border rounded-md h-8 bg-background">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-foreground"><Minus className="h-3 w-3" /></Button>
                            <span className="w-8 text-center text-xs font-bold">{item.qty}</span>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-foreground"><Plus className="h-3 w-3" /></Button>
                          </div>
                          <span className="font-black text-sm">NT$ {(item.product.price * item.qty).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-6 border-t bg-muted/20 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("ecommerce.platform.subtotal")}</span>
                    <span className="font-bold">NT$ {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("ecommerce.platform.shipping")}</span>
                    <span className="text-green-600 font-bold">{t("ecommerce.free_shipping")}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-black">
                    <span>{t("ecommerce.total")}</span>
                    <span className="text-purple-600">NT$ {cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                <Button className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 font-bold text-lg gap-2 shadow-lg shadow-purple-200 text-white">
                  <CreditCard className="h-5 w-5" /> {t("ecommerce.checkout")}
                </Button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-green-500" /> {t("ecommerce.platform.secure_checkout")}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <AiAssistant context="ecommerce" />
    </div>
  );
}
