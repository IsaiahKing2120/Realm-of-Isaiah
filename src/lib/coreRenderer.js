// A deliberately small WebGL scene: faceted core, three orbital paths, digital dust.
// Geometry stays on the GPU; only rotation, aspect and time change per frame.
export function createCoreRenderer(canvas) {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  if (!gl) throw new Error("WebGL unavailable");
  const shaders = [];
  const compile = (type, source) => {
    const shader = gl.createShader(type);
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw new Error("Shader unavailable");
    return shader;
  };
  const program = gl.createProgram();
  gl.attachShader(
    program,
    compile(
      gl.VERTEX_SHADER,
      `
    attribute vec3 position; attribute vec4 color;
    uniform float time; uniform float aspect; uniform vec2 pointer; uniform float spread; uniform float mode;
    varying vec4 tint;
    void main() {
      float a=time*.12+pointer.x*.28; float b=.32+pointer.y*.2;
      vec3 p=position*(1.+spread*.15);
      p.x*=1.+sin(mode*1.57)*.15;
      p.y*=1.-sin(mode*1.57)*.12;
      p=vec3(p.x*cos(a)+p.z*sin(a),p.y,-p.x*sin(a)+p.z*cos(a));
      p=vec3(p.x,p.y*cos(b)-p.z*sin(b),p.y*sin(b)+p.z*cos(b));
      float depth=4.-p.z;
      gl_Position=vec4(p.x*2.6/aspect,p.y*2.6,p.z*.1,depth);
      gl_PointSize=2.+(p.z+2.)*.65;
      vec3 tone=mix(vec3(1.),vec3(.76,1.08,1.05),clamp(mode,0.,1.));
      tone=mix(tone,vec3(1.1,.85,1.02),max(0.,mode-1.));
      tint=vec4(color.rgb*tone*(.78+(p.z+1.5)*.09),color.a);
    }`,
    ),
  );
  gl.attachShader(
    program,
    compile(
      gl.FRAGMENT_SHADER,
      `precision mediump float; varying vec4 tint; void main(){gl_FragColor=tint;}`,
    ),
  );
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error("Scene unavailable");
  gl.useProgram(program);
  const data = [];
  const vertex = (p, color) => data.push(...p, ...color);
  const gold = [0.87, 0.67, 0.37, 0.8];
  const tips = [
    [0, 1.15, 0],
    [0, -1.15, 0],
    [0.66, 0, 0],
    [0, 0, 0.66],
    [-0.66, 0, 0],
    [0, 0, -0.66],
  ];
  for (let i = 0; i < 4; i++) {
    const a = tips[i + 2],
      b = tips[((i + 1) % 4) + 2];
    for (let j = 0; j < 2; j++)
      [tips[j], a, b].forEach((p) =>
        vertex(p, [
          0.17 + i * 0.045 + j * 0.035,
          0.14 + i * 0.035 + j * 0.025,
          0.09 + i * 0.017,
          0.92,
        ]),
      );
  }
  const triangles = data.length / 7;
  for (let i = 0; i < 4; i++) {
    const a = tips[i + 2],
      b = tips[((i + 1) % 4) + 2];
    [tips[0], a, tips[1], a, a, b].forEach((p) => vertex(p, gold));
  }
  for (let ring = 0; ring < 3; ring++) {
    const point = (a) => {
      const r = 1.25 + ring * 0.23;
      return [
        Math.cos(a) * r,
        Math.sin(a) * r * (ring === 1 ? 0.82 : 0.28),
        Math.sin(a) * r * (ring === 1 ? 0.3 : 0.85),
      ];
    };
    for (let i = 0; i < 100; i++) {
      const color =
        ring === 1 ? [0.45, 0.65, 0.63, 0.4] : [0.76, 0.58, 0.33, 0.45];
      vertex(point((i * Math.PI) / 50), color);
      vertex(point(((i + 1) * Math.PI) / 50), color);
    }
  }
  // Fine nested ribs make the artifact legible from more than one angle.
  for (let i = 0; i < 4; i++) {
    const a = tips[i + 2].map((n) => n * 0.75),
      b = tips[((i + 1) % 4) + 2].map((n) => n * 0.75);
    [a, b].forEach((p) => vertex(p, [0.95, 0.78, 0.48, 0.7]));
  }
  const lines = data.length / 7 - triangles;
  for (let i = 0; i < 64; i++) {
    const a = i * 2.39996,
      y = 1 - i / 32,
      r = Math.sqrt(1 - y * y) * 1.95;
    vertex(
      [Math.cos(a) * r, y * 1.95, Math.sin(a) * r],
      [0.83, 0.69, 0.45, 0.55],
    );
  }
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  for (const [name, size, offset] of [
    ["position", 3, 0],
    ["color", 4, 12],
  ]) {
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 28, offset);
  }
  const uniforms = Object.fromEntries(
    ["time", "aspect", "pointer", "spread", "mode"].map((name) => [
      name,
      gl.getUniformLocation(program, name),
    ]),
  );
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.DEPTH_TEST);
  return {
    draw(time, x, y, spread, mode) {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.round(canvas.clientWidth * ratio),
        height = Math.round(canvas.clientHeight * ratio);
      if (!width || !height) return;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.uniform1f(uniforms.time, time);
      gl.uniform1f(uniforms.aspect, width / height);
      gl.uniform2f(uniforms.pointer, x, y);
      gl.uniform1f(uniforms.spread, spread);
      gl.uniform1f(uniforms.mode, mode);
      gl.drawArrays(gl.TRIANGLES, 0, triangles);
      gl.drawArrays(gl.LINES, triangles, lines);
      gl.drawArrays(gl.POINTS, triangles + lines, 64);
    },
    dispose() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      shaders.forEach((shader) => gl.deleteShader(shader));
    },
  };
}
