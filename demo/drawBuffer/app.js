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

gl.clearColor(0.5, 0.5, 0.5, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)


let vertices = new Float32Array([
//  x    y     r    g    b
    -0.5, -0.5, 1.0, 0.0, 0.0,
    -0.5, 0.5, 0.0, 1.0, 0.0,
    0.5, 0.5, 0.0, 0.0, 1.0,
    0.5, -0.5, 1.0, 1.0, 1.0
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

// 一共三种形状(点,线,三角形) 七种方式(POINTS, LINES, LINE_STRIP, LINE_LOOP, TRIANGLES, TRIANGLES_STRIP, TRIANGLES_FAN)
// 画点 * 3
// gl.drawArrays(gl.POINTS, 0 , 4)

// 画线 * 3

// 两个两个点画线,比如1,2,3,4共四个点,所以一共2条线, 1-2,3-4
// gl.drawArrays(gl.LINES, 0, 4)

// 连续划线,比如1,2,3,4共四个点, 所以一共3条线, 1-2,2-3,3-4
// gl.drawArrays(gl.LINE_STRIP, 0, 4)

// 闭环划线, 比如1,2,3,4共四个点, 所以一共4条线, 1-2,2-3,3-4,4-1
// gl.drawArrays(gl.LINE_LOOP, 0, 4)

// 画三角形 * 3

// 普通三角形, 比如1,2,3共三个点, 所以一共4条线, 1-2,2-3,3-1,中间填充
// gl.drawArrays(gl.TRIANGLES, 0, 3)

// 画多边形, 比如1,2,3,4共四个点, 所以一共4条线, (1,2,3)和(2,3,4)分别画一个三角形, 然后就是两个三角形的叠加
// gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

// 画四边形, 比如1,2,3,4共四个点, 所以一共4条线, (1,2,3)和(1,3,4)分别画一个三角形, 然后就是两个三角形的叠加, 起点固定
// gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)






