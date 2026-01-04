import { Comment } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface CommentListProps {
  comments: Comment[]
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p className="text-zinc-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4 group">
          <Avatar className="h-10 w-10 border border-zinc-800">
            <AvatarImage src={comment.author?.avatar_url} />
            <AvatarFallback>{comment.author?.username?.slice(0, 2).toUpperCase() || 'AN'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-zinc-200">{comment.author?.username || 'Anonymous'}</span>
              <span className="text-xs text-zinc-500">
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              </span>
            </div>
            <p className="text-zinc-300 leading-relaxed text-sm">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
