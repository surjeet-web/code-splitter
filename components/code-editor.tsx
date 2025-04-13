"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { Skeleton } from "@/components/ui/skeleton"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  placeholder?: string
  readOnly?: boolean
}

export default function CodeEditor({ value, onChange, language, placeholder, readOnly = false }: CodeEditorProps) {
  const [isEditorReady, setIsEditorReady] = useState(false)

  const handleEditorDidMount = () => {
    setIsEditorReady(true)
  }

  return (
    <>
      {!isEditorReady && <Skeleton className="h-full w-full" />}
      <Editor
        height="100%"
        language={language}
        value={value || ""}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          readOnly,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16 },
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
        }}
        loading={<Skeleton className="h-full w-full" />}
        theme="vs-dark"
      />
    </>
  )
}
