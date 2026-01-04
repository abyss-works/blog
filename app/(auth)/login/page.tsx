import { login, loginWithGoogle } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WaveBackground } from "@/components/ui/wave-background"

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden p-4">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <WaveBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 to-zinc-950/80 backdrop-blur-[1px]" />
      </div>

      <Card className="w-full max-w-md z-10 bg-zinc-950/30 border-zinc-800/50 text-zinc-100 backdrop-blur-xl shadow-2xl ring-1 ring-white/10">
        <CardHeader className="space-y-2 pb-8 pt-10">
          <CardTitle className="text-3xl font-bold tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-zinc-400 text-base">
            Enter your credentials to access the studio
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-6 pt-6">
             <div className="text-center space-y-2">
                <p className="text-sm text-zinc-400">Sign in to continue to the studio</p>
             </div>
          </CardContent>
          <CardFooter className="pb-10">
            <Button 
                formAction={loginWithGoogle} 
                variant="outline"
                className="w-full h-12 border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:text-zinc-100 transition-all active:scale-[0.98] text-base relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <svg className="mr-3 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Continue with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="absolute bottom-6 text-center text-zinc-600 text-xs z-10">
        &copy; {new Date().getFullYear()} Abyssworks Studio. Secure Access Area.
      </div>
    </div>
  )
}
