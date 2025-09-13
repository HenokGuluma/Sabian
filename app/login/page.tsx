"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Gamepad2, Eye, EyeOff, Zap, Trophy, Shield, Users, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Added error state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    // Validate input
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    // Check for developer credentials
    const isDeveloper = email.toLowerCase() === "henimagne@gmail.com" && password === "tdashuluqa";
    
    // Simulate server authentication request
    setTimeout(() => {
      if (isDeveloper) {
        // Developer account - gets full data access
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", "henimagne");
        localStorage.setItem("userType", "developer");
        router.push("/console");
      } else {
        // Invalid credentials
        setError("Incorrect username or password");
        setIsLoading(false);
      }
    }, 1500 + Math.random() * 1000); // Realistic server response time
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gaming Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('/professional-gaming-setup-with-multiple-monitors-s.png')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-purple-900/50 to-slate-900/90"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-pink-500/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Floating Gaming Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-32 text-pink-500/30 animate-float">
          <Gamepad2 size={48} />
        </div>
        <div className="absolute top-40 right-40 text-cyan-400/30 animate-float delay-500">
          <Trophy size={40} />
        </div>
        <div className="absolute bottom-32 left-40 text-purple-500/30 animate-float delay-1000">
          <Zap size={44} />
        </div>
        <div className="absolute bottom-48 right-32 text-blue-500/30 animate-float delay-1500">
          <Shield size={36} />
        </div>
        <div className="absolute top-1/3 right-20 text-green-400/30 animate-float delay-2000">
          <Users size={42} />
        </div>
        <div className="absolute bottom-1/4 left-20 text-yellow-400/30 animate-float delay-2500">
          <Sparkles size={38} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-2xl mb-4 shadow-2xl shadow-pink-500/25">
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold font-heading bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Sabian Console
            </h1>
            <p className="text-slate-300 text-lg">
              Power up your gaming experience
            </p>
          </div>

          {/* Login Card */}
          <Card className="bg-slate-800/80 backdrop-blur-xl border-slate-700/50 shadow-2xl shadow-purple-500/10">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-white">
                Welcome Back, Gamer!
              </CardTitle>
              <CardDescription className="text-center text-slate-300">
                Enter your credentials to access your gaming dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="gamer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-pink-500 focus:ring-pink-500/20 h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-pink-500 focus:ring-pink-500/20 h-12 pr-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 text-pink-500 bg-slate-700 border-slate-600 rounded focus:ring-pink-500 focus:ring-2"
                    />
                    <Label htmlFor="remember" className="text-sm text-slate-300">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white font-semibold text-lg shadow-lg shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Gamepad2 size={20} />
                      <span>Sign In</span>
                    </div>
                  )}
                </Button>

                <div className="text-center pt-4">
                  <span className="text-slate-400">Don't have an account? </span>
                  <Link
                    href="/signup"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-3deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .delay-500 { animation-delay: 0.5s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1500 { animation-delay: 1.5s; }
        .delay-2000 { animation-delay: 2s; }
        .delay-2500 { animation-delay: 2.5s; }
      `}</style>
    </div>
  );
}