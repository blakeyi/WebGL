import initShaders from "../common/initShaders.js";
let canvas = document.getElementById("webgl");
let gl = canvas.getContext("webgl");

let vertexSource = `
attribute vec3 a_position;
attribute vec2 a_uv;
varying vec2 v_uv;
void main() {
    v_uv = a_uv;
    gl_Position = vec4(a_position, 1.0);
    gl_PointSize = 10.0;
}
`;

let fragmentSource = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_sampler;
void main() {
    vec4 color = texture2D(u_sampler, v_uv);
    gl_FragColor = color;
}
`

initShaders(gl, vertexSource, fragmentSource)
initVertexBuffers(gl)
initTextures(gl)


function initTextures(gl) {
    let texture = gl.createTexture();
    let u_sampler = gl.getUniformLocation(gl.program, 'u_sampler')

    let image = new Image();
    image.src = '../imgs/test1.jpeg'

    image.onload = function () {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture)

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texImage2D(gl.TEXTURE_2D, 0,  gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        gl.uniform1i(u_sampler, 0)
        draw(gl)
    }
}

function initVertexBuffers(gl) {
    // 原始图形的顶点信息
    let positions  = new Float32Array([
        -0.5, 0.5, 0.0,
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
        0.5, 0.5, 0.0,
    ])

    // uv图对应的顶点信息
    let uvs = new Float32Array([
        0.0, 0.0,
        0.5, 0.0,
        1.0, 1.0,
        0.0, 0.5,
    ])

    let FSIZE = positions.BYTES_PER_ELEMENT
    let positionsBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
    let a_position = gl.getAttribLocation(gl.program, 'a_position')
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, FSIZE*3, 0)
    gl.enableVertexAttribArray(a_position)

    let uvsBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, uvsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW)
    let a_uv = gl.getAttribLocation(gl.program, 'a_uv')
    gl.vertexAttribPointer(a_uv, 2, gl.FLOAT, false, FSIZE*2, 0)
    gl.enableVertexAttribArray(a_uv)
}

function draw(gl) {
    gl.clearColor(1, 1, 1, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
}


