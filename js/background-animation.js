// Optimized 3D Background Animation System - Code Elements Only
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section")

  class OptimizedBackground3D {
    constructor() {
      this.elements = []
      this.mouse = { x: 0, y: 0 }
      this.isVisible = true
      this.animationId = null
      this.lastTime = 0
      this.fps = 30 // Reduced FPS for better performance
      this.frameInterval = 1000 / this.fps

      this.init()
    }

    init() {
      this.setupVisibilityAPI()
      this.setupMouseTracking()
      this.createSectionBackgrounds()
      this.addGlobalStyles()
      this.startOptimizedAnimation()
    }

    setupVisibilityAPI() {
      
      document.addEventListener("visibilitychange", () => {
        this.isVisible = !document.hidden
        if (this.isVisible) {
          this.startOptimizedAnimation()
        } else {
          this.stopAnimation()
        }
      })
    }

    setupMouseTracking() {
     
      let mouseTimeout
      document.addEventListener("mousemove", (e) => {
        if (mouseTimeout) return

        mouseTimeout = setTimeout(() => {
          this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
          this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1
          mouseTimeout = null
        }, 16) // ~60fps for mouse tracking
      })
    }

    createSectionBackgrounds() {
      sections.forEach((section, index) => {
        this.createOptimizedSectionBackground(section, index)
      })
    }

    createOptimizedSectionBackground(section, sectionIndex) {
      const bgContainer = document.createElement("div")
      bgContainer.className = `section-3d-bg section-bg-${sectionIndex}`
      bgContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
        will-change: transform;
      `

      if (getComputedStyle(section).position === "static") {
        section.style.position = "relative"
      }

      section.insertBefore(bgContainer, section.firstChild)

      // All sections now use only code blocks
      this.createOptimizedCodeBlocks(bgContainer, this.getCodeBlockCount(sectionIndex))
    }

    getCodeBlockCount(sectionIndex) {
      // Different amounts of code blocks per section
      switch (sectionIndex) {
        case 0: // Introduction
          return 20
        case 1: // About
          return 15
        case 2: // Education
          return 25
        case 3: // Works
          return 18
        case 4: // Contact
          return 13
        default:
          return 16
      }
    }

    createOptimizedCodeBlocks(container, count) {
      const codeSnippets = [
        "{ }",
        "< />",
        "=>",
        "const",
        "class",
        "import",
        "div",
        "doc.",
        "function",
        "return",
        "if",
        "else",
        "for",
        "while",
        "var",
        "let",
        "async",
        "await",
        "try",
        "catch",
        "new",
        "this",
        "null",
        "true",
        "false",
        "&&",
        "||",
        "===",
        "!==",
        "++",
        "--",
        "+=",
        "-=",
        "console.log",
        "document",
        "window",
        "addEventListener",
        "querySelector",
        "getElementById",
        "createElement",
        "appendChild",
        "innerHTML",
        "style",
        "className",
        "onclick",
        "onload",
        "JSON",
        "Array",
        "Object",
        "String",
        "Number",
        "Boolean",
      ]

      for (let i = 0; i < count; i++) {
        const codeBlock = document.createElement("div")
        codeBlock.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        codeBlock.className = "floating-code-3d"

        const x = Math.random() * 100
        const y = Math.random() * 100
        const fontSize = Math.random() * 16 + 12
        const delay = Math.random() * 10
        const duration = Math.random() * 8 + 12

        // Different colors for variety
        const colors = [
          "rgba(6, 182, 212, 0.25)", // Cyan
          "rgba(34, 197, 94, 0.25)", // Green
          "rgba(251, 191, 36, 0.25)", // Yellow
          "rgba(168, 85, 247, 0.25)", // Purple
          "rgba(239, 68, 68, 0.25)", // Red
          "rgba(59, 130, 246, 0.25)", // Blue
        ]

        const color = colors[Math.floor(Math.random() * colors.length)]

        codeBlock.style.cssText = `
          position: absolute;
          left: ${x}%;
          top: ${y}%;
          color: ${color};
          font-family: 'Courier New', monospace;
          font-size: ${fontSize}px;
          font-weight: bold;
          animation: optimizedCodeFloat3D ${duration}s ease-in-out infinite;
          animation-delay: ${delay}s;
          will-change: transform, opacity;
          text-shadow: 0 0 10px ${color.replace("0.25", "0.4")};
          user-select: none;
          pointer-events: none;
        `

        container.appendChild(codeBlock)
        this.elements.push(codeBlock)
      }
    }

    startOptimizedAnimation() {
      if (!this.isVisible) return

      const animate = (currentTime) => {
        if (!this.isVisible) return

        if (currentTime - this.lastTime >= this.frameInterval) {
          // Mouse influence on code blocks
          this.elements.forEach((element, index) => {
            if (element.classList.contains("floating-code-3d") && index % 4 === 0) {
              const mouseInfluence = 0.008 // Subtle mouse influence
              const offsetX = this.mouse.x * mouseInfluence * (index % 2 === 0 ? 1 : -1)
              const offsetY = this.mouse.y * mouseInfluence * (index % 3 === 0 ? 1 : -1)

              element.style.transform += ` translate3d(${offsetX}px, ${offsetY}px, 0)`
            }
          })

          this.lastTime = currentTime
        }

        this.animationId = requestAnimationFrame(animate)
      }

      this.animationId = requestAnimationFrame(animate)
    }

    stopAnimation() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
        this.animationId = null
      }
    }

    addGlobalStyles() {
      const style = document.createElement("style")
      style.textContent = `
        @keyframes optimizedCodeFloat3D {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotateZ(0deg);
            opacity: 0.15;
          }
          25% {
            transform: translate3d(-10px, -15px, 5px) rotateZ(1deg);
            opacity: 0.3;
          }
          50% {
            transform: translate3d(10px, -20px, 8px) rotateZ(3deg);
            opacity: 0.4;
          }
          75% {
            transform: translate3d(-5px, -10px, 3px) rotateZ(-1deg);
            opacity: 0.25;
          }
        }
        
        /* Enhanced code block hover effects */
        .floating-code-3d:hover {
          animation-play-state: paused;
          opacity: 0.6 !important;
          transform: scale(1.1) !important;
          transition: all 0.3s ease;
        }
        
        /* Reduced motion for better performance */
        @media (prefers-reduced-motion: reduce) {
          .section-3d-bg * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .section-3d-bg {
            opacity: 0.6;
          }
          
          .floating-code-3d {
            animation-duration: 20s !important;
            font-size: 10px !important;
          }
        }
        
        @media (max-width: 480px) {
          .section-3d-bg {
            opacity: 0.4;
          }
          
          .floating-code-3d {
            font-size: 8px !important;
          }
        }
      `
      document.head.appendChild(style)
    }

    // Add these methods to the OptimizedBackground3D class
    reduceParticles() {
      // Hide ALL background elements when optimizing
      this.elements.forEach((element) => {
        element.style.display = "none"
      })

      // Stop all animations
      this.stopAnimation()

      console.log("All background particles hidden for optimization")
    }

    restoreParticles() {
      // Show ALL background elements when restoring full experience
      this.elements.forEach((element) => {
        element.style.display = ""
        element.style.animationDuration = ""
        element.style.opacity = ""
      })

      // Restart animations
      this.startOptimizedAnimation()

      console.log("All background particles restored for full experience")
    }

    // Expose the background instance globally
  }

  window.optimizedBackground = new OptimizedBackground3D()

  // Optimized resize handler
  let resizeTimeout
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      document.querySelectorAll(".section-3d-bg").forEach((bg) => bg.remove())
      window.optimizedBackground = new OptimizedBackground3D()
    }, 250)
  })
})
