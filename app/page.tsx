
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Gamepad2,
  Shield,
  Zap,
  Users,
  BarChart3,
  Server,
  Sparkles,
  Trophy,
  Target,
  Rocket,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 particles-bg">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-sm border-0 border-b border-slate-700/50 animate-slide-up">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold font-heading text-white drop-shadow-lg">Sabian</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-200 hover:text-white transition-all hover:text-glow font-medium">
              Features
            </a>
            <a href="#pricing" className="text-slate-200 hover:text-white transition-all hover:text-glow font-medium">
              Pricing
            </a>
            <a href="#docs" className="text-slate-200 hover:text-white transition-all hover:text-glow font-medium">
              Docs
            </a>
            <Button variant="ghost" className="text-slate-200 hover:text-white btn-gaming font-medium" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white btn-gaming animate-glow-pulse font-semibold"
              asChild
            >
              <Link href="/signup">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left animate-slide-up order-2 lg:order-1">
              <Badge className="mb-6 bg-gradient-to-r from-pink-500/20 to-cyan-400/20 text-white border-pink-500/30 animate-bounce-subtle">
                <Sparkles className="w-4 h-4 mr-2" />
                Built for Game Developers
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 text-white drop-shadow-2xl animate-float">
                The Ultimate{" "}
                <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">Gaming</span>{" "}
                Backend
              </h1>
              <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl leading-relaxed animate-slide-up font-body">
                The most powerful backend-as-a-service platform designed specifically for mobile game developers. Build,
                scale, and monetize your games with dedicated gaming infrastructure that outperforms generic solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center animate-scale-in">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white btn-gaming font-semibold"
                  asChild
                >
                  <Link href="/signup">
                    Start Building
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-slate-800/50 backdrop-blur-sm btn-gaming text-white border-slate-600 hover:border-slate-500 hover:bg-slate-700/50 font-semibold"
                  asChild
                >
                  <Link href="/console">View Demo</Link>
                </Button>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative z-10">
                <Image
                  src="/attached_assets/36713-Photoroom_1756127615045.png"
                  alt="Happy gamers enjoying competitive mobile gaming together"
                  width={500}
                  height={350}
                  className="rounded-2xl shadow-2xl animate-float-delayed w-full max-w-lg mx-auto"
                  priority
                  unoptimized
                />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-white font-semibold text-base">Connect players globally</p>
                  <p className="text-slate-300 text-xs">
                    Build games that bring people together with Sabian's social gaming features
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-full opacity-20 animate-pulse-glow"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full opacity-15 animate-pulse-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sabian Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white drop-shadow-lg">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">Sabian</span>?
            </h2>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto font-body">
              Generic backend solutions weren't built for games. We created Sabian specifically to solve the unique
              challenges that keep game developers up at night.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-pink-500/50 transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:animate-pulse-glow transition-all">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-heading text-white">Game-First Design</CardTitle>
                <CardDescription className="text-slate-300 font-body">
                  Every feature is built with gaming use cases in mind, not retrofitted from generic app solutions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-400/50 transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:animate-pulse-glow transition-all">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-heading text-white">Ultra-Low Latency</CardTitle>
                <CardDescription className="text-slate-300 font-body">
                  Dedicated game servers and edge computing ensure your players get the responsiveness they demand.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-pink-500/50 transition-all duration-300 group text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:animate-pulse-glow transition-all">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-heading text-white">Faster Development</CardTitle>
                <CardDescription className="text-slate-300 font-body">
                  Pre-built gaming features mean you spend time on gameplay, not rebuilding the same backend systems.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Gaming Statistics */}
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <div className="text-3xl font-bold font-heading bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                50ms
              </div>
              <div className="text-slate-300">Average Latency</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <div className="text-3xl font-bold font-heading bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                99.9%
              </div>
              <div className="text-slate-300">Uptime SLA</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <div className="text-3xl font-bold font-heading bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                10k+
              </div>
              <div className="text-slate-300">Games Powered</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <div className="text-3xl font-bold font-heading bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-slate-300">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white drop-shadow-lg">
              Everything Games Need
            </h2>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto font-body">
              Purpose-built features that address the unique challenges of game development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dedicated Game Servers */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-pink-500/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:animate-pulse-glow transition-all">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="font-heading text-white">Dedicated Game Servers</CardTitle>
                <CardDescription className="text-slate-300">
                  Low-latency, authoritative multiplayer hosting that scales automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Auto-scaling server instances</li>
                  <li>• Global edge locations</li>
                  <li>• Anti-cheat built-in</li>
                </ul>
              </CardContent>
            </Card>

            {/* Player Analytics */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-400/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:animate-pulse-glow transition-all">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="font-heading text-white">Game Analytics</CardTitle>
                <CardDescription className="text-slate-300">
                  Deep insights into player behavior, retention, and monetization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Player progression tracking</li>
                  <li>• Revenue analytics</li>
                  <li>• Cohort analysis</li>
                </ul>
              </CardContent>
            </Card>

            {/* Virtual Economy */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-pink-500/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:animate-pulse-glow transition-all">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="font-heading text-white">Virtual Economy</CardTitle>
                <CardDescription className="text-slate-300">
                  Secure currency and inventory management with fraud protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Multi-currency support</li>
                  <li>• Item catalog management</li>
                  <li>• Transaction security</li>
                </ul>
              </CardContent>
            </Card>

            {/* Player Authentication */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-400/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:animate-pulse-glow transition-all">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="font-heading text-white">Player Auth</CardTitle>
                <CardDescription className="text-slate-300">
                  Seamless authentication with anonymous play and social login
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Anonymous guest accounts</li>
                  <li>• Social platform integration</li>
                  <li>• Cross-device sync</li>
                </ul>
              </CardContent>
            </Card>

            {/* LiveOps */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-pink-500/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:animate-pulse-glow transition-all">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="font-heading text-white">LiveOps</CardTitle>
                <CardDescription className="text-slate-300">
                  Dynamic content updates and event management without app updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Scheduled events</li>
                  <li>• A/B testing</li>
                  <li>• Remote configuration</li>
                </ul>
              </CardContent>
            </Card>

            {/* Anti-Cheat */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-400/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:animate-pulse-glow transition-all">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="font-heading text-white">Anti-Cheat</CardTitle>
                <CardDescription className="text-slate-300">
                  Advanced security and cheat detection to protect your game economy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Behavioral analysis</li>
                  <li>• Rate limiting</li>
                  <li>• Anomaly detection</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gaming Showcase */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative">
              <Image
                src="/attached_assets/38246_1756127615046.jpg"
                alt="Focused gamer experiencing immersive gameplay on mobile device"
                width={500}
                height={350}
                className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-white font-bold text-lg mb-1">Seamless Player Experience</h4>
                <p className="text-slate-300 text-xs">
                  Create engaging mobile games with ultra-low latency and smooth gameplay
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-white drop-shadow-lg">
                Built by Gamers, for Gamers
              </h3>
              <p className="text-lg text-slate-200 mb-6 leading-relaxed font-body">
                Our team consists of veteran game developers who understand the unique challenges of building successful
                mobile games. We've experienced the pain points of using generic backend solutions and built Sabian to
                solve them.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-slate-200 font-body">Real-time multiplayer that actually works</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-slate-200 font-body">Analytics that matter for game design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-slate-200 font-body">Security that prevents cheating</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-slate-200 font-body">Economy systems that scale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-12 text-center">
            <CardHeader>
              <CardTitle className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white drop-shadow-lg">
                Ready to Level Up?
              </CardTitle>
              <CardDescription className="text-xl max-w-2xl mx-auto text-slate-200 font-body">
                Join thousands of game developers who trust Sabian to power their mobile games. Start building your next
                hit game today with our free tier.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white btn-gaming font-semibold"
                  asChild
                >
                  <Link href="/signup">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-slate-800/50 backdrop-blur-sm btn-gaming text-white border-slate-600 hover:border-slate-500 hover:bg-slate-700/50 font-semibold"
                  asChild
                >
                  <Link href="/console">Schedule Demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-700">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0 group">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold font-heading text-white drop-shadow-lg">Sabian</span>
            </Link>
            <div className="flex items-center space-x-6 text-sm text-slate-300">
              <a href="#" className="hover:text-white transition-all hover:text-glow font-body">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-all hover:text-glow font-body">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-all hover:text-glow font-body">
                Support
              </a>
              <span className="font-body">© 2024 Sabian. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
