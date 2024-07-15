export default function initShaders(gl, vertexSource, fragmentSource) {
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    let framentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    let program = createProgram(gl, vertexShader, framentShader)
    if (program) {
        gl.useProgram(program)
        gl.program = program
        return true
    }

    return false

}

function createShader(gl, type, source) {
    let shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (compiled) {
        return shader
    }

    let error = gl.getShaderInfoLog(shader)
    console.log(`compile shaders err: ${error}`);
    gl.deleteShader(shader)
    return null
}





function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)

    let linked = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (linked) {
        return program
    }
    let error = gl.getProgramInfoLog(program)
    console.log(`link program error: ${error}`);
    gl.deleteProgram(program)
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    return null
}