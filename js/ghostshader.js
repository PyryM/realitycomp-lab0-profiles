var ghost_fs = ["uniform vec4 diffuseColor;",
				"uniform sampler2D ghostMap;",
				"uniform float ghostParam;",
				"uniform float ghostTime;",
				"varying vec4 v_pos;",
				"varying vec3 v_norm;",

				"void main() {",
				"	vec3 viewdir = -normalize(v_pos.xyz);",
				"	vec3 nnorm  = normalize(v_norm);",
				"	float gval = clamp(dot(viewdir, nnorm), 0.01, 0.99);",
				"	vec2 samppos = vec2(gval, ghostParam);",
				"	vec4 maskVal = texture2D(ghostMap, samppos);",
				"   if(sin(ghostTime + v_pos.y * 25.0) < 0.0) discard;",
				"	gl_FragColor = vec4(diffuseColor.rgb * maskVal.rgb, 1.0);",
				"}"].join("\n");

var ghost_vs = ["varying vec4 v_pos;",
				"varying vec3 v_norm;",
				"void main() {",
				"v_pos = modelViewMatrix * vec4( position, 1.0 );",
				"v_norm = normalMatrix * normal;",
				"gl_Position = projectionMatrix * v_pos;",
				"}"].join("\n");
