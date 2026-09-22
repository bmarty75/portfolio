import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

/**
 * Treillis de nœuds animé : grille distordue par le temps et la souris,
 * sur un dégradé ambiant cyan / émeraude / violet.
 */
const FRAGMENT_SHADER = `precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
varying vec2 v_texCoord;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 mouse = (u_mouse.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    float distToMouse = length(st - mouse);
    vec2 gridSt = st * 6.0;
    gridSt += vec2(sin(u_time * 0.15 + st.y), cos(u_time * 0.12 + st.x)) * 0.15;

    vec2 gId = floor(gridSt);
    vec2 gF = fract(gridSt) - 0.5;
    float d = length(gF);

    float h = hash(gId);
    float pulse = sin(u_time * 2.0 + h * 6.28) * 0.5 + 0.5;

    float nodes = smoothstep(0.08 * pulse, 0.02, d) * (0.25 + 0.75 * smoothstep(1.2, 0.0, distToMouse));

    vec3 colDark = vec3(0.04, 0.06, 0.10);
    vec3 colCyan = vec3(0.02, 0.45, 0.65);
    vec3 colEmerald = vec3(0.06, 0.72, 0.50);
    vec3 colViolet = vec3(0.25, 0.15, 0.45);

    vec3 bgGrad = mix(colDark, colViolet * 0.4, clamp(st.y * 0.5 + 0.5, 0.0, 1.0));
    bgGrad += colCyan * (0.07 / (length(st - vec2(sin(u_time * 0.2) * 0.6, cos(u_time * 0.3) * 0.4)) + 0.4));
    bgGrad += colEmerald * (0.05 / (length(st - vec2(cos(u_time * 0.25) * -0.7, sin(u_time * 0.18) * -0.5)) + 0.5));

    vec3 finalColor = bgGrad + nodes * colCyan * 1.2 + nodes * colEmerald * 0.6;

    float vig = 1.0 - length(st * 0.45);
    finalColor *= clamp(vig, 0.2, 1.0);

    gl_FragColor = vec4(finalColor, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

/** Fond animé WebGL, purement décoratif et non interactif. */
export const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Respect de la préférence système : aucun rendu animé. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gl =
      (canvas.getContext('webgl') as WebGLRenderingContext | null) ??
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) return;

    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);
    syncSize();

    const program = gl.createProgram();
    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!program || !vs || !fs) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.x = ((event.clientX - rect.left) / rect.width) * canvas.width;
      mouse.y = (1 - (event.clientY - rect.top) / rect.height) * canvas.height;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let frame = 0;
    const render = (t: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 h-full w-full pointer-events-none opacity-45" aria-hidden>
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
      {/* Trame de points pour la profondeur */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-25"
        aria-hidden
      />
    </>
  );
};
