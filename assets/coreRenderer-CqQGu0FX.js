function w(c){const e=c.getContext("webgl",{alpha:!0,antialias:!0,powerPreference:"low-power"});if(!e)throw new Error("WebGL unavailable");const u=[],g=(t,i)=>{const r=e.createShader(t);if(u.push(r),e.shaderSource(r,i),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw new Error("Shader unavailable");return r},n=e.createProgram();if(e.attachShader(n,g(e.VERTEX_SHADER,`
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
    }`)),e.attachShader(n,g(e.FRAGMENT_SHADER,"precision mediump float; varying vec4 tint; void main(){gl_FragColor=tint;}")),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS))throw new Error("Scene unavailable");e.useProgram(n);const h=[],s=(t,i)=>h.push(...t,...i),S=[.87,.67,.37,.8],a=[[0,1.15,0],[0,-1.15,0],[.66,0,0],[0,0,.66],[-.66,0,0],[0,0,-.66]];for(let t=0;t<4;t++){const i=a[t+2],r=a[(t+1)%4+2];for(let o=0;o<2;o++)[a[o],i,r].forEach(m=>s(m,[.17+t*.045+o*.035,.14+t*.035+o*.025,.09+t*.017,.92]))}const d=h.length/7;for(let t=0;t<4;t++){const i=a[t+2],r=a[(t+1)%4+2];[a[0],i,a[1],i,i,r].forEach(o=>s(o,S))}for(let t=0;t<3;t++){const i=r=>{const o=1.25+t*.23;return[Math.cos(r)*o,Math.sin(r)*o*(t===1?.82:.28),Math.sin(r)*o*(t===1?.3:.85)]};for(let r=0;r<100;r++){const o=t===1?[.45,.65,.63,.4]:[.76,.58,.33,.45];s(i(r*Math.PI/50),o),s(i((r+1)*Math.PI/50),o)}}for(let t=0;t<4;t++){const i=a[t+2].map(o=>o*.75),r=a[(t+1)%4+2].map(o=>o*.75);[i,r].forEach(o=>s(o,[.95,.78,.48,.7]))}const b=h.length/7-d;for(let t=0;t<64;t++){const i=t*2.39996,r=1-t/32,o=Math.sqrt(1-r*r)*1.95;s([Math.cos(i)*o,r*1.95,Math.sin(i)*o],[.83,.69,.45,.55])}const A=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,new Float32Array(h),e.STATIC_DRAW);for(const[t,i,r]of[["position",3,0],["color",4,12]]){const o=e.getAttribLocation(n,t);e.enableVertexAttribArray(o),e.vertexAttribPointer(o,i,e.FLOAT,!1,28,r)}const f=Object.fromEntries(["time","aspect","pointer","spread","mode"].map(t=>[t,e.getUniformLocation(n,t)]));return e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.enable(e.DEPTH_TEST),{draw(t,i,r,o,m){const E=Math.min(window.devicePixelRatio||1,1.5),l=Math.round(c.clientWidth*E),p=Math.round(c.clientHeight*E);!l||!p||((c.width!==l||c.height!==p)&&(c.width=l,c.height=p,e.viewport(0,0,l,p)),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.uniform1f(f.time,t),e.uniform1f(f.aspect,l/p),e.uniform2f(f.pointer,i,r),e.uniform1f(f.spread,o),e.uniform1f(f.mode,m),e.drawArrays(e.TRIANGLES,0,d),e.drawArrays(e.LINES,d,b),e.drawArrays(e.POINTS,d+b,64))},dispose(){e.deleteBuffer(A),e.deleteProgram(n),u.forEach(t=>e.deleteShader(t))}}}export{w as createCoreRenderer};
