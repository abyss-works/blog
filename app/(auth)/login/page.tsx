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
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="admin@abyssworks.studio" 
                required 
                className="bg-zinc-900/50 border-zinc-800 focus:border-white/20 focus:ring-0 placeholder:text-zinc-600 h-10 transition-colors" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" classname="text-zinc-300">Password</Label>
                <span className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors">Forgot password?</span>
              </div>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="bg-zinc-900/50 border-zinc-800 focus:border-white/20 focus:ring-0 h-10 transition-colors" 
              />
            </div>
          </CardContent>
          <CardFooter className="pt-4 pb-10">
            <Button 
                formAction={login} 
                className="w-full h-11 bg-white text-black hover:bg-zinc-200 font-medium transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)] active:scale-[0.98]"
            >
              Sign in
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
