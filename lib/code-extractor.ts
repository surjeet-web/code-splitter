import DOMPurify from "dompurify"

interface ExtractedCode {
  html: string
  css: string
  js: string
  react?: string
}

interface ExtractionOptions {
  convertInlineStyles: boolean
  beautifyOutput: boolean
  extractReactComponents: boolean
  isReactCode?: boolean
}

export async function extractCode(
  mixedCode: string,
  options: ExtractionOptions = {
    convertInlineStyles: true,
    beautifyOutput: true,
    extractReactComponents: false,
    isReactCode: false,
  },
): Promise<ExtractedCode> {
  // If it's React code, handle it differently
  if (options.isReactCode) {
    return extractReactCode(mixedCode, options)
  }

  // Create a DOM parser to work with the code
  const parser = new DOMParser()
  const doc = parser.parseFromString(mixedCode, "text/html")

  // Extract CSS from <style> tags
  let css = ""
  const styleElements = doc.querySelectorAll("style")
  styleElements.forEach((style) => {
    css += style.textContent + "\n\n"
    style.remove() // Remove the style tag from the document
  })

  // Extract CSS from inline styles
  if (options.convertInlineStyles) {
    const elementsWithStyle = doc.querySelectorAll("[style]")
    if (elementsWithStyle.length > 0) {
      css += "/* Extracted inline styles */\n"
      elementsWithStyle.forEach((el, index) => {
        const className = `extracted-style-${index}`
        css += `.${className} {\n  ${el.getAttribute("style")}\n}\n\n`
        el.classList.add(className)
        el.removeAttribute("style")
      })
    }
  }

  // Extract JavaScript from <script> tags
  let js = ""
  const scriptElements = doc.querySelectorAll("script")
  scriptElements.forEach((script) => {
    // Skip external scripts
    if (!script.src) {
      js += script.textContent + "\n\n"
    }
    script.remove() // Remove the script tag from the document
  })

  // Extract inline JavaScript (event handlers)
  const allElements = doc.querySelectorAll("*")
  const inlineJsMap = new Map()

  allElements.forEach((el, index) => {
    const attributes = Array.from(el.attributes)
    const inlineHandlers = attributes.filter(
      (attr) => attr.name.startsWith("on") && attr.name !== "onselectstart" && attr.name !== "oncontextmenu",
    )

    if (inlineHandlers.length > 0) {
      const elementId = el.id || `element-${index}`
      if (!el.id) {
        el.id = elementId
      }

      inlineHandlers.forEach((handler) => {
        const eventType = handler.name.substring(2) // Remove "on" prefix
        const handlerCode = handler.value

        // Add to JavaScript with addEventListener
        inlineJsMap.set(
          `${elementId}-${eventType}`,
          `// Extracted from inline ${handler.name} handler
document.getElementById("${elementId}").addEventListener("${eventType}", function() {
  ${handlerCode}
});\n\n`,
        )

        // Remove the inline handler
        el.removeAttribute(handler.name)
      })
    }
  })

  // Add all inline handlers to the JavaScript
  if (inlineJsMap.size > 0) {
    js += "/* Extracted inline event handlers */\n"
    js += "document.addEventListener('DOMContentLoaded', function() {\n"
    inlineJsMap.forEach((handlerCode) => {
      js += handlerCode
    })
    js += "});\n"
  }

  // Get the cleaned HTML
  const html = doc.documentElement.innerHTML

  // Sanitize the HTML to prevent XSS
  const sanitizedHtml = DOMPurify.sanitize(html, {
    FORBID_TAGS: ["style", "script"],
    FORBID_ATTR: ["style", "onerror", "onload", "onclick", "onmouseover"],
  })

  // Format the code if requested
  const formattedHtml = options.beautifyOutput ? formatHtml(sanitizedHtml) : sanitizedHtml
  const formattedCss = options.beautifyOutput ? formatCss(css) : css
  const formattedJs = options.beautifyOutput ? formatJs(js) : js

  return {
    html: formattedHtml,
    css: formattedCss,
    js: formattedJs,
  }
}

