'use client'

import * as React from 'react'
import Image from 'next/image'
import { Heart, MessageCircle, Eye, ImageIcon } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

export interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  coverUrl: string
  author: string
  likes: number
  comments: number
  views: number
}

export function ContentCard({
  title,
  coverUrl,
  author,
  likes,
  comments,
  views,
  className,
  ...props
}: ContentCardProps) {
  const [isImageError, setIsImageError] = React.useState<boolean>(false)

  return (
    <Card 
      className="overflow-hidden group hover:shadow-lg transition-shadow"
      {...props}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {isImageError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
          </div>
        ) : (
          <Image
            src={coverUrl}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            onError={() => setIsImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{author}</p>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t flex justify-between">
        <div className="flex items-center space-x-4 text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span className="text-xs">{likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">{comments}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-muted-foreground">
          <Eye className="w-4 h-4" />
          <span className="text-xs">{views}</span>
        </div>
      </CardFooter>
    </Card>
  )
} 