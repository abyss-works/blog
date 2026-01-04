'use client'

import { useState } from 'react'
import { createPostAction } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminWritePage() {
  const [isPublished, setIsPublished] = useState(false)

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <form action={createPostAction}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">New Post</h1>
              <p className="text-zinc-400">Create and publish a new blog post.</p>
            </div>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline" className="border-zinc-800 text-zinc-400 hover:text-zinc-100">
                Cancel
              </Button>
              <Button type="submit" className="bg-zinc-100 text-zinc-950 hover:bg-zinc-300">
                Publish
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Editor Area */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-zinc-950/50 border-zinc-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                  <CardDescription>Write your post content using Markdown.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title" 
                      name="title"
                      placeholder="Enter post title" 
                      className="bg-zinc-900/50 border-zinc-800 focus:border-zinc-700 text-lg font-medium" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input 
                      id="slug" 
                      name="slug"
                      placeholder="post-url-slug" 
                      className="bg-zinc-900/50 border-zinc-800 focus:border-zinc-700 font-mono text-sm" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Body</Label>
                    <Textarea 
                      id="content" 
                      name="content"
                      placeholder="Write your markdown content here..." 
                      className="h-[500px] bg-zinc-900/50 border-zinc-800 focus:border-zinc-700 font-mono leading-relaxed resize-none p-4" 
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar / Metadata */}
            <div className="space-y-6">
              <Card className="bg-zinc-950/50 border-zinc-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Published</Label>
                      <div className="text-xs text-zinc-400">Make this post visible to everyone</div>
                    </div>
                    <Switch 
                      checked={isPublished}
                      onCheckedChange={setIsPublished}
                    />
                    <input type="hidden" name="published" value={isPublished ? 'on' : 'off'} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Excerpt</Label>
                    <Textarea 
                      id="description" 
                      name="description"
                      placeholder="Brief description for SEO and previews" 
                      className="bg-zinc-900/50 border-zinc-800 focus:border-zinc-700 h-24 text-sm" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                    <Input 
                      id="thumbnail_url" 
                      name="thumbnail_url"
                      placeholder="https://example.com/image.png" 
                      className="bg-zinc-900/50 border-zinc-800 focus:border-zinc-700" 
                    />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="categories">Categories (comma separated)</Label>
                     <Input 
                       id="categories" 
                       name="categories"
                       placeholder="Development, Tech" 
                       className="bg-zinc-900/50 border-zinc-800 focus:border-zinc-700" 
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="tags">Tags (comma separated)</Label>
                     <Input 
                       id="tags" 
                       name="tags"
                       placeholder="nextjs, prisma, supabase" 
                       className="bg-zinc-900/50 border-zinc-800 focus:border-zinc-700" 
                     />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
