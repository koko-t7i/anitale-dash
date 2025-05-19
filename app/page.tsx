import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CategoryNav } from "@/components/navigation/category-nav"
import { ContentCard } from "@/components/cards/content-card"

// 模拟数据
const mockContents = [
  {
    id: 1,
    title: "探索未知的冒险：一款独特的像素风格游戏设计",
    coverUrl: "https://source.unsplash.com/random/800x600?game",
    author: "创意工坊",
    likes: 128,
    comments: 32,
    views: 1024,
  },
  {
    id: 2,
    title: "城市夜景摄影：捕捉都市中的光与影",
    coverUrl: "https://source.unsplash.com/random/800x600?city",
    author: "光影随行",
    likes: 256,
    comments: 48,
    views: 2048,
  },
  {
    id: 3,
    title: "现代插画艺术：简约风格的表现力",
    coverUrl: "https://source.unsplash.com/random/800x600?illustration",
    author: "艺术工作室",
    likes: 512,
    comments: 64,
    views: 4096,
  },
  {
    id: 4,
    title: "电子音乐创作：节奏与旋律的完美融合",
    coverUrl: "https://source.unsplash.com/random/800x600?music",
    author: "声音实验室",
    likes: 384,
    comments: 96,
    views: 3072,
  },
]

export default function Home() {
  return (
    <main className="flex min-h-screen pt-16">
      {/* 左侧边栏 */}
      <aside className="w-64 border-r shrink-0 hidden md:block">
        <CategoryNav />
      </aside>

      {/* 主内容区域 */}
      <div className="flex-1 min-w-0">
        {/* 顶部区域 */}
        <div className="border-b sticky top-16 bg-background/95 backdrop-blur-sm z-10">
          <div className="container flex items-center justify-between py-4">
            <Tabs defaultValue="推荐" className="w-full">
              <TabsList>
                <TabsTrigger value="推荐">推荐</TabsTrigger>
                <TabsTrigger value="最新">最新</TabsTrigger>
                <TabsTrigger value="热门">热门</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" className="ml-4 whitespace-nowrap">
              更多
            </Button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="container py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockContents.map(({ id, ...content }) => (
              <ContentCard key={id} {...content} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
