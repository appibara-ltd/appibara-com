"use client";

import React, { useEffect, useRef } from "react";

const GPU_BUFFER_USAGE_COPY_DST = 0x0008;
const GPU_BUFFER_USAGE_UNIFORM = 0x0040;

interface WebGPUBuffer {
  destroy(): void;
}

type WebGPUShaderModule = object;

type WebGPUBindGroupLayout = object;

interface WebGPURenderPipeline {
  getBindGroupLayout(index: number): WebGPUBindGroupLayout;
}

type WebGPUBindGroup = object;

type WebGPUTextureView = object;

interface WebGPUTexture {
  createView(): WebGPUTextureView;
}

interface WebGPURenderPassEncoder {
  setPipeline(pipeline: WebGPURenderPipeline): void;
  setBindGroup(index: number, bindGroup: WebGPUBindGroup): void;
  draw(vertexCount: number): void;
  end(): void;
}

type WebGPUCommandBuffer = object;

interface WebGPUCommandEncoder {
  beginRenderPass(descriptor: {
    colorAttachments: Array<{
      view: WebGPUTextureView;
      clearValue: { r: number; g: number; b: number; a: number };
      loadOp: "clear" | "load";
      storeOp: "store" | "discard";
    }>;
  }): WebGPURenderPassEncoder;
  finish(): WebGPUCommandBuffer;
}

interface WebGPUQueue {
  writeBuffer(
    buffer: WebGPUBuffer,
    bufferOffset: number,
    data: ArrayBufferView
  ): void;
  submit(commandBuffers: WebGPUCommandBuffer[]): void;
}

interface WebGPUDevice {
  queue: WebGPUQueue;
  createShaderModule(descriptor: { code: string }): WebGPUShaderModule;
  createRenderPipeline(descriptor: {
    layout: "auto";
    vertex: {
      module: WebGPUShaderModule;
      entryPoint: string;
    };
    fragment: {
      module: WebGPUShaderModule;
      entryPoint: string;
      targets: Array<{ format: string }>;
    };
    primitive: {
      topology: "triangle-list";
    };
  }): WebGPURenderPipeline;
  createBuffer(descriptor: { size: number; usage: number }): WebGPUBuffer;
  createBindGroup(descriptor: {
    layout: WebGPUBindGroupLayout;
    entries: Array<{ binding: number; resource: { buffer: WebGPUBuffer } }>;
  }): WebGPUBindGroup;
  createCommandEncoder(): WebGPUCommandEncoder;
  destroy(): void;
}

interface WebGPUAdapter {
  requestDevice(): Promise<WebGPUDevice | null>;
}

interface WebGPUCanvasContext {
  configure(config: {
    device: WebGPUDevice;
    format: string;
    alphaMode: "premultiplied" | "opaque";
    colorSpace?: "srgb" | "display-p3";
  }): void;
  unconfigure(): void;
  getCurrentTexture(): WebGPUTexture;
}

interface WebGPU {
  requestAdapter(): Promise<WebGPUAdapter | null>;
  getPreferredCanvasFormat(): string;
}

