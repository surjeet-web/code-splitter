"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Download, Eye, FileCode, RefreshCw, Wand2, Code2, Sparkles, Github, Copy, ArrowLeft } from "lucide-react"
import CodeEditor from "@/components/code-editor"
import { extractCode } from "@/lib/code-extractor"
import LivePreview from "@/components/live-preview"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function CodeSplitter() {
  const [inputCode, setInputCode] = useState("")
  const [htmlCode, setHtmlCode] = useState("")
  const [cssCode, setCssCode] = useState("")
  const [jsCode, setJsCode] = useState("")
  const [reactCode, setReactCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [codeType, setCodeType] = useState("html")
  const [extractOptions, setExtractOptions] = useState({
    convertInlineStyles: true,
    beautifyOutput: true,
    extractReactComponents: false,
  })
  const { toast } = useToast()
  const [showLandingPage, setShowLandingPage] = useState(false)

  if (showLandingPage) {
    window.location.href = "/"
    return null
  }

  const handleExtractCode = async () => {
    if (!inputCode.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some code to extract.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    try {
      const { html, css, js, react } = await extractCode(inputCode, {
        ...extractOptions,
        isReactCode: codeType === "react",
      })

      setHtmlCode(html)
      setCssCode(css)
      setJsCode(js)
      setReactCode(react || "")

      toast({
        title: "Code Extracted Successfully",
        description: "Your code has been separated into clean components.",
      })
    } catch (error) {
      toast({
        title: "Extraction Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setInputCode("")
    setHtmlCode("")
    setCssCode("")
    setJsCode("")
    setReactCode("")
    setShowPreview(false)
    toast({
      title: "Reset Complete",
      description: "All code has been cleared.",
    })
  }

  const handleCopyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: `${type} Copied`,
      description: `${type} code has been copied to clipboard.`,
    })
  }

  const handleDownloadZip = async () => {
    if (!htmlCode && !cssCode && !jsCode && !reactCode) {
      toast({
        title: "Nothing to Download",
        description: "Please extract some code first.",
        variant: "destructive",
      })
      return
    }

    try {
      // Dynamic import JSZip only when needed
      const JSZip = (await import("jszip")).default
      const zip = new JSZip()

      // Add files to the zip
      if (codeType === "react") {
        zip.file("App.jsx", reactCode)
        if (cssCode) zip.file("styles.css", cssCode)
        if (jsCode) zip.file("utils.js", jsCode)
      } else {
        zip.file("index.html", createFullHtml(htmlCode, cssCode, jsCode))
        if (cssCode) zip.file("style.css", cssCode)
        if (jsCode) zip.file("script.js", jsCode)
      }

      // Generate the zip file
      const content = await zip.generateAsync({ type: "blob" })

      // Create a download link and trigger it
      const url = URL.createObjectURL(content)
      const a = document.createElement("a")
      a.href = url
      a.download = "code-splitter-output.zip"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Download Started",
        description: "Your files have been packaged and download has begun.",
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to create zip file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const createFullHtml = (html: string, css: string, js: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Splitter Output</title>
  ${css ? '<link rel="stylesheet" href="style.css">' : ""}
</head>
<body>
${html}
${js ? '<script src="script.js"></script>' : ""}
</body>
</html>`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto p-4 space-y-8">
        <header className="py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowLandingPage(true)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight">CodeSplitter</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.open("https://github.com", "_blank")}>
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <Card className="overflow-hidden border-primary/20 shadow-lg">
            <div className="bg-primary/5 p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Input Code</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={codeType} onValueChange={(value) => setCodeType(value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Code Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="html">HTML/CSS/JS</SelectItem>
                      <SelectItem value="react">React/JSX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <CardContent className="p-0">
              <div className="h-[500px]">
                <CodeEditor
                  value={inputCode}
                  onChange={setInputCode}
                  language={codeType === "react" ? "javascript" : "html"}
                  placeholder={
                    codeType === "react"
                      ? "Paste your React/JSX code here..."
                      : "Paste your mixed HTML, CSS, and JavaScript code here..."
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-primary/20 shadow-lg">
            <div className="bg-primary/5 p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Extraction Options</h2>
                </div>
              </div>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="convert-inline"
                      checked={extractOptions.convertInlineStyles}
                      onCheckedChange={(checked) =>
                        setExtractOptions({ ...extractOptions, convertInlineStyles: checked })
                      }
                    />
                    <Label htmlFor="convert-inline">Convert Inline Styles</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Extract inline styles to CSS classes</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="beautify"
                      checked={extractOptions.beautifyOutput}
                      onCheckedChange={(checked) => setExtractOptions({ ...extractOptions, beautifyOutput: checked })}
                    />
                    <Label htmlFor="beautify">Beautify Output</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Format and indent extracted code</p>
                </div>

                {codeType === "react" && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="extract-components"
                        checked={extractOptions.extractReactComponents}
                        onCheckedChange={(checked) =>
                          setExtractOptions({ ...extractOptions, extractReactComponents: checked })
                        }
                      />
                      <Label htmlFor="extract-components">Extract Components</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Identify and separate React components</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <Button
                  onClick={handleExtractCode}
                  disabled={isProcessing || !inputCode.trim()}
                  className="w-full h-12 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      Extract Code
                    </>
                  )}
                </Button>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setShowPreview(!showPreview)}
                    variant="outline"
                    className="flex-1"
                    disabled={!htmlCode && !cssCode && !jsCode && !reactCode}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {showPreview ? "Hide Preview" : "Live Preview"}
                  </Button>

                  <Button
                    onClick={handleDownloadZip}
                    variant="outline"
                    className="flex-1"
                    disabled={!htmlCode && !cssCode && !jsCode && !reactCode}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download ZIP
                  </Button>

                  <Button onClick={handleReset} variant="ghost" className="flex-1">
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={cn(
            "border rounded-xl overflow-hidden shadow-lg bg-card",
            !htmlCode && !cssCode && !jsCode && !reactCode && "opacity-50",
          )}
        >
          <div className="bg-primary/5 p-4 border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              Extracted Code
            </h2>
          </div>

          {showPreview && (htmlCode || cssCode || jsCode || reactCode) ? (
            <div className="h-[500px] bg-white">
              <LivePreview
                html={htmlCode}
                css={cssCode}
                js={jsCode}
                react={reactCode}
                isReactCode={codeType === "react"}
              />
            </div>
          ) : (
            <Tabs defaultValue={codeType === "react" ? "react" : "html"} className="h-[500px]">
              <TabsList className="grid grid-cols-4 p-0 bg-muted/50">
                <TabsTrigger value="html" disabled={codeType === "react"}>
                  HTML
                </TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="js">JavaScript</TabsTrigger>
                <TabsTrigger value="react" disabled={codeType === "html"}>
                  React
                </TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="h-[calc(100%-40px)] relative">
                {htmlCode && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => handleCopyToClipboard(htmlCode, "HTML")}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                )}
                <div className="border-0 h-full">
                  <CodeEditor
                    value={htmlCode}
                    onChange={setHtmlCode}
                    language="html"
                    placeholder="Extracted HTML will appear here..."
                    readOnly={!htmlCode}
                  />
                </div>
              </TabsContent>

              <TabsContent value="css" className="h-[calc(100%-40px)] relative">
                {cssCode && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => handleCopyToClipboard(cssCode, "CSS")}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                )}
                <div className="border-0 h-full">
                  <CodeEditor
                    value={cssCode}
                    onChange={setCssCode}
                    language="css"
                    placeholder="Extracted CSS will appear here..."
                    readOnly={!cssCode}
                  />
                </div>
              </TabsContent>

              <TabsContent value="js" className="h-[calc(100%-40px)] relative">
                {jsCode && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => handleCopyToClipboard(jsCode, "JavaScript")}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                )}
                <div className="border-0 h-full">
                  <CodeEditor
                    value={jsCode}
                    onChange={setJsCode}
                    language="javascript"
                    placeholder="Extracted JavaScript will appear here..."
                    readOnly={!jsCode}
                  />
                </div>
              </TabsContent>

              <TabsContent value="react" className="h-[calc(100%-40px)] relative">
                {reactCode && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => handleCopyToClipboard(reactCode, "React")}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                )}
                <div className="border-0 h-full">
                  <CodeEditor
                    value={reactCode}
                    onChange={setReactCode}
                    language="javascript"
                    placeholder="Extracted React components will appear here..."
                    readOnly={!reactCode}
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}
        </motion.div>

        <footer className="py-8 text-center">
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Code Splitter - Extract HTML, CSS, JavaScript, and React components from mixed code
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
