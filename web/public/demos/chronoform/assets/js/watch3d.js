/* Chronoform: native WebGL geometry, local face textures, on-demand rendering. */
(() => {
  'use strict';
  const TAU = Math.PI * 2;
  const identity = () => [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
  function multiply(a, b) {
    const out = Array(16).fill(0);
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) out[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
    return out;
  }
  function transform(x=0, y=0, z=0, sx=1, sy=1, sz=1, rx=0, ry=0, rz=0) {
    const cx=Math.cos(rx), ax=Math.sin(rx), cy=Math.cos(ry), ay=Math.sin(ry), cz=Math.cos(rz), az=Math.sin(rz);
    const X=[1,0,0,0, 0,cx,ax,0, 0,-ax,cx,0, 0,0,0,1];
    const Y=[cy,0,-ay,0, 0,1,0,0, ay,0,cy,0, 0,0,0,1];
    const Z=[cz,az,0,0, -az,cz,0,0, 0,0,1,0, 0,0,0,1];
    const S=[sx,0,0,0, 0,sy,0,0, 0,0,sz,0, 0,0,0,1];
    const T=identity();T[12]=x;T[13]=y;T[14]=z;
    return multiply(T,multiply(Z,multiply(Y,multiply(X,S))));
  }
  function perspective(aspect) {
    const f=1/Math.tan(35*Math.PI/360), near=.1, far=30;
    return [f/aspect,0,0,0, 0,f,0,0, 0,0,(far+near)/(near-far),-1, 0,0,2*far*near/(near-far),0];
  }
  function cylinder(segments=100) {
    const vertices=[];
    const vertex=(x,y,z,nx,ny,nz,u,v)=>vertices.push(x,y,z,nx,ny,nz,u,v);
    for(let i=0;i<segments;i++) {
      const a=i/segments*TAU, b=(i+1)/segments*TAU;
      const ca=Math.cos(a), sa=Math.sin(a), cb=Math.cos(b), sb=Math.sin(b);
      for(const q of [[ca,sa,-.5,ca,sa,0,0,0],[cb,sb,-.5,cb,sb,0,1,0],[cb,sb,.5,cb,sb,0,1,1],[ca,sa,-.5,ca,sa,0,0,0],[cb,sb,.5,cb,sb,0,1,1],[ca,sa,.5,ca,sa,0,0,1]]) vertex(...q);
      for(const sign of [-1,1]) {
        const p=sign===1?[[0,0],[ca,sa],[cb,sb]]:[[0,0],[cb,sb],[ca,sa]];
        p.forEach(([x,y])=>vertex(x,y,sign*.5,0,0,sign,x*.5+.5,y*.5+.5));
      }
    }
    return vertices;
  }
  function torus(r=1, tube=.03, segments=100, sides=10) {
    const out=[];
    function point(a,b) {const c=Math.cos(a),s=Math.sin(a),d=Math.cos(b),e=Math.sin(b);return [(r+tube*d)*c,(r+tube*d)*s,tube*e,c*d,s*d,e,a/TAU,b/TAU];}
    for(let i=0;i<segments;i++) for(let j=0;j<sides;j++) {
      const a=i/segments*TAU,b=(i+1)/segments*TAU,c=j/sides*TAU,d=(j+1)/sides*TAU;
      for(const v of [point(a,c),point(b,c),point(b,d),point(a,c),point(b,d),point(a,d)]) out.push(...v);
    }
    return out;
  }
  function box() {
    const out=[];
    const faces=[[[1,0,0],[[.5,-.5,-.5],[.5,.5,-.5],[.5,.5,.5],[.5,-.5,.5]]],[[-1,0,0],[[-.5,-.5,.5],[-.5,.5,.5],[-.5,.5,-.5],[-.5,-.5,-.5]]],[[0,1,0],[[-.5,.5,-.5],[-.5,.5,.5],[.5,.5,.5],[.5,.5,-.5]]],[[0,-1,0],[[-.5,-.5,.5],[-.5,-.5,-.5],[.5,-.5,-.5],[.5,-.5,.5]]],[[0,0,1],[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]]],[[0,0,-1],[[.5,-.5,-.5],[-.5,-.5,-.5],[-.5,.5,-.5],[.5,.5,-.5]]]];
    faces.forEach(([normal,points])=>[0,1,2,0,2,3].forEach(i=>out.push(...points[i],...normal,i===1||i===2?1:0,i>=2?1:0)));
    return out;
  }
  function lug() {
    const out=[];
    const point=(t,a)=>{const x=.68-.2*t,y=.77+.5*t,z=.075-.22*t*t;const width=.085*(1-.3*t),depth=.065;const cx=.928*Math.cos(a),cy=.371*Math.cos(a),cz=Math.sin(a);return [x+width*cx,y+width*cy,z+depth*cz,cx,cy,cz,t,a/TAU];};
    for(let i=0;i<22;i++)for(let j=0;j<14;j++){const a=j/14*TAU,b=(j+1)/14*TAU,t=i/22,u=(i+1)/22;for(const v of [point(t,a),point(u,a),point(u,b),point(t,a),point(u,b),point(t,b)])out.push(...v);}
    return out;
  }
  function crown() {
    const out=[],profile=[[-.18,.09],[-.1,.11],[-.065,.145],[0,.168],[.06,.148],[.1,.105],[.125,.055],[.126,0]];
    const point=(k,a)=>{const [z,r]=profile[k],flute=1+.045*Math.cos(a*32);const previous=profile[Math.max(0,k-1)],next=profile[Math.min(profile.length-1,k+1)];const slope=(next[1]-previous[1])/Math.max(.001,next[0]-previous[0]);return [r*flute*Math.cos(a),r*flute*Math.sin(a),z,Math.cos(a),Math.sin(a),-slope,a/TAU,k/profile.length];};
    for(let k=0;k<profile.length-1;k++)for(let j=0;j<96;j++){const a=j/96*TAU,b=(j+1)/96*TAU;for(const v of [point(k,a),point(k+1,a),point(k+1,b),point(k,a),point(k+1,b),point(k,b)])out.push(...v);}
    return out;
  }
  const VERTEX=`
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aUV;
    uniform mat4 uModel;
    uniform mat4 uProjection;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUV;
    void main() {
      vec4 world=uModel*vec4(aPosition,1.0);
      vPosition=world.xyz;
      vNormal=normalize(mat3(uModel)*aNormal);
      vUV=aUV;
      world.z-=6.2;
      gl_Position=uProjection*world;
    }`;
  const FRAGMENT=`
    precision mediump float;
    uniform vec3 uColour;
    uniform float uMaterial;
    uniform sampler2D uTexture;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUV;
    void main() {
      vec3 n=normalize(vNormal);
      vec3 light=normalize(vec3(-2.5,3.4,5.0)-vPosition);
      vec3 eye=normalize(vec3(0.0,0.0,6.2)-vPosition);
      float diffuse=max(dot(n,light),0.0);
      float highlight=pow(max(dot(n,normalize(light+eye)),0.0),58.0);
      float rim=pow(1.0-max(dot(n,eye),0.0),3.0);
      vec3 colour;
      if(uMaterial>1.5) {
        colour=texture2D(uTexture,vec2(vUV.x,1.0-vUV.y)).rgb*(.88+.12*diffuse)+vec3(highlight*.13);
      } else if(uMaterial>.5) {
        float grain=fract(sin(dot(vPosition.xy,vec2(117.3,53.8)))*42315.4);
        float bands=.94+.06*sin(vPosition.y*105.0)*sin(vPosition.x*135.0);
        colour=uColour*(.55+.5*diffuse)*bands+vec3(grain*.016)+vec3(highlight*.025);
      } else {
        float stripe=.5+.5*sin(atan(n.y,n.x)*28.0+n.z*14.0);
        float reflection=.5+.5*pow(abs(n.y*.66+n.x*.26+n.z*.18),2.0);
        colour=uColour*(.28+.5*diffuse+.3*reflection)+vec3(highlight*.9+rim*.24+stripe*.035);
      }
      gl_FragColor=vec4(colour,1.0);
    }`;
  class Watch3D {
    constructor(host, model) {
      this.host=host; this.model=model; this.angle={x:-.25,y:-.38,z:-.26}; this.rotationFrame=0; this.enabled=false;
      host.watchController=this;
      this.canvas=document.createElement('canvas'); this.canvas.className='watch-canvas'; this.canvas.setAttribute('aria-hidden','true');
      this.canvas.setAttribute('width','900'); this.canvas.setAttribute('height','900'); host.append(this.canvas);
      try {
        const gl=this.canvas.getContext('webgl',{alpha:true,antialias:true,preserveDrawingBuffer:true});
        if(!gl) throw new Error('WebGL unavailable'); this.gl=gl;
        const compile=(type,source)=>{const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(shader));return shader;};
        this.program=gl.createProgram(); gl.attachShader(this.program,compile(gl.VERTEX_SHADER,VERTEX));gl.attachShader(this.program,compile(gl.FRAGMENT_SHADER,FRAGMENT));gl.linkProgram(this.program);
        if(!gl.getProgramParameter(this.program,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(this.program));
        gl.useProgram(this.program);
        this.uniforms={}; ['uModel','uProjection','uColour','uMaterial','uTexture'].forEach(name=>this.uniforms[name]=gl.getUniformLocation(this.program,name));
        this.attributes=['aPosition','aNormal','aUV'].map(name=>gl.getAttribLocation(this.program,name));
        this.meshes={};
        for(const [name,data] of Object.entries({cylinder:cylinder(),box:box(),lug:lug(),crown:crown(),rim:torus(1.015,.035),ridge:torus(1.05,.018),backRim:torus(.92,.025)})) {
          const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);this.meshes[name]={buffer,count:data.length/8};
        }
        this.textures={}; this.enabled=true;
        gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.clearColor(0,0,0,0);
        this.setModel(model); this.resize(); this.host.dataset.renderer='webgl';
        this.canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();this.fallback();});
        this.canvas.addEventListener('webglcontextrestored',()=>location.reload());
      } catch { this.fallback(); }
      this.bindDrag();
      this.observer=typeof ResizeObserver==='function'?new ResizeObserver(()=>this.resize()):null;
      if(this.observer)this.observer.observe(host);
    }
    fallback() { this.enabled=false; this.canvas.hidden=true; this.host.classList.remove('has-webgl');this.host.dataset.renderer='svg'; }
    loadTexture(url) {
      if(this.textures[url])return this.textures[url];
      const gl=this.gl,texture=gl.createTexture();this.textures[url]=texture;
      gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([30,38,44,255]));
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      const image=new Image(); image.onload=()=>{try{gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);this.host.classList.add('has-webgl');this.draw();}catch{this.fallback();}};image.onerror=()=>this.fallback();image.src=url;
      return texture;
    }
    setModel(model) {
      this.model=model;
      const snapshot=this.host.querySelector('.watch-snapshot');if(snapshot)snapshot.src=`assets/img/render-${model.id}.webp`;
      this.host.querySelectorAll('[data-dial]').forEach(image=>image.setAttribute('href',model.face));
      this.host.querySelectorAll('[data-strap]').forEach(shape=>shape.setAttribute('fill',model.strap==='brown'?'#42261d':model.strap==='blue'?'#111d34':'#16171a'));
      this.host.querySelectorAll('[data-case]').forEach(shape=>shape.setAttribute('fill',model.case==='gold'?'#c98e65':model.case==='black'?'#55545b':'url(#fallback-steel)'));
      if(this.enabled) {this.frontTexture=this.loadTexture(model.face);this.backTexture=this.loadTexture('assets/img/jupiter.webp');this.draw();}
    }
    resize() {
      if(!this.enabled)return;
      const box=this.host.getBoundingClientRect(); if(box.width<1||box.height<1)return;
      const ratio=Math.min(devicePixelRatio||1,1.7);
      this.canvas.width=Math.round(box.width*ratio);this.canvas.height=Math.round(box.height*ratio);
      this.gl.viewport(0,0,this.canvas.width,this.canvas.height);this.draw();
    }
    drawPart(meshName,matrix,colour,material=0,texture=null) {
      const gl=this.gl,mesh=this.meshes[meshName];gl.bindBuffer(gl.ARRAY_BUFFER,mesh.buffer);
      this.attributes.forEach((location,i)=>{gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,i===2?2:3,gl.FLOAT,false,32,i===0?0:i===1?12:24);});
      gl.uniformMatrix4fv(this.uniforms.uModel,false,new Float32Array(multiply(this.global,matrix)));
      gl.uniform3fv(this.uniforms.uColour,colour);gl.uniform1f(this.uniforms.uMaterial,material);
      if(texture){gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);gl.uniform1i(this.uniforms.uTexture,0);}
      gl.drawArrays(gl.TRIANGLES,0,mesh.count);
    }
    draw() {
      this.host.dataset.angle=this.angle.y.toFixed(3);
      if(!this.enabled) {
        const svg=this.host.querySelector('.watch-snapshot')||this.host.querySelector('.watch-fallback');
        if(svg)svg.style.transform=`rotateX(${this.angle.x*.3}rad) rotateY(${Math.sin(this.angle.y)*.6}rad) rotateZ(${this.angle.z}rad)`;
        return;
      }
      const gl=this.gl;gl.useProgram(this.program);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      gl.uniformMatrix4fv(this.uniforms.uProjection,false,new Float32Array(perspective(this.canvas.width/this.canvas.height)));
      this.global=transform(0,0,0,1,1,1,this.angle.x,this.angle.y,this.angle.z);
      const steel=this.model.case==='gold'?[.78,.48,.27]:this.model.case==='black'?[.13,.14,.16]:[.67,.71,.76];
      const strap=this.model.strap==='brown'?[.19,.073,.032]:this.model.strap==='blue'?[.025,.049,.095]:[.026,.029,.033];
      // Segmented straps curve behind the case; each segment has real thickness.
      for(const sign of [-1,1])for(let i=0;i<9;i++) {
        const y=sign*(.95+i*.078),z=-.12-Math.pow(i/9,1.4)*.18;
        this.drawPart('box',transform(0,y,z,.78-i*.012,.086,.09,sign*i*.015),strap,1);
        for(const x of [-.3,.3])this.drawPart('box',transform(x,y,z+.05,.008,.027,.009),[.31,.28,.24],1);
      }
      for(const x of [-1,1])for(const y of [-1,1])this.drawPart('lug',transform(0,0,0,x,y,1),steel);
      this.drawPart('cylinder',transform(0,0,0,1.055,1.055,.35),steel);
      this.drawPart('ridge',transform(0,0,.1),steel);this.drawPart('ridge',transform(0,0,.14),steel);this.drawPart('rim',transform(0,0,.195),steel);
      this.drawPart('cylinder',transform(0,0,.19,.965,.965,.014),[1,1,1],2,this.frontTexture);
      this.drawPart('cylinder',transform(0,0,-.183,.895,.895,.012,0,Math.PI),[1,1,1],2,this.backTexture);
      this.drawPart('backRim',transform(0,0,-.192),steel);
      this.drawPart('crown',transform(1.23,0,0,1,1,1,0,Math.PI/2),steel);
      if(this.model.family==='Chronograph')for(const y of [-.42,.42])this.drawPart('cylinder',transform(1.04,y,-.04,.083,.083,.21,0,Math.PI/2),steel);
    }
    bindDrag() {
      let pointer=null;
      this.host.addEventListener('dragstart',event=>event.preventDefault());
      this.host.addEventListener('pointerdown',event=>{this.stop();pointer={x:event.clientX,y:event.clientY,angle:{...this.angle}};this.host.setPointerCapture?.(event.pointerId);});
      this.host.addEventListener('pointermove',event=>{if(!pointer)return;this.angle.y=pointer.angle.y+(event.clientX-pointer.x)*.011;this.angle.x=Math.max(-1,Math.min(1,pointer.angle.x+(event.clientY-pointer.y)*.006));this.draw();});
      this.host.addEventListener('pointerup',()=>{pointer=null;});this.host.addEventListener('pointercancel',()=>{pointer=null;});
    }
    pose(x=-.25,y=-.38,z=-.26) {this.stop();this.angle={x,y,z};this.draw();}
    turn(duration=2600,done=()=>{}) {
      this.stop();const start=performance.now(),initial={...this.angle};
      const frame=now=>{const p=Math.min(1,(now-start)/duration);const smooth=p*p*(3-2*p);this.angle.y=initial.y+TAU*smooth;this.angle.x=initial.x+Math.sin(p*Math.PI)*.13;this.draw();if(p<1)this.rotationFrame=requestAnimationFrame(frame);else{this.rotationFrame=0;done();}};
      this.rotationFrame=requestAnimationFrame(frame);
    }
    stop() {cancelAnimationFrame(this.rotationFrame);this.rotationFrame=0;}
    destroy() {this.stop();this.observer?.disconnect();if(this.gl){Object.values(this.meshes).forEach(m=>this.gl.deleteBuffer(m.buffer));Object.values(this.textures).forEach(t=>this.gl.deleteTexture(t));this.gl.deleteProgram(this.program);}this.canvas.remove();}
  }
  window.ChronoWatch3D=Watch3D;
})();