// WebGPU WGSL Shader
const WGSL_SHADER = `
struct Uniforms {
  resolution: vec2f,
  dpr: f32,
  progress: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct VertexOutput {
  @builtin(position) position: vec4f,
};

@vertex
fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var pos = array<vec2f, 6>(
    vec2f(-1.0, -1.0),
    vec2f( 1.0, -1.0),
    vec2f(-1.0,  1.0),
    vec2f(-1.0,  1.0),
    vec2f( 1.0, -1.0),
    vec2f( 1.0,  1.0)
  );

  var output: VertexOutput;
  output.position = vec4f(pos[vertexIndex], 0.0, 1.0);
  return output;
}

fn ign(p: vec2f) -> f32 {
  return fract(52.9829189 * fract(dot(p, vec2f(0.06711056, 0.00583715))));
}

fn ignAlt(p: vec2f) -> f32 {
  return fract(57.1394231 * fract(dot(p, vec2f(0.07542137, 0.01134789))));
}

fn triPdf(u: f32) -> f32 {
  if (u < 0.5) {
    return sqrt(max(2.0 * u, 0.0)) - 1.0;
  }
  return 1.0 - sqrt(max(2.0 * (1.0 - u), 0.0));
}

fn rotate2d(v: vec2f, angle: f32) -> vec2f {
  let c = cos(angle);
  let s = sin(angle);
  return vec2f(v.x * c - v.y * s, v.x * s + v.y * c);
}

@fragment
fn fs_main(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {
  let dprSafe = max(uniforms.dpr, 1.0);
  let st = fragCoord.xy / uniforms.resolution;
  let cssSize = uniforms.resolution / dprSafe;
  let cssPos  = fragCoord.xy / dprSafe;

  // Responsive scale synced with Hero breakpoints (matching live appibara.com proportions)
  let tMobile  = clamp((cssSize.x - 320.0) / (768.0 - 320.0), 0.0, 1.0);
  let tDesktop = clamp((cssSize.x - 768.0) / (1440.0 - 768.0), 0.0, 1.0);
  let tWide    = clamp((cssSize.x - 1440.0) / (2200.0 - 1440.0), 0.0, 1.0);
  let sWidth   = 0.34 + 0.34 * tMobile + 0.32 * tDesktop + 0.12 * tWide;
  let sHeight  = clamp(cssSize.y / 700.0, 0.55, 1.15);
  let s        = min(sWidth, sHeight);

  let p = clamp(uniforms.progress, 0.0, 1.0);

  // Diagonal resting placement matching live appibara.com:
  // Orange: higher up (~34% height), slightly left of horizontal center (above/behind "Calm Tech")
  // Blue: lower (~51% height) and further right (beside "Needs" and "Explore Products")
  let targetOrange = vec2f(cssSize.x * 0.5 - 52.0 * s, cssSize.y * 0.34);
  let targetBlue   = vec2f(cssSize.x * 0.5 + min(295.0 * s, cssSize.x * 0.32), cssSize.y * 0.51);

  // Calm entrance choreography from shared Hero midpoint:
  // subtle orbital arc (~27.5 deg -> 0), radial spread (0.22 -> 1.0),
  // gentle scale bloom (0.50 -> 1.0), and serene opacity rise (0.0 -> 1.0)
  let pivot = vec2f(cssSize.x * 0.5, cssSize.y * 0.43);
  let angle = (1.0 - p) * 0.48;
  let spread = mix(0.22, 1.0, p);
  let sizeScale = mix(0.50, 1.0, p);
  let opacityScale = smoothstep(0.0, 0.85, p);

  let centerOrange = pivot + rotate2d(targetOrange - pivot, angle) * spread;
  let centerBlue   = pivot + rotate2d(targetBlue   - pivot, angle) * spread;

  let radiusOrange = vec2f(225.0, 162.0) * s * sizeScale;
  let radiusBlue   = vec2f(210.0, 152.0) * s * sizeScale;

  let dOrange = rotate2d(cssPos - centerOrange, -angle) / radiusOrange;
  let dBlue   = rotate2d(cssPos - centerBlue,   -angle) / radiusBlue;

  var intensityOrange = exp(-dot(dOrange, dOrange) * 0.5) * 0.24 * opacityScale;
  var intensityBlue   = exp(-dot(dBlue,   dBlue)   * 0.5) * 0.20 * opacityScale;

  // Feather only the bottom boundary where #home meets #who-we-are (avoid pinching right-side blue or top orange)
  let bottomFade = smoothstep(0.0, 0.16, 1.0 - st.y);
  intensityOrange *= bottomFade;
  intensityBlue   *= bottomFade;

  let cell = floor(fragCoord.xy / max(uniforms.dpr, 1.0));
  let dO  = triPdf(ign(cell));
  let dB  = triPdf(ign(vec2f(cell.y, cell.x)));
  let dR  = triPdf(ign(vec2f(-cell.x, cell.y)));
  let dG  = triPdf(ign(vec2f(-cell.y, cell.x)));
  let dBl = triPdf(ignAlt(cell));

  let ampI = 2.45 / 255.0;
  let io = clamp(intensityOrange + dO * min(intensityOrange, ampI), 0.0, 1.0);
  let ib = clamp(intensityBlue   + dB * min(intensityBlue,   ampI), 0.0, 1.0);

  let colorOrange = vec3f(0.882, 0.443, 0.030);
  let colorBlue   = vec3f(0.082, 0.365, 0.988);

  let alpha = clamp(io + ib - io * ib, 0.0, 1.0);
  var rgb = colorBlue * ib + colorOrange * io * (1.0 - ib);

  let ampC = 1.4 / 255.0;
  rgb.r += dR  * min(min(rgb.r, alpha - rgb.r), ampC);
  rgb.g += dG  * min(min(rgb.g, alpha - rgb.g), ampC);
  rgb.b += dBl * min(min(rgb.b, alpha - rgb.b), ampC);

  return vec4f(clamp(rgb, vec3f(0.0), vec3f(alpha)), alpha);
}
`;

// WebGL Fallback Shaders (identical math and premultiplied output)
const GLSL_VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const GLSL_FRAGMENT_SHADER = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_dpr;
uniform float u_progress;

float ign(vec2 p) {
  return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
}

float ignAlt(vec2 p) {
  return fract(57.1394231 * fract(dot(p, vec2(0.07542137, 0.01134789))));
}

float triPdf(float u) {
  if (u < 0.5) {
    return sqrt(max(2.0 * u, 0.0)) - 1.0;
  }
  return 1.0 - sqrt(max(2.0 * (1.0 - u), 0.0));
}

vec2 rotate2d(vec2 v, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
}

void main() {
  float dprSafe = max(u_dpr, 1.0);
  vec2 screenCoord = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
  vec2 st = screenCoord / u_resolution;
  vec2 cssSize = u_resolution / dprSafe;
  vec2 cssPos  = screenCoord / dprSafe;

  float tMobile  = clamp((cssSize.x - 320.0) / (768.0 - 320.0), 0.0, 1.0);
  float tDesktop = clamp((cssSize.x - 768.0) / (1440.0 - 768.0), 0.0, 1.0);
  float tWide    = clamp((cssSize.x - 1440.0) / (2200.0 - 1440.0), 0.0, 1.0);
  float sWidth   = 0.34 + 0.34 * tMobile + 0.32 * tDesktop + 0.12 * tWide;
  float sHeight  = clamp(cssSize.y / 700.0, 0.55, 1.15);
  float s        = min(sWidth, sHeight);

  float p = clamp(u_progress, 0.0, 1.0);

  vec2 targetOrange = vec2(cssSize.x * 0.5 - 52.0 * s, cssSize.y * 0.34);
  vec2 targetBlue   = vec2(cssSize.x * 0.5 + min(295.0 * s, cssSize.x * 0.32), cssSize.y * 0.51);

  vec2 pivot = vec2(cssSize.x * 0.5, cssSize.y * 0.43);
  float angle = (1.0 - p) * 0.48;
  float spread = mix(0.22, 1.0, p);
  float sizeScale = mix(0.50, 1.0, p);
  float opacityScale = smoothstep(0.0, 0.85, p);

  vec2 centerOrange = pivot + rotate2d(targetOrange - pivot, angle) * spread;
  vec2 centerBlue   = pivot + rotate2d(targetBlue   - pivot, angle) * spread;

  vec2 radiusOrange = vec2(225.0, 162.0) * s * sizeScale;
  vec2 radiusBlue   = vec2(210.0, 152.0) * s * sizeScale;

  vec2 dOrange = rotate2d(cssPos - centerOrange, -angle) / radiusOrange;
  vec2 dBlue   = rotate2d(cssPos - centerBlue,   -angle) / radiusBlue;

  float intensityOrange = exp(-dot(dOrange, dOrange) * 0.5) * 0.24 * opacityScale;
  float intensityBlue   = exp(-dot(dBlue,   dBlue)   * 0.5) * 0.20 * opacityScale;

  float bottomFade = smoothstep(0.0, 0.16, 1.0 - st.y);
  intensityOrange *= bottomFade;
  intensityBlue   *= bottomFade;

  vec2 cell = floor(screenCoord / max(u_dpr, 1.0));
  float dO  = triPdf(ign(cell));
  float dB  = triPdf(ign(vec2(cell.y, cell.x)));
  float dR  = triPdf(ign(vec2(-cell.x, cell.y)));
  float dG  = triPdf(ign(vec2(-cell.y, cell.x)));
  float dBl = triPdf(ignAlt(cell));

  float ampI = 2.45 / 255.0;
  float io = clamp(intensityOrange + dO * min(intensityOrange, ampI), 0.0, 1.0);
  float ib = clamp(intensityBlue   + dB * min(intensityBlue,   ampI), 0.0, 1.0);

  vec3 colorOrange = vec3(0.882, 0.443, 0.030);
  vec3 colorBlue   = vec3(0.082, 0.365, 0.988);

  float alpha = clamp(io + ib - io * ib, 0.0, 1.0);
  vec3 rgb = colorBlue * ib + colorOrange * io * (1.0 - ib);

  float ampC = 1.4 / 255.0;
  rgb.r += dR  * min(min(rgb.r, alpha - rgb.r), ampC);
  rgb.g += dG  * min(min(rgb.g, alpha - rgb.g), ampC);
  rgb.b += dBl * min(min(rgb.b, alpha - rgb.b), ampC);

  gl_FragColor = vec4(clamp(rgb, vec3(0.0), vec3(alpha)), alpha);
}
`;

export const AmbientGlowCanvas: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ENTRANCE_DURATION_MS = 1800;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let isDisposed = false;
    let resizeObserver: ResizeObserver | null = null;
    let cleanupFn: (() => void) | null = null;
    let rafId: number | null = null;
    let currentProgress = prefersReducedMotion ? 1.0 : 0.0;

    const startCalmEntrance = (draw: () => void) => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      if (prefersReducedMotion) {
        currentProgress = 1.0;
        draw();
        return;
      }

      currentProgress = 0.0;
      draw();
      const startTime = performance.now();

      const step = (now: number) => {
        if (isDisposed) return;
        const t = Math.min((now - startTime) / ENTRANCE_DURATION_MS, 1.0);
        const inv = 1.0 - t;
        currentProgress = 1.0 - inv * inv * inv;
        draw();

        if (t < 1.0) {
          rafId = requestAnimationFrame(step);
        } else {
          currentProgress = 1.0;
          rafId = null;
        }
      };

      rafId = requestAnimationFrame(step);
    };

    // 1. Attempt Native WebGPU (request adapter + device BEFORE claiming canvas context)
    const initWebGPU = async (): Promise<boolean> => {
      if (typeof navigator === "undefined" || !("gpu" in navigator)) {
        return false;
      }

      try {
        const gpu = (navigator as unknown as { gpu: WebGPU }).gpu;
        const adapter = await gpu.requestAdapter();
        if (!adapter || isDisposed) return false;

        const device = await adapter.requestDevice();
        if (!device) return false;
        if (isDisposed) {
          device.destroy();
          return true;
        }

        const context = canvas.getContext("webgpu") as unknown as WebGPUCanvasContext | null;
        if (!context) {
          device.destroy();
          return false;
        }

        const isSafari =
          typeof navigator !== "undefined" &&
          /safari/i.test(navigator.userAgent) &&
          !/chrome|chromium|crios|edg|opr|fxios|android/i.test(navigator.userAgent);

        const syncCanvasSize = () => {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const width = Math.floor(canvas.clientWidth * dpr);
          const height = Math.floor(canvas.clientHeight * dpr);
          if (width === 0 || height === 0) return null;

          let resized = false;
          if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            resized = true;
          }
          return { width, height, dpr, resized };
        };

        syncCanvasSize();

        const preferredFormat = gpu.getPreferredCanvasFormat();
        let format = isSafari ? preferredFormat : "rgba16float";

        const configureContext = () => {
          if (format === "rgba16float") {
            context.configure({
              device,
              format,
              alphaMode: "premultiplied",
              colorSpace: "srgb",
            });
          } else {
            context.configure({
              device,
              format,
              alphaMode: "premultiplied",
            });
          }
        };

        try {
          configureContext();
        } catch {
          format = preferredFormat;
          configureContext();
        }

        const shaderModule = device.createShaderModule({
          code: WGSL_SHADER,
        });

        const pipeline = device.createRenderPipeline({
          layout: "auto",
          vertex: {
            module: shaderModule,
            entryPoint: "vs_main",
          },
          fragment: {
            module: shaderModule,
            entryPoint: "fs_main",
            targets: [{ format }],
          },
          primitive: {
            topology: "triangle-list",
          },
        });

        const uniformBuffer = device.createBuffer({
          size: 16,
          usage: GPU_BUFFER_USAGE_UNIFORM | GPU_BUFFER_USAGE_COPY_DST,
        });

        const bindGroup = device.createBindGroup({
          layout: pipeline.getBindGroupLayout(0),
          entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
        });

        const renderWebGPU = () => {
          if (isDisposed || !canvas) return;
          const size = syncCanvasSize();
          if (!size) return;

          if (size.resized && isSafari) {
            configureContext();
          }

          device.queue.writeBuffer(
            uniformBuffer,
            0,
            new Float32Array([size.width, size.height, size.dpr, currentProgress])
          );

          const commandEncoder = device.createCommandEncoder();
          const textureView = context.getCurrentTexture().createView();
          const passEncoder = commandEncoder.beginRenderPass({
            colorAttachments: [
              {
                view: textureView,
                clearValue: { r: 0, g: 0, b: 0, a: 0 },
                loadOp: "clear",
                storeOp: "store",
              },
            ],
          });
          passEncoder.setPipeline(pipeline);
          passEncoder.setBindGroup(0, bindGroup);
          passEncoder.draw(6);
          passEncoder.end();

          device.queue.submit([commandEncoder.finish()]);
        };

        startCalmEntrance(renderWebGPU);

        resizeObserver = new ResizeObserver(() => {
          renderWebGPU();
        });
        resizeObserver.observe(canvas);

        cleanupFn = () => {
          resizeObserver?.disconnect();
          context.unconfigure();
          uniformBuffer.destroy();
          device.destroy();
        };

        return true;
      } catch {
        return false;
      }
    };

    // 2. Fallback to WebGL (WebGL 2 / WebGL 1)
    const initWebGL = (): boolean => {
      const attrs: WebGLContextAttributes = {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        powerPreference: "high-performance",
      };
      const gl = (canvas.getContext("webgl2", attrs) ||
        canvas.getContext("webgl", attrs)) as WebGLRenderingContext | null;

      if (!gl) return false;

      const createShader = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vertexShader = createShader(gl.VERTEX_SHADER, GLSL_VERTEX_SHADER);
      const fragmentShader = createShader(gl.FRAGMENT_SHADER, GLSL_FRAGMENT_SHADER);
      if (!vertexShader || !fragmentShader) return false;

      const program = gl.createProgram();
      if (!program) return false;

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program);
        return false;
      }

      gl.useProgram(program);

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
      const dprUniformLocation = gl.getUniformLocation(program, "u_dpr");
      const progressUniformLocation = gl.getUniformLocation(program, "u_progress");

      const renderWebGL = () => {
        if (isDisposed || !canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.floor(canvas.clientWidth * dpr);
        const height = Math.floor(canvas.clientHeight * dpr);
        if (width === 0 || height === 0) return;

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        gl.viewport(0, 0, width, height);
        gl.uniform2f(resolutionUniformLocation, width, height);
        gl.uniform1f(dprUniformLocation, dpr);
        gl.uniform1f(progressUniformLocation, currentProgress);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };

      startCalmEntrance(renderWebGL);

      resizeObserver = new ResizeObserver(() => {
        renderWebGL();
      });
      resizeObserver.observe(canvas);

      cleanupFn = () => {
        resizeObserver?.disconnect();
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(positionBuffer);
      };

      return true;
    };

    initWebGPU().then((supported) => {
      if (!supported && !isDisposed) {
        initWebGL();
      }
    });

    return () => {
      isDisposed = true;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (cleanupFn) cleanupFn();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className || "pointer-events-none absolute inset-0 w-full h-full z-0 bg-transparent"}
    />
  );
};
