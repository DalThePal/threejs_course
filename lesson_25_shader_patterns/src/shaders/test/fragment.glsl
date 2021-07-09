
varying vec2 vUv;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  // pattern 3
  // float strength = vUv.x;

  // pattern 4
  // float strength = vUv.y;

  // pattern 5
  // float strength = 1.0 - vUv.y;

  // pattern 6
  // float strength = vUv.y * 10.0;

  // pattern 7
  // float strength = mod(vUv.y * 10.0, 1.0);

  // pattern 8
  // float strength = mod(vUv.y * 3.0, 1.0);
  // strength = step(0.5, strength);

  // pattern 9
  // float strength = mod(vUv.y * 10.0, 1.0);
  // strength = step(0.8, strength);

  // pattern 10
  // float strength = mod(vUv.x * 10.0, 1.0);
  // strength = step(0.8, strength);

  // pattern 11
  // float strengthX = mod(vUv.x * 10.0, 1.0);
  // float strengthY = mod(vUv.y * 10.0, 1.0);
  // float strength = step(0.8, strengthX) + step(0.8, strengthY);

  // pattern 12
  // float strengthX = mod(vUv.x * 10.0, 1.0);
  // float strengthY = mod(vUv.y * 10.0, 1.0);
  // float strength = step(0.8, strengthX) * step(0.8, strengthY);

  // pattern 13
  // float strengthX = mod(vUv.x * 10.0, 1.0);
  // float strengthY = mod(vUv.y * 10.0, 1.0);
  // float strength = step(0.8, strengthY) - step(0.8, strengthX);

  // pattern 14
  // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
  // barX  *= step(0.8, mod(vUv.y * 10.0, 1.0));

  // float barY = step(0.4, mod(vUv.y * 10.0, 1.0));
  // barY  *= step(0.8, mod(vUv.x * 10.0, 1.0));

  // float strength = barX + barY;

  // pattern 15
  // float barX = step(0.4, mod(vUv.x * 10.0 - 0.2, 1.0));
  // barX  *= step(0.8, mod(vUv.y * 10.0, 1.0));

  // float barY = step(0.4, mod(vUv.y * 10.0 - 0.2, 1.0));
  // barY  *= step(0.8, mod(vUv.x * 10.0, 1.0));

  // float strength = barX + barY;

  // pattern 16
  // float strength = abs(vUv.x - 0.5);

  // pattern 17
  // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  // pattern 18
  // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

  // pattern 19
  // float top = step(0.75, vUv.y);
  // float right = step(0.75, vUv.x);
  // float bottom = step(0.75, 1.0 - vUv.y);
  // float left = step(0.75, 1.0 - vUv.x);
  // float strength = top + right + bottom + left;

  // pattern 20
  // float top = step(0.9, vUv.y);
  // float right = step(0.9, vUv.x);
  // float bottom = step(0.9, 1.0 - vUv.y);
  // float left = step(0.9, 1.0 - vUv.x);
  // float strength = top + right + bottom + left;

  // pattern 21
  // float strength = floor(vUv.x * 10.0) / 10.0;

  // pattern 22
  // float gradX = floor(vUv.x * 10.0) / 10.0;
  // float gradY = floor(vUv.y * 10.0) / 10.0;
  // float strength = gradX * gradY;

  // pattern 23
  float strength = random(vUv);

  gl_FragColor = vec4(strength, strength, strength, 1.0);
}