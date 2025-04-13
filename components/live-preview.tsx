"use client"

import { useEffect, useRef, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

interface LivePreviewProps {
  html: string
  css: string
  js: string
  react?: string
  isReactCode?: boolean
}

export default function LivePreview({ html, css, js, react, isReactCode = false }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<string>("preview")

  useEffect(() => {
    setIsLoading(true)

    if (!iframeRef.current) return

    const iframe = iframeRef.current
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document

    if (!iframeDoc) return

    try {
      // Create a complete HTML document
      let fullHtml = ""

      if (isReactCode && react) {
        // For React code, we need to include React and ReactDOM
        fullHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>${css}</style>
              <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
              <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
              <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            </head>
            <body>
              <div id="root"></div>
              <script type="text/babel">
                ${react}
                
                // Render the component
                const rootElement = document.getElementById('root');
                const root = ReactDOM.createRoot(rootElement);
                
                // Try to find a component to render
                const componentNames = Object.keys(window).filter(key => 
                  typeof window[key] === 'function' && 
                  /^[A-Z]/.test(key) && 
                  key !== 'React' && 
                  key !== 'ReactDOM'
                );
                
                if (componentNames.length > 0) {
                  const MainComponent = window[componentNames[0]];
                  root.render(React.createElement(MainComponent));
                } else {
                  // Try to find a default export or App component
                  if (typeof App !== 'undefined') {
                    root.render(React.createElement(App));
                  } else {
                    rootElement.innerHTML = '<div style="color: red; padding: 20px;">No React component found to render</div>';
                  }
                }
              </script>
            </body>
          </html>
        `
      } else {
        // Regular HTML/CSS/JS
        fullHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>${css}</style>
            </head>
            <body>
              ${html}
              <script>${js}</script>
            </body>
          </html>
        `
      }

      // Write to the iframe
      iframeDoc.open()
      iframeDoc.write(fullHtml)
      iframeDoc.close()

      // Set loading to false when iframe is loaded
      iframe.onload = () => {
        setIsLoading(false)
      }

      // Fallback in case onload doesn't fire
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error rendering preview:", error)
      setIsLoading(false)
    }
  }, [html, css, js, react, isReactCode])

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b px-4">
          <TabsList className="bg-transparent h-12">
            <TabsTrigger value="preview" className="data-[state=active]:bg-background/50">
              Preview
            </TabsTrigger>
            <TabsTrigger value="console" className="data-[state=active]:bg-background/50">
              Console
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="flex-1 mt-0 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          )}
          <iframe
            ref={iframeRef}
            title="Live Preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        </TabsContent>

        <TabsContent value="console" className="flex-1 mt-0 p-4 bg-muted/30 font-mono text-sm overflow-auto">
          <p className="text-muted-foreground">Console output will appear here when available.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
