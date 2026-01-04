'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { User } from '@supabase/supabase-js'

interface UserNavProps {
  user: User | null
  profile?: { avatar_url?: string | null, username?: string | null, role?: string | null } | null
}

export function UserNav({ user, profile }: UserNavProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  if (!user) {
    return (
      <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors">
        Login
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none rounded-full ring-offset-2 ring-offset-black focus:ring-2 focus:ring-zinc-600 transition-all">
          <Avatar className="h-9 w-9 border border-zinc-800 bg-zinc-900">
            <AvatarImage src={profile?.avatar_url || user.user_metadata.avatar_url} />
            <AvatarFallback className="text-zinc-400 bg-zinc-900 text-xs">
              {profile?.username?.slice(0, 2).toUpperCase() || 'user'}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#0A0A0A] border-zinc-800 text-zinc-300" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-zinc-100">{profile?.username || 'User'}</p>
            <p className="text-xs leading-none text-zinc-500">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuItem asChild className="focus:bg-zinc-900 focus:text-zinc-100 cursor-pointer">
           <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        {profile?.role === 'admin' && (
          <DropdownMenuItem asChild className="focus:bg-zinc-900 focus:text-zinc-100 cursor-pointer text-amber-500 focus:text-amber-400">
            <Link href="/admin/write">Write Post</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="bg-zinc-800" />
        <DropdownMenuItem 
          className="focus:bg-zinc-900 focus:text-zinc-100 cursor-pointer text-red-500 focus:text-red-400"
          onClick={handleSignOut}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
