let vertexShader = /* glsl */ `

attribute vec2 a_position;
attribute vec3 a_color;
uniform vec2 u_translate;
varying vec3 v_color;
void main() {
    v_color = a_color;
    gl_Position = vec4(a_position.x + u_translate.x, a_position.y + u_translate.y,  0.0, 1.0);
    gl_PointSize = 10.0;
}
`

export default vertexShader;