import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Sabian - Gaming Backend Platform",
  description: "The ultimate backend-as-a-service platform tailored for mobile game developers",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <head>
        <style>{`
html {
  font-family: ${jetBrainsMono.style.fontFamily};
  --font-sans: ${jetBrainsMono.variable};
  --font-heading: ${spaceGrotesk.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}