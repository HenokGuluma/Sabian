"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gamepad2, Eye, EyeOff, Crown, Star, Rocket, Target, Shield, Zap } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/console");
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gaming Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('/happy-mobile-gamers-playing-on-phones-with-colorfu.png')] bg-cover bg-center opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-blue-900/50 to-slate-900/90"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Floating Gaming Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-28 left-28 text-blue-500/30 animate-float">
          <Crown size={52} />
        </div>
        <div className="absolute top-36 right-36 text-purple-500/30 animate-float delay-500">
          <Star size={44} />
        </div>
        <div className="absolute bottom-28 left-44 text-cyan-400/30 animate-float delay-1000">
          <Rocket size={48} />
        </div>
        <div className="absolute bottom-44 right-28 text-pink-500/30 animate-float delay-1500">
          <Target size={40} />
        </div>
        <div className="absolute top-1/4 right-16 text-green-400/30 animate-float delay-2000">
          <Shield size={46} />
        </div>
        <div className="absolute bottom-1/3 left-16 text-yellow-400/30 animate-float delay-2500">
          <Zap size={42} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-2xl shadow-blue-500/25">
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold font-heading bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Join Sabian
            </h1>
            <p className="text-slate-300 text-lg">
              Start your epic gaming journey today
            </p>
          </div>

          {/* Signup Card */}
          <Card className="bg-slate-800/80 backdrop-blur-xl border-slate-700/50 shadow-2xl shadow-blue-500/10">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-white">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-center text-slate-300">
                Level up your gaming experience with us
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Full Name</Label>
                  <Input 
                    id="username" 
                    name="username"
                    placeholder="Enter your full name" 
                    type="text" 
                    value={formData.username}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    placeholder="Enter your email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      name="password"
                      placeholder="Create a password" 
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
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
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      placeholder="Confirm your password" 
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required 
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-pink-500 to-cyan-400 hover:from-pink-600 hover:to-cyan-500 text-white" 
                  size="lg" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing Up...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Gaming Features */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 text-center">
              <div className="text-blue-400 text-2xl mb-2">🎮</div>
              <div className="text-white font-semibold text-sm">Epic Games</div>
              <div className="text-slate-400 text-xs">Access premium content</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 text-center">
              <div className="text-purple-400 text-2xl mb-2">🏆</div>
              <div className="text-white font-semibold text-sm">Leaderboards</div>
              <div className="text-slate-400 text-xs">Compete globally</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 text-center">
              <div className="text-cyan-400 text-2xl mb-2">⚡</div>
              <div className="text-white font-semibold text-sm">Real-time</div>
              <div className="text-slate-400 text-xs">Live multiplayer</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50 text-center">
              <div className="text-pink-400 text-2xl mb-2">🛡️</div>
              <div className="text-white font-semibold text-sm">Secure</div>
              <div className="text-slate-400 text-xs">Protected gaming</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-25px) rotate(7deg); }
          66% { transform: translateY(15px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 7s ease-in-out infinite;
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