import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
  HeartIcon,
  MessageCircleIcon,
  Share2Icon,
  MoreHorizontalIcon,
  ThumbsUp,
} from "lucide-react";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  content: string;
  imageUrl?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  likedByCurrentUser: boolean;
}

interface Comment {
  id: string;
  author: {
    name: string;
    handle: string;
  };
  text: string;
  timestamp: string;
}

const initialPosts: Post[] = [
  {
    id: "p1",
    author: {
      name: "小明",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cfdfee26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMTg4NTcwMHw&ixlib=rb-4.0.3&q=80&w=200",
      handle: "@xiaoming",
    },
    content: "今天天氣真好，適合出去走走！",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961c3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjAwNjgwMHw&ixlib=rb-4.0.3&q=80&w=600",
    likes: 15,
    comments: [
      {
        id: "c1",
        author: { name: "小紅", handle: "@xiaohong" },
        text: "是啊，風景很美！",
        timestamp: "1小時前",
      },
      {
        id: "c2",
        author: { name: "小剛", handle: "@xiaogang" },
        text: "下次一起去！",
        timestamp: "30分鐘前",
      },
    ],
    timestamp: "2小時前",
    likedByCurrentUser: false,
  },
  {
    id: "p2",
    author: {
      name: "小美",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjAwNjc1MHw&ixlib=rb-4.0.3&q=80&w=200",
      handle: "@xiaomei",
    },
    content: "分享我最近做的甜點，味道超棒！",
    imageUrl:
      "https://images.unsplash.com/photo-1587391963470-3c22b64d7c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjAwNjg1MHw&ixlib=rb-4.0.3&q=80&w=600",
    likes: 30,
    comments: [],
    timestamp: "5小時前",
    likedByCurrentUser: true,
  },
];

export default function SocialMediaFeedDemo() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newCommentText, setNewCommentText] = useState<{
    [key: string]: string;
  }>({});

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likedByCurrentUser ? post.likes - 1 : post.likes + 1,
              likedByCurrentUser: !post.likedByCurrentUser,
            }
          : post,
      ),
    );
  };

  const handleAddComment = (postId: string) => {
    if (!newCommentText[postId] || newCommentText[postId].trim() === "") return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: { name: "你", handle: "@you" }, // Simulate current user
      text: newCommentText[postId],
      timestamp: "剛剛",
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post,
      ),
    );
    setNewCommentText((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">社群媒體動態 Demo</h1>

      {posts.map((post) => (
        <Card key={post.id} className="mb-6 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {post.author.handle} • {post.timestamp}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontalIcon className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="py-2">
            <p className="mb-4">{post.content}</p>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post Image"
                className="w-full rounded-md object-cover max-h-96 mb-4"
              />
            )}
            <div className="flex items-center text-sm text-muted-foreground">
              <ThumbsUp className="mr-1 h-4 w-4" /> {post.likes} 個讚
              <MessageCircleIcon className="ml-4 mr-1 h-4 w-4" />{" "}
              {post.comments.length} 則留言
            </div>
            <Separator className="my-4" />
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => handleLike(post.id)}
              >
                <HeartIcon
                  className={
                    post.likedByCurrentUser
                      ? "mr-2 h-5 w-5 text-red-500 fill-red-500"
                      : "mr-2 h-5 w-5"
                  }
                />
                讚
              </Button>
              <Button variant="ghost" className="flex-1">
                <MessageCircleIcon className="mr-2 h-5 w-5" />
                留言
              </Button>
              <Button variant="ghost" className="flex-1">
                <Share2Icon className="mr-2 h-5 w-5" />
                分享
              </Button>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <div className="w-full">
              {post.comments.length > 0 && (
                <div className="space-y-3 mb-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3 text-sm">
                      <Avatar className="h-7 w-7">
                        <AvatarImage
                          src={`https://ui-avatars.com/api/?name=${comment.author.name}&background=random&color=fff`}
                        />
                        <AvatarFallback>
                          {comment.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">
                          {comment.author.name}{" "}
                          <span className="text-muted-foreground">
                            {comment.author.handle}
                          </span>
                        </p>
                        <p>{comment.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {comment.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="新增留言..."
                  value={newCommentText[post.id] || ""}
                  onChange={(e) =>
                    setNewCommentText((prev) => ({
                      ...prev,
                      [post.id]: e.target.value,
                    }))
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddComment(post.id);
                    }
                  }}
                />
                <Button onClick={() => handleAddComment(post.id)}>發布</Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
