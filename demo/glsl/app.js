import initShaders from "../common/initShaders.js";
let canvas = document.getElementById("webgl");
let gl = canvas.getContext("webgl");
import vertexShader  from "./shaders/vertexShader.js";
import fragmentShader  from "./shaders/fragmentShader.js";



initShaders(gl, vertexShader, fragmentShader)


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

let tx = 0, ty = 0;
let speed_x = 0.01, speed_y = 0.02;

function tick() {
    tx += speed_x
    ty += speed_y
    if (tx > 0.5 || ty < -0.5) speed_x *= -1
    if (ty > 0.5 || ty < -0.5) speed_y *= -1

    let u_translate = gl.getUniformLocation(gl.program, "u_translate")
    gl.uniform2f(u_translate, tx, ty)
    draw(gl)
    requestAnimationFrame(tick)
}

tick()





