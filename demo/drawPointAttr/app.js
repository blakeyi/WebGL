import initShaders from "../common/initShaders.js";
let canvas = document.getElementById("webgl");
let gl = canvas.getContext("webgl");

let vertexSource = `
attribute vec2 a_position;
uniform float u_size;
varying vec2 v_xx;
void main() {
    v_xx = a_position;
    gl_Position = vec4(a_position, 0.0, 1.0);
    gl_PointSize = u_size;
}
`;

let fragmentSource = `
precision mediump float;
varying vec2 v_xx;
void main() {
    gl_FragColor = vec4(v_xx, 0.0, 1.0);
}
`
initShaders(gl, vertexSource, fragmentSource)

gl.clearColor(0.5, 0.5, 0.5, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)


// 1.attr传值
let a_position = gl.getAttribLocation(gl.program, 'a_position')
gl.vertexAttrib2f(a_position, 0.5, 0.0)


// 2.uniform传值
let u_size = gl.getUniformLocation(gl.program, 'u_size')
gl.uniform1f(u_size, 30.0)

// 3.varying, 将vertexShader里的数据传给fragmentShader

gl.drawArrays(gl.POINTS, 0, 1)

