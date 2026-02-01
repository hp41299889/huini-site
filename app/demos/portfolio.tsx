import React from "react";
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
import {
  MailIcon,
  PhoneIcon,
  GithubIcon,
  LinkedinIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { motion } from "framer-motion";

const projectData = [
  {
    id: "p1",
    title: "智慧家居控制系統",
    description:
      "一個基於物聯網的智慧家居平台，實現遠端控制設備、環境監測與自動化場景。",
    technologies: ["React", "Node.js", "MQTT", "MongoDB"],
    imageUrl:
      "https://images.unsplash.com/photo-1579294523617-640166270634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjEyOTIwMHw&ixlib=rb-4.0.3&q=80&w=400",
    link: "#",
  },
  {
    id: "p2",
    title: "AI 驅動的語言學習 App",
    description:
      "利用機器學習技術提供個人化的語言學習路徑、語音辨識與即時翻譯功能。",
    technologies: ["React Native", "Python", "TensorFlow", "PostgreSQL"],
    imageUrl:
      "https://images.unsplash.com/photo-1509909756405-be019994946d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjEyOTIwMHw&ixlib=rb-4.0.3&q=80&w=400",
    link: "#",
  },
  {
    id: "p3",
    title: "區塊鏈票務系統",
    description:
      "基於以太坊的去中心化票務平台，解決傳統票務市場的黃牛與假票問題。",
    technologies: ["Solidity", "Web3.js", "React", "Ganache"],
    imageUrl:
      "https://images.unsplash.com/photo-1639322537229-def73b37803e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjEyOTIwMHw&ixlib=rb-4.0.3&q=80&w=400",
    link: "#",
  },
];

const skills = {
  frontend: [
    "React",
    "Next.js",
    "Vue.js",
    "Angular",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Sass",
    "HTML5",
    "CSS3",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "Python",
    "Django",
    "Flask",
    "Go",
    "Gin",
    "SQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
  ],
  devops: [
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "Azure",
    "CI/CD",
    "Git",
    "Nginx",
  ],
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function PortfolioDemo() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">個人作品集 Demo</h1>

      {/* About Me Section */}
      <motion.section
        className="mb-12"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      >
        <Card>
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4OTAyMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjEyOTIwMHw&ixlib=rb-4.0.3&q=80&w=200" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">張大明 (John Doe)</CardTitle>
            <CardDescription className="text-lg">
              全端開發者 | 熱衷於打造高性能且用戶友好的應用
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-center">
            <p className="max-w-2xl mx-auto">
              我是一位經驗豐富的全端開發者，在前端（React, Vue,
              TypeScript）和後端（Node.js, Python, Go）技術棧上擁有扎實的技能。
              我熱衷於解決複雜的問題，並將創新的想法轉化為實際的產品。
              樂於學習新技術，並不斷提升自己的專業能力，旨在為客戶提供卓越的解決方案。
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank" aria-label="Github">
                  <GithubIcon className="h-6 w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank" aria-label="Linkedin">
                  <LinkedinIcon className="h-6 w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:johndoe@example.com" aria-label="Email">
                  <MailIcon className="h-6 w-6" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <Separator className="my-12" />

      {/* Projects Section */}
      <motion.section
        className="mb-12"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">精選專案</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="p-0">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardTitle className="text-xl font-semibold mb-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="link" className="p-0" asChild>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      查看專案 <ExternalLinkIcon className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Separator className="my-12" />

      {/* Skills Section */}
      <motion.section
        className="mb-12"
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">我的技能</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">前端開發</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {skills.frontend.map((skill) => (
                <Badge key={skill} variant="default">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">後端開發</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {skills.backend.map((skill) => (
                <Badge key={skill} variant="default">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">DevOps & 工具</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {skills.devops.map((skill) => (
                <Badge key={skill} variant="default">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </div>
  );
}
