let canvas = document.getElementById("webgl");
let gl = canvas.getContext("webgl");

let vertexSource = `
void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
}
`;

let fragmentSource = `
void main() {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}
`

let vertexShader = gl.createShader(gl.VERTEX_SHADER);
let framentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, vertexSource);
gl.shaderSource(framentShader, fragmentSource);

gl.compileShader(vertexShader);
gl.compileShader(framentShader);

let program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, framentShader);

gl.linkProgram(program)
gl.useProgram(program)


gl.clearColor(0.5, 0.5, 0.5, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

gl.drawArrays(gl.POINTS, 0, 1)