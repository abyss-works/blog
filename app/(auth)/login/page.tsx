import { login } from './actions'
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
        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[2px]" />
      </div>

      <Card className="w-full max-w-md z-10 bg-zinc-950/50 border-zinc-800 text-zinc-100 backdrop-blur-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">Admin Login</CardTitle>
          <CardDescription className="text-center text-zinc-400">
            Enter your credentials to access the studio
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@abyssworks.studio" required className="bg-zinc-900/50 border-zinc-800 focus:border-zinc-700" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required className="bg-zinc-900/50 border-zinc-800 focus:border-zinc-700" />
            </div>
          </CardContent>
          <CardFooter>
            <Button formAction={login} className="w-full bg-white text-black hover:bg-zinc-200 font-medium transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)]">
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
