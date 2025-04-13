"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Code2, Github, Menu, X, Sparkles, FileCode, Eye, Download, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import CodeSplitter from "@/components/code-splitter"

export default function LandingPage() {
  const [showApp, setShowApp] = useState(false)

  if (showApp) {
    return <CodeSplitter />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/90">
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CodeSplitter</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowApp(true)} className="hidden md:flex">
              Try It Now
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-8">
                  <Link href="#features" className="text-lg font-medium hover:text-primary">
                    Features
                  </Link>
                  <Link href="#how-it-works" className="text-lg font-medium hover:text-primary">
                    How It Works
                  </Link>
                  <Link href="#testimonials" className="text-lg font-medium hover:text-primary">
                    Testimonials
                  </Link>
                  <Link href="#pricing" className="text-lg font-medium hover:text-primary">
                    Pricing
                  </Link>
                  <Button onClick={() => setShowApp(true)} className="mt-4">
                    Try It Now
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center space-y-4"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                  <Sparkles className="mr-1 h-3 w-3 text-primary" />
                  <span>Introducing Code Splitter</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Transform Messy Code into{" "}
                  <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    Clean Components
                  </span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Automatically separate HTML, CSS, JavaScript, and React code into clean, modular files with our
                  intelligent code extraction engine.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button onClick={() => setShowApp(true)} size="lg" className="h-12 px-8">
                  Try It Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="h-12 px-8">
                    How It Works
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No signup required</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Open source</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[600px] overflow-hidden rounded-xl border bg-background/50 shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-12 bg-muted/50 flex items-center px-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                </div>
                <div className="pt-12 p-4">
                  <pre className="text-xs md:text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .btn {
      background: #7c3aed;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello World</h1>
    <button class="btn" onclick="alert('Hello!')">
      Click Me
    </button>
  </div>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Page loaded!');
    });
  </script>
</body>
</html>`}
                    </code>
                  </pre>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Button size="sm" variant="secondary" onClick={() => setShowApp(true)}>
                    Extract Now
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                <Sparkles className="mr-1 h-3 w-3 text-primary" />
                <span>Powerful Features</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything You Need to Clean Up Your Code
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our intelligent code extraction engine handles the complexity, so you can focus on building great
                applications.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm"
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <FileCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Smart Parsing</h3>
              <p className="text-center text-muted-foreground">
                Intelligently extracts and separates code components while preserving structure and formatting.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm"
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">React Support</h3>
              <p className="text-center text-muted-foreground">
                Extract components, styles, and logic from React and JSX code with component detection.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm"
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Live Preview</h3>
              <p className="text-center text-muted-foreground">
                Instantly see how your extracted code renders in a secure sandbox environment.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm"
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Export Options</h3>
              <p className="text-center text-muted-foreground">
                Download your extracted code as individual files or as a complete project ZIP.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm"
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 2H2v10h10V2z" />
                  <path d="M12 12H2v10h10V12z" />
                  <path d="M22 2h-10v20h10V2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Framework Detection</h3>
              <p className="text-center text-muted-foreground">
                Automatically detects and handles code from popular frameworks like React, Angular, and Vue.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm"
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Code Beautification</h3>
              <p className="text-center text-muted-foreground">
                Format and indent your code for improved readability and maintainability.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                <Sparkles className="mr-1 h-3 w-3 text-primary" />
                <span>Simple Process</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Transform your messy code into clean, modular components in just a few simple steps.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center space-y-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                1
              </div>
              <div className="absolute top-6 left-full h-0.5 w-full bg-primary hidden md:block" />
              <h3 className="text-xl font-bold">Paste Your Code</h3>
              <p className="text-center text-muted-foreground">
                Paste your mixed HTML, CSS, JavaScript, or React code into the editor.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center space-y-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                2
              </div>
              <div className="absolute top-6 left-full h-0.5 w-full bg-primary hidden md:block" />
              <h3 className="text-xl font-bold">Extract Components</h3>
              <p className="text-center text-muted-foreground">
                Our intelligent engine separates your code into clean, modular components.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold">Download & Use</h3>
              <p className="text-center text-muted-foreground">
                Preview your code, make adjustments if needed, and download the clean files.
              </p>
            </motion.div>
          </div>
          <div className="flex justify-center">
            <Button onClick={() => setShowApp(true)} size="lg" className="h-12 px-8">
              Try It Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                <Sparkles className="mr-1 h-3 w-3 text-primary" />
                <span>Testimonials</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Loved by Developers Worldwide
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our users are saying about how CodeSplitter has transformed their workflow.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-500"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "CodeSplitter saved me hours of manual work. I had a massive HTML file with inline styles and scripts
                  that needed to be separated. This tool did it in seconds!"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-muted p-1">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    JS
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Jamie Smith</h4>
                  <p className="text-sm text-muted-foreground">Frontend Developer</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-500"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "The React component extraction feature is a game-changer. It helped me refactor a complex codebase by
                  identifying reusable components I hadn't even noticed."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-muted p-1">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    AT
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Alex Thompson</h4>
                  <p className="text-sm text-muted-foreground">Senior React Developer</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-500"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "I use CodeSplitter in my web development course to teach students about separation of concerns. It's
                  an excellent educational tool that visualizes best practices."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-muted p-1">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    MJ
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Maria Johnson</h4>
                  <p className="text-sm text-muted-foreground">Web Development Instructor</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                <Sparkles className="mr-1 h-3 w-3 text-primary" />
                <span>Pricing</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that's right for you and start cleaning up your code today.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col rounded-lg border bg-background p-6 shadow-sm"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="text-muted-foreground">Perfect for occasional use and learning.</p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$0</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Basic code extraction</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>HTML, CSS, JS separation</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Live preview</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <X className="mr-2 h-4 w-4" />
                  <span>React component extraction</span>
                </li>
                <li className="flex items-center text-muted-foreground">
                  <X className="mr-2 h-4 w-4" />
                  <span>Advanced formatting options</span>
                </li>
              </ul>
              <Button onClick={() => setShowApp(true)} className="mt-8">
                Get Started
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col rounded-lg border bg-background p-6 shadow-sm relative"
            >
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <div className="bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-full">
                  Most Popular
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-muted-foreground">For professional developers and small teams.</p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$9</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>React component extraction</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Advanced formatting options</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Save and share extractions</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Button onClick={() => setShowApp(true)} className="mt-8" variant="default">
                Start Free Trial
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col rounded-lg border bg-background p-6 shadow-sm"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <p className="text-muted-foreground">For organizations with advanced needs.</p>
              </div>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$29</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Team collaboration</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>API access</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Dedicated support</span>
                </li>
              </ul>
              <Button onClick={() => setShowApp(true)} className="mt-8" variant="outline">
                Contact Sales
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Clean Up Your Code?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of developers who are using CodeSplitter to improve their workflow.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              <Button onClick={() => setShowApp(true)} size="lg" className="h-12 px-8">
                Try It Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8">
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t bg-muted/30">
        <div className="container flex flex-col gap-6 py-12 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex flex-col gap-6 md:w-1/3">
            <div className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CodeSplitter</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transform messy code into clean, modular components with our intelligent code extraction engine.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-12">
            <div className="space-y-3">
              <h4 className="text-base font-medium">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-medium">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CodeSplitter. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
