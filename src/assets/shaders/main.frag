#version 300 es

precision mediump float;

uniform sampler2D s_texture;

in vec2 texCoord;

out vec4 fragColor;

void main()
{
  vec4 outColor = texture(s_texture, texCoord);
  fragColor = vec4(ceil(outColor.r), ceil(outColor.r), ceil(outColor.r), outColor.a);
}
