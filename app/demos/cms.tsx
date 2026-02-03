import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { 
  Pencil, 
  Trash2, 
  Eye, 
  PlusCircle, 
  Search, 
  Filter, 
  MoreHorizontal, 
  LayoutGrid, 
  List, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  Users,
  X,
  ChevronRight,
  Globe,
  FileEdit,
  BarChart3
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "~/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";
import { AiAssistant } from "~/components/ai-assistant";
import { useTranslation } from "react-i18next";

interface Article {
  id: string;
  title: string;
  author: string;
  status: "published" | "draft" | "pending";
  category: string;
  views: number;
  date: string;
}

export default function CmsDemo() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([
    { id: "1", title: t("cms.mock.a1.title"), author: t("common.author", "張三"), status: "published", category: t("cms.categories.design"), views: 1245, date: "2026-01-28" },
    { id: "2", title: t("cms.mock.a2.title"), author: t("common.author", "李四"), status: "draft", category: t("cms.categories.marketing"), views: 0, date: "2026-01-27" },
    { id: "3", title: t("cms.mock.a3.title"), author: t("common.author", "王五"), status: "published", category: t("cms.categories.tech"), views: 890, date: "2026-01-25" },
    { id: "4", title: t("cms.mock.a4.title"), author: t("common.author", "趙六"), status: "pending", category: t("cms.categories.tech"), views: 50, date: "2026-01-24" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isAdding, setIsAdding] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isPreviewing, setIsPreviewing] = useState<Article | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Article>>({
    title: "",
    author: t("common.author", "管理員"),
    status: "draft",
    category: t("common.all", "未分類"),
    date: new Date().toISOString().split('T')[0]
  });

  const filteredArticles = useMemo(() => {
    return articles.filter(a => 
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

  const resetForm = () => {
    setFormData({ title: "", author: t("common.author", "管理員"), status: "draft", category: t("common.all", "未分類"), date: new Date().toISOString().split('T')[0] });
  };

  const handleSave = () => {
    if (editingArticle) {
      setArticles(articles.map(a => a.id === editingArticle.id ? { ...a, ...formData } as Article : a));
      setEditingArticle(null);
    } else {
      const newArticle: Article = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title || t("common.no_data", "無標題文章"),
        author: formData.author || t("common.author", "管理員"),
        status: (formData.status as any) || "draft",
        category: formData.category || t("common.all", "未分類"),
        views: 0,
        date: formData.date || new Date().toISOString().split('T')[0]
      };
      setArticles([newArticle, ...articles]);
      setIsAdding(false);
    }
    resetForm();
  };

  const deleteArticle = (id: string) => {
    setArticles(articles.filter(a => a.id !== id));
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* CMS Sidebar */}
      <aside className="w-64 border-r bg-muted/20 flex flex-col hidden lg:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <Globe className="h-6 w-6" />
            <span>{t("demos_list.cms_title")}</span>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 bg-primary/10 text-primary">
            <FileText className="h-4 w-4" /> {t("cms.sidebar.content_management")}
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
            <ImageIcon className="h-4 w-4" /> {t("cms.sidebar.media_library")}
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
            <BarChart3 className="h-4 w-4" /> {t("cms.sidebar.analytics")}
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
            <Users className="h-4 w-4" /> {t("cms.sidebar.users")}
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
            <Settings className="h-4 w-4" /> {t("cms.sidebar.settings")}
          </Button>
        </nav>
        <div className="p-6 mt-auto">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 space-y-2">
              <p className="text-xs font-bold text-primary">{t("cms.storage_space")}</p>
              <Progress value={45} className="h-1" />
              <p className="text-[10px] text-muted-foreground">{t("cms.storage_usage")}</p>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden text-foreground">
        <header className="h-16 border-b flex items-center justify-between px-8 bg-background/50 backdrop-blur-md">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t("common.search")} 
                className="pl-9 bg-muted/50 border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex border rounded-lg overflow-hidden bg-background">
              <Button 
                variant={viewMode === "list" ? "secondary" : "ghost"} 
                size="icon" 
                className="rounded-none h-9 w-9"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "grid" ? "secondary" : "ghost"} 
                size="icon" 
                className="rounded-none h-9 w-9"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={() => setIsAdding(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> {t("common.add")}
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t("cms.content_library")}</h1>
              <p className="text-muted-foreground">{t("common.total")} {articles.length} {t("cms.sidebar.content_management")}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> {t("cms.filter")}
              </Button>
            </div>
          </div>

          {viewMode === "list" ? (
            <Card className="bg-background">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("cms.article_title")}</TableHead>
                    <TableHead>{t("cms.category")}</TableHead>
                    <TableHead>{t("common.author")}</TableHead>
                    <TableHead>{t("cms.status")}</TableHead>
                    <TableHead>{t("cms.views")}</TableHead>
                    <TableHead className="text-right">{t("common.action")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="popLayout">
                    {filteredArticles.map((article) => (
                      <motion.tr 
                        key={article.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group hover:bg-muted/50 transition-colors"
                      >
                        <TableCell className="font-medium max-w-[300px] truncate">
                          {article.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{article.category}</Badge>
                        </TableCell>
                        <TableCell>{article.author}</TableCell>
                        <TableCell>
                          <Badge
                            className="capitalize"
                            variant={
                              article.status === "published"
                                ? "default"
                                : article.status === "draft"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {article.status === "published" ? t("cms.status_label.published") : article.status === "draft" ? t("cms.status_label.draft") : t("cms.status_label.pending")}
                          </Badge>
                        </TableCell>
                        <TableCell>{article.views.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsPreviewing(article)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingArticle(article); setFormData(article); }}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setIsPreviewing(article)}>{t("common.view")}</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { setEditingArticle(article); setFormData(article); }}>{t("common.edit")}</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" onClick={() => deleteArticle(article.id)}>
                                  {t("common.delete")}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden group bg-background">
                  <div className="aspect-video bg-muted flex items-center justify-center relative">
                    <FileEdit className="h-12 w-12 text-muted-foreground/20" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" onClick={() => setIsPreviewing(article)}>{t("common.view")}</Button>
                      <Button size="sm" onClick={() => { setEditingArticle(article); setFormData(article); }}>{t("common.edit")}</Button>
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-[10px]">{article.category}</Badge>
                      <span className="text-[10px] text-muted-foreground">{article.date}</span>
                    </div>
                    <CardTitle className="text-sm font-bold line-clamp-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-2">
                    <span className="text-xs text-muted-foreground">{article.author}</span>
                    <Badge variant={article.status === "published" ? "default" : "secondary"} className="text-[10px] py-0 h-4">
                      {article.status === "published" ? t("cms.status_label.published") : t("cms.status_label.draft")}
                    </Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Editor Modal */}
      <AnimatePresence>
        {(isAdding || editingArticle) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border"
            >
              <div className="p-6 border-b flex items-center justify-between bg-muted/30">
                <h2 className="text-xl font-bold">{editingArticle ? t("cms.edit_article") : t("cms.new_article")}</h2>
                <Button variant="ghost" size="icon" onClick={() => { setIsAdding(false); setEditingArticle(null); resetForm(); }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-foreground">
                <div className="space-y-2">
                  <Label>{t("cms.article_title")}</Label>
                  <Input 
                    placeholder={t("cms.placeholders.title")} 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="text-lg font-bold bg-background"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("cms.category")}</Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={t("cms.categories.tech")}>{t("cms.categories.tech")}</SelectItem>
                        <SelectItem value={t("cms.categories.design")}>{t("cms.categories.design")}</SelectItem>
                        <SelectItem value={t("cms.categories.marketing")}>{t("cms.categories.marketing")}</SelectItem>
                        <SelectItem value={t("cms.categories.news")}>{t("cms.categories.news")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("cms.status")}</Label>
                    <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as any })}>
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">{t("cms.actions.publish_now")}</SelectItem>
                        <SelectItem value="draft">{t("cms.actions.save_draft")}</SelectItem>
                        <SelectItem value="pending">{t("cms.actions.submit_review")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t("cms.placeholders.content")}</Label>
                  <Textarea placeholder={t("cms.placeholders.summary")} className="min-h-[100px] bg-background" />
                </div>
                <div className="p-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium text-muted-foreground">{t("cms.upload_cover")}</p>
                </div>
              </div>
              <div className="p-6 border-t flex justify-end gap-3 bg-background">
                <Button variant="outline" onClick={() => { setIsAdding(false); setEditingArticle(null); resetForm(); }}>{t("common.cancel")}</Button>
                <Button onClick={handleSave}>{t("cms.save_changes")}</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {isPreviewing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-background w-full max-w-4xl h-[90vh] rounded-t-3xl overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b flex justify-between items-center bg-background">
                <Badge variant="outline">{t("cms.preview")}</Badge>
                <Button variant="ghost" size="icon" onClick={() => setIsPreviewing(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-12 bg-background text-foreground">
                <div className="max-w-2xl mx-auto space-y-8">
                  <div className="space-y-4">
                    <Badge className="bg-primary text-white border-none">{isPreviewing.category}</Badge>
                    <h1 className="text-4xl font-extrabold tracking-tight">{isPreviewing.title}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="font-bold text-foreground">{isPreviewing.author}</span>
                      <span>•</span>
                      <span>{isPreviewing.date}</span>
                      <span>•</span>
                      <span>{isPreviewing.views} {t("cms.views")}</span>
                    </div>
                  </div>
                  <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground/20" />
                  </div>
                  <div className="prose prose-lg dark:prose-invert">
                    <p>{t("cms.preview_text")}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <AiAssistant context="cms" />
    </div>
  );
}
