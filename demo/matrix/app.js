import initShaders from "../common/initShaders.js";
let canvas = document.getElementById("webgl");
let gl = canvas.getContext("webgl");
import { mat4 } from "../common/gl_matrix/esm/index.js"
let vertexSource = `
attribute vec2 a_position;
attribute vec3 a_color;
uniform mat4 u_matrix;
varying vec3 v_color;
void main() {
    v_color = a_color;
    gl_Position = u_matrix * vec4(a_position, 0.0, 1.0);
    gl_PointSize = 10.0;
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


let vertices = new Float32Array([
    //  x    y     r    g    b
    -0.5, 0, 1.0, 0.0, 0.0,
    0.5, 0, 0.0, 1.0, 0.0,
    0, -0.8, 0.0, 0.0, 1.0
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



function draw(gl) {
    gl.clearColor(1, 1, 1, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    // 普通三角形, 比如1,2,3共三个点, 所以一共4条线, 1-2,2-3,3-1,中间填充
    gl.drawArrays(gl.TRIANGLES, 0, 3)
}

// 缩放矩阵
let sx = 2, sy = 2, sz = 1
let matrix_scale = [
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
    0, 0, 0, 1
]

// 平移矩阵
let tx = 0.5, ty = 0, tz = 0
let matrix_translate = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    tx, ty, tz, 1 
]

// 旋转矩阵
let deg = 180
let cos = Math.cos(deg / 180 * Math.PI), sin = Math.sin(deg / 180 * Math.PI)
let matrix_rotate = [
    cos, sin, 0, 0,
    -sin, cos, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]

// 使用库
let matrix_rotate1 = mat4.create()
mat4.fromRotation(matrix_rotate1, 10 / 180 * Math.PI, [0, 0, 1])

let u_matrix = gl.getUniformLocation(gl.program, "u_matrix")
gl.uniformMatrix4fv(u_matrix, false, matrix_rotate1)
draw(gl)