// Extract React code
async function extractReactCode(reactCode: string, options: ExtractionOptions): Promise<ExtractedCode> {
  let css = ""
  let js = ""
  let react = reactCode

  try {
    // Extract CSS from styled-components or CSS imports
    const cssRegex = /import\s+['"](.+\.css)['"]/g
    const cssImports = [...reactCode.matchAll(cssRegex)]

    if (cssImports.length > 0) {
      css += "/* CSS imports detected */\n"
      cssImports.forEach((match) => {
        css += `/* From: ${match[1]} */\n\n`
      })
    }

    // Extract CSS from template literals (styled-components like)
    const styledComponentsRegex = /const\s+\w+\s*=\s*styled\.\w+`([^`]+)`/g
    const styledComponents = [...reactCode.matchAll(styledComponentsRegex)]

    if (styledComponents.length > 0) {
      css += "/* Extracted from styled-components */\n"
      styledComponents.forEach((match, index) => {
        css += `.styled-component-${index} {\n  ${match[1].replace(/\${[^}]+}/g, "/* dynamic value */")}\n}\n\n`
      })
    }

    // Extract inline styles from objects
    const styleObjectRegex = /style\s*=\s*\{\s*\{([^}]+)\}\s*\}/g
    const styleObjects = [...reactCode.matchAll(styleObjectRegex)]

    if (styleObjects.length > 0) {
      css += "/* Extracted from inline style objects */\n"
      styleObjects.forEach((match, index) => {
        // Convert camelCase to kebab-case
        const styleContent = match[1].replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
        css += `.extracted-style-object-${index} {\n  ${styleContent}\n}\n\n`
      })
    }

    // Extract utility functions and non-component code
    if (options.extractReactComponents) {
      const utilityFunctionRegex = /function\s+(?!([A-Z]\w+))\w+$[^)]*$\s*\{[^}]*\}/g
      const utilityFunctions = [...reactCode.matchAll(utilityFunctionRegex)]

      if (utilityFunctions.length > 0) {
        js += "/* Extracted utility functions */\n"
        utilityFunctions.forEach((match) => {
          js += match[0] + "\n\n"
        })
      }

      // Extract constants and variables
      const constRegex = /const\s+(?!([A-Z]\w+))\w+\s*=\s*[^;]+;/g
      const constants = [...reactCode.matchAll(constRegex)]

      if (constants.length > 0) {
        js += "/* Extracted constants and variables */\n"
        constants.forEach((match) => {
          js += match[0] + "\n"
        })
      }
    }

    // Format the React code
    if (options.beautifyOutput) {
      react = formatJs(reactCode)
    }

    return {
      html: "", // React doesn't have separate HTML
      css: css,
      js: js,
      react: react,
    }
  } catch (error) {
    console.error("Error extracting React code:", error)
    return {
      html: "",
      css: "",
      js: "",
      react: reactCode,
    }
  }
}

// Basic HTML formatter
function formatHtml(html: string): string {
  // This is a simple formatter. For production, consider using a library like js-beautify
  return html
    .replace(/></g, ">\n<")
    .replace(/(<\/[^>]+>)/g, "$1\n")
    .replace(/(<[^/][^>]*[^/]>)\s*\n/g, "$1\n")
    .replace(/^\s*\n/gm, "")
}

// Basic CSS formatter
function formatCss(css: string): string {
  // This is a simple formatter. For production, consider using a library like js-beautify
  return css
    .replace(/\{/g, " {\n  ")
    .replace(/;/g, ";\n  ")
    .replace(/\}/g, "\n}\n")
    .replace(/\n {2}\n}/g, "\n}")
    .replace(/^\s*\n/gm, "")
}

// Basic JS formatter
function formatJs(js: string): string {
  // This is a simple formatter. For production, consider using a library like js-beautify
  return js
    .replace(/{\s*/g, "{\n  ")
    .replace(/;\s*/g, ";\n  ")
    .replace(/}\s*/g, "}\n")
    .replace(/\n {2}}/g, "\n}")
    .replace(/^\s*\n/gm, "")
}
