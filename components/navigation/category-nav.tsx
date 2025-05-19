'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  Gamepad2,
  Music2,
  Film,
  PenTool,
  Camera,
  BookOpen,
  Code2,
  MoreHorizontal,
  LucideIcon,
} from 'lucide-react'

interface Category {
  name: string
  icon: LucideIcon
  color: string
  href?: string
}

const categories: Category[] = [
  {
    name: '游戏',
    icon: Gamepad2,
    color: 'text-blue-500',
    href: '/categories/games',
  },
  {
    name: '音乐',
    icon: Music2,
    color: 'text-pink-500',
    href: '/categories/music',
  },
  {
    name: '动画',
    icon: Film,
    color: 'text-purple-500',
    href: '/categories/animation',
  },
  {
    name: '绘画',
    icon: PenTool,
    color: 'text-orange-500',
    href: '/categories/art',
  },
  {
    name: '摄影',
    icon: Camera,
    color: 'text-emerald-500',
    href: '/categories/photography',
  },
  {
    name: '文学',
    icon: BookOpen,
    color: 'text-yellow-500',
    href: '/categories/literature',
  },
  {
    name: '编程',
    icon: Code2,
    color: 'text-cyan-500',
    href: '/categories/programming',
  },
]

export interface CategoryNavProps {
  className?: string
}

export function CategoryNav({ className }: CategoryNavProps) {
  return (
    <div className={cn('h-[calc(100vh-4rem)]', className)}>
      <ScrollArea>
        <div className="px-4 py-4 space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground">分类导航</h2>
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="ghost"
                className="w-full justify-start hover:bg-accent/50"
                asChild={!!category.href}
              >
                {category.href ? (
                  <a href={category.href}>
                    <category.icon className={cn('mr-2 h-4 w-4', category.color)} />
                    {category.name}
                  </a>
                ) : (
                  <>
                    <category.icon className={cn('mr-2 h-4 w-4', category.color)} />
                    {category.name}
                  </>
                )}
              </Button>
            ))}
            <Button variant="ghost" className="w-full justify-start hover:bg-accent/50">
              <MoreHorizontal className="mr-2 h-4 w-4 text-muted-foreground" />
              更多分类
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
} 