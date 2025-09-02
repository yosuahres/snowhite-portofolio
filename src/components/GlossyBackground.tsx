import { useEffect, useRef } from "react";

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const GlossyBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- Foreground canvas ---
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    mount.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- WebGL background ---
    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let timeLoc: WebGLUniformLocation | null = null;
    let webglFrameId: number;
    let webglCanvas: HTMLCanvasElement | null = null;

    function createWebGLBackground() {
      webglCanvas = document.createElement("canvas");
      webglCanvas.width = window.innerWidth;
      webglCanvas.height = window.innerHeight;
      webglCanvas.style.width = "100vw";
      webglCanvas.style.height = "100vh";
      webglCanvas.style.position = "absolute";
      webglCanvas.style.top = "0";
      webglCanvas.style.left = "0";
      webglCanvas.style.zIndex = "0";
      mount.appendChild(webglCanvas);

      gl = webglCanvas.getContext("webgl");
      if (!gl) return;

      const vert = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0, 1);
        }
      `;

      const frag = `
        precision highp float;
        varying vec2 vUv;
        uniform float u_time;
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        void main() {
          float t = u_time * 0.15;
          float n = random(vUv * 800.0 + t);
          float dots = step(0.5, mod(floor(vUv.x*80.0)+floor(vUv.y*80.0),2.0));
          float grain = mix(n, dots, 0.18);
          gl_FragColor = vec4(vec3(grain * 0.2), 1.0);
        }
      `;

      const compile = (src: string, type: number) => {
        const shader = gl!.createShader(type)!;
        gl!.shaderSource(shader, src);
        gl!.compileShader(shader);
        return shader;
      };

      const vs = compile(vert, gl.VERTEX_SHADER);
      const fs = compile(frag, gl.FRAGMENT_SHADER);

      program = gl.createProgram();
      gl.attachShader(program!, vs);
      gl.attachShader(program!, fs);
      gl.linkProgram(program!);
      gl.useProgram(program!);

      const vertices = new Float32Array([
        -1, -1, 1, -1, -1, 1,
        -1, 1, 1, -1, 1, 1,
      ]);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      const posLoc = gl.getAttribLocation(program!, "position");
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      timeLoc = gl.getUniformLocation(program!, "u_time");
    }

    function animateWebGL() {
      if (!gl || !program || !timeLoc) return;
      gl.viewport(0, 0, webglCanvas!.width, webglCanvas!.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLoc, performance.now() / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      webglFrameId = requestAnimationFrame(animateWebGL);
    }

    function resizeWebGL() {
      if (!webglCanvas || !gl) return;
      webglCanvas.width = window.innerWidth;
      webglCanvas.height = window.innerHeight;
      gl.viewport(0, 0, webglCanvas.width, webglCanvas.height);
    }

    createWebGLBackground();
    window.addEventListener("resize", resizeWebGL);
    animateWebGL();

    // --- Cursor glossy trail ---
    let mouseX = 0;
    let mouseY = 0;
    let mousePresent = false;
    const trail: { x: number; y: number; life: number }[] = [];

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mousePresent = true;

      // Add a new trail circle
      trail.push({ x: mouseX, y: mouseY, life: 1 });
    };
    const onMouseLeave = () => (mousePresent = false);
    const onMouseEnter = () => (mousePresent = true);
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        mousePresent = true;
        trail.push({ x: mouseX, y: mouseY, life: 1 });
      }
    };
    const onTouchEnd = () => (mousePresent = false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("touchmove", onTouch);
    window.addEventListener("touchend", onTouchEnd);

    // --- Canvas animate loop ---
    let frameId: number;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw fading trail
      for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        ctx.beginPath();
        ctx.arc(t.x, t.y, 12 * t.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,140,200,${0.6 * t.life})`;
        ctx.shadowColor = "rgba(255,255,255,0.4)";
        ctx.shadowBlur = 20 * t.life;
        ctx.fill();

        // Fade out
        t.life -= 0.02;
      }

      // Remove dead circles
      for (let i = trail.length - 1; i >= 0; i--) {
        if (trail[i].life <= 0) {
          trail.splice(i, 1);
        }
      }

      frameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(webglFrameId);
      window.removeEventListener("resize", resizeWebGL);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      if (mount.contains(canvas)) mount.removeChild(canvas);
      if (webglCanvas && mount.contains(webglCanvas)) mount.removeChild(webglCanvas);
    };
  }, []);

  return (
    <>
      <div
        ref={mountRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -2,
          pointerEvents: "none",
          background: "rgba(0,0,0,0.44)",
          mixBlendMode: "multiply",
        }}
      />
    </>
  );
};

export default GlossyBackground;
