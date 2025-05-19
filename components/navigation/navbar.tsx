'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Menu, Search, Bell, X, Home, Palette, Info, Star, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Navbar() {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-background/95 backdrop-blur-md border-b shadow-sm z-50 transition-all duration-200">
      {/* 移动端搜索覆盖层 */}
      <div className={cn(
        "absolute inset-x-0 top-0 h-16 bg-background/95 backdrop-blur-md md:hidden transition-all duration-300 ease-in-out",
        isSearchActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        <div className="flex items-center h-full px-4 gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => setIsSearchActive(false)}
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="relative flex-1">
            <Search className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="搜索作品、创作者..."
              className="w-full rounded-full border pl-9 pr-4 py-2 text-sm focus-visible:ring-1 focus-visible:ring-primary transition-all
              bg-accent/5 hover:bg-accent/10 placeholder:text-muted-foreground/70"
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto flex items-center h-16 px-4">
        {/* Left: Logo & Menu */}
        <div className={cn(
          "flex items-center space-x-3",
          isSearchActive && "hidden md:flex"
        )}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Open menu" 
                className="hover:bg-accent/20 transition-colors"
              >
                <Menu className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-72 p-2" 
              align="start"
              sideOffset={8}
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                导航菜单
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem className="flex items-center gap-2 px-2 py-2.5 hover:bg-accent/10 transition-colors cursor-pointer group">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Home className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">首页</span>
                  <span className="text-xs text-muted-foreground">浏览最新内容和推荐</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-2 py-2.5 hover:bg-accent/10 transition-colors cursor-pointer group">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Palette className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">作品集</span>
                  <span className="text-xs text-muted-foreground">查看精选作品展示</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-2 py-2.5 hover:bg-accent/10 transition-colors cursor-pointer group">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Star className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">收藏夹</span>
                  <span className="text-xs text-muted-foreground">管理您的收藏内容</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem className="flex items-center gap-2 px-2 py-2.5 hover:bg-accent/10 transition-colors cursor-pointer group">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Info className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">关于我们</span>
                  <span className="text-xs text-muted-foreground">了解更多项目信息</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-2 py-2.5 hover:bg-accent/10 transition-colors cursor-pointer group">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Settings className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">设置</span>
                  <span className="text-xs text-muted-foreground">个性化您的偏好</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link 
            href="/" 
            className="text-xl font-bold text-primary hover:opacity-80 transition-opacity flex items-center space-x-1"
          >
            <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-md text-sm md:text-base">Ani</span>
            <span className="text-sm md:text-base">tale</span>
          </Link>
        </div>

        {/* Center: Search - Desktop Only */}
        <div className="hidden md:flex flex-1 justify-center px-4 max-w-3xl mx-auto">
          <div className="relative w-2/3">
            <Search className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="搜索作品、创作者..."
              className="w-full rounded-full border pl-9 pr-4 py-2 text-sm focus-visible:ring-1 focus-visible:ring-primary transition-all
              bg-accent/5 hover:bg-accent/10 placeholder:text-muted-foreground/70"
            />
          </div>
        </div>

        {/* Right: Notifications, Theme Toggle & Search (Mobile) */}
        <div className={cn(
          "flex items-center ml-auto",
          isSearchActive && "hidden md:flex"
        )}>
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Notifications" 
                className="hover:bg-accent/20 transition-colors relative hidden sm:flex"
              >
                <Bell className="h-5 w-5 text-muted-foreground" />
                <Badge 
                  variant="destructive" 
                  className="absolute top-2 right-2 h-2 w-2 p-0 rounded-full animate-pulse" 
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-[calc(100vw-2rem)] sm:w-80 p-2"
              sideOffset={8}
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                通知中心
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem className="flex items-center gap-2 px-2 py-3 hover:bg-accent/10 transition-colors cursor-pointer">
                <div className="flex flex-col">
                  <span className="text-sm">暂无新通知</span>
                  <span className="text-xs text-muted-foreground">有新消息时会在这里显示</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


          {/* Mobile Search Trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-accent/20 transition-colors ml-2"
            onClick={() => setIsSearchActive(true)}
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
}
