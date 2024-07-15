import initShaders from "../common/initShaders.js";
let canvas = document.getElementById("webgl");
let gl = canvas.getContext("webgl");

let vertexSource = `
attribute vec2 a_position;
attribute vec3 a_color;
varying vec3 v_color;
void main() {
    v_color = a_color;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

let fragmentSource = `
precision mediump float;
varying vec3 v_color;
void main() {
    gl_FragColor = vec4(v_color, 1.0);
}
`

initShaders(gl, vertexSource, fragmentSource)

gl.clearColor(0.5, 0.5, 0.5, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)


let vertices = new Float32Array([
//  x    y     r    g    b
    -0.5, 0.0, 1.0, 0.0, 0.0,
    0.5, 0.0, 0.0, 1.0, 0.0,
    0.0, 0.8, 0.0, 0.0, 1.0
])
const FSIZE = vertices.BYTES_PER_ELEMENT
let buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
let a_position = gl.getAttribLocation(gl.program, 'a_position')
let a_color = gl.getAttribLocation(gl.program, 'a_color')
gl.vertexAttribPointer(
    a_position,
    2,
    gl.FLOAT,
    false,
    5 * FSIZE,
    0
)

gl.vertexAttribPointer(
    a_color,
    3,
    gl.FLOAT,
    false,
    5 * FSIZE,
    2 * FSIZE
)
gl.enableVertexAttribArray(a_position)
gl.enableVertexAttribArray(a_color)
gl.drawArrays(gl.TRIANGLES, 0 , 3)


