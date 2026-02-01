import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { ArrowLeftIcon, CalendarDays, User } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  imageUrl?: string;
}

const blogPostsData: BlogPost[] = [
  {
    id: "b1",
    title: "探索現代前端框架的最新趨勢",
    summary:
      "深入探討 React, Vue, Angular 的最新發展，以及 Web 組件技術的興起。",
    content: `
      <p class="mb-4">近年來，前端開發領域的發展日新月異。從傳統的 JavaScript 函式庫到現代化的框架，每一次的迭代都為開發者帶來了更高效、更強大的工具。</p>
      <h2 class="text-2xl font-bold mb-3">React 生態系的持續繁榮</h2>
      <p class="mb-4">React 仍然是前端開發的主流選擇之一。其強大的生態系、靈活的組件化思想以及豐富的第三方函式庫，使其在大型專案中表現出色。特別是 React 18 引入的併發模式，為使用者體驗帶來了質的飛躍。</p>
      <h2 class="text-2xl font-bold mb-3">Vue 和 Angular 的穩定發展</h2>
      <p class="mb-4">Vue 憑藉其簡潔的 API 和友好的學習曲線，深受許多開發者的喜愛。Vue 3 的發布，更是在性能和 TypeScript 支援方面取得了顯著進步。而 Angular 則以其全面的解決方案和企業級應用支援，在大型企業中佔據一席之地。</p>
      <h2 class="text-2xl font-bold mb-3">Web 組件的崛起</h2>
      <p class="mb-4">Web 組件技術（如 Custom Elements, Shadow DOM, HTML Templates）的成熟，為構建可重用、跨框架的 UI 組件提供了原生的解決方案。這將有助於減少對特定框架的依賴，提高前端開發的靈活性。</p>
      <p class="mt-6 text-muted-foreground"><em>作者: 張三，2026年1月20日</em></p>
    `,
    author: "張三",
    date: "2026-01-20",
    tags: ["前端", "React", "Vue", "Angular", "Web開發"],
    imageUrl:
      "https://images.unsplash.com/photo-1596547677464-969427389814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjEwMjgwMHw&ixlib=rb-4.0.3&q=80&w=800",
  },
  {
    id: "b2",
    title: "雲端運算在企業數位轉型中的角色",
    summary: "分析雲端服務如何加速企業創新、降低成本，並提升市場競爭力。",
    content: `
      <p class="mb-4">雲端運算已成為企業數位轉型的核心驅動力。透過彈性的資源配置、按需付費的模式以及全球化的部署能力，雲端服務正在重塑企業的 IT 基礎設施和業務模式。</p>
      <h2 class="text-2xl font-bold mb-3">彈性與可擴展性</h2>
      <p class="mb-4">雲端運算最顯著的優勢之一是其無與倫比的彈性。企業可以根據業務需求快速擴展或縮減計算資源，無需預先投入大量硬體成本。這使得企業能夠更靈活地應對市場變化和業務高峰。</p>
      <h2 class="text-2xl font-bold mb-3">成本效益與全球部署</h2>
      <p class="mb-4">透過雲端服務，企業可以將資本支出轉變為營運支出，有效降低 IT 成本。同時，雲端供應商的全球數據中心網絡，使得企業能夠輕鬆實現全球化部署，為不同地區的用戶提供低延遲的服務。</p>
      <h2 class="text-2xl font-bold mb-3">創新與安全</h2>
      <p class="mb-4">雲端平台集成了豐富的創新技術，如人工智慧、大數據分析、物聯網等，為企業提供了強大的創新工具。此外，主流雲端供應商在安全方面的投入遠超單一企業，能提供更高級別的數據保護和合規性保障。</p>
      <p class="mt-6 text-muted-foreground"><em>作者: 李四，2026年1月15日</em></p>
    `,
    author: "李四",
    date: "2026-01-15",
    tags: ["雲端", "數位轉型", "企業應用"],
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4b9347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjEwMjgwMHw&ixlib=rb-4.0.3&q=80&w=800",
  },
];

export default function BlogDemo() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
        <Button
          variant="outline"
          onClick={() => setSelectedPost(null)}
          className="mb-6"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> 返回文章列表
        </Button>
        <Card>
          {selectedPost.imageUrl && (
            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.title}
              className="w-full h-80 object-cover rounded-t-lg mb-6"
            />
          )}
          <CardHeader>
            <CardTitle className="text-4xl font-bold mb-2">
              {selectedPost.title}
            </CardTitle>
            <CardDescription className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" /> {selectedPost.author}
              </div>
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" /> {selectedPost.date}
              </div>
            </CardDescription>
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedPost.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        部落格/文章平台 Demo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPostsData.map((post) => (
          <Card key={post.id} className="flex flex-col">
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <CardHeader className="flex-grow">
              <CardTitle className="text-xl line-clamp-2">
                {post.title}
              </CardTitle>
              <CardDescription className="flex items-center space-x-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
                <CalendarDays className="h-4 w-4" />
                <span>{post.date}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {post.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setSelectedPost(post)}>
                閱讀文章
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
