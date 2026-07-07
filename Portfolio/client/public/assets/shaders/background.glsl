float hash(vec2 p)
{
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;

vec3 bgColor = vec3(0.020, 0.031, 0.063);
    float spacing = 0.075 + sin(iTime * 0.1) * 0.001;

    const float dotRadius = 0.024;
    const float glowRadius1 = 0.040;
    const float glowRadius2 = 0.065;

    vec2 grid = uv / spacing;
    vec2 cell = floor(grid);
    vec2 local = fract(grid) - 0.5;

    local += (vec2(
        hash(cell + 2.0),
        hash(cell + 5.0)
    ) - 0.5) * 0.008;

    float dist = length(local);

    float speed = 3.0;

    float t = iTime * speed;
    float frame = floor(t);

    float a = hash(cell + frame);
    float b = hash(cell + frame + 1.0);

    float k = fract(t);
    k = k * k * (3.0 - 2.0 * k);

    float brightness = mix(a, b, k);
    brightness = pow(brightness, 4.0);
    brightness = mix(0.15, 1.0, brightness);

    float noiseBright = (hash(cell + floor(iTime * 20.0)) - 0.5) * 0.08;
    brightness += noiseBright;

    float rare = step(0.993, hash(cell + 18.2));
    brightness += rare * 0.6;

    brightness = clamp(brightness, 0.0, 1.0);

    float bloom = smoothstep(0.70, 1.0, brightness);

    float sizeRnd = mix(0.8, 1.2, hash(cell + 81.7));

    float r = dotRadius * sizeRnd;

    float dot = smoothstep(
        r + 0.00025,
        r - 0.00025,
        dist
    );

    float glow1 =
        1.0 -
        smoothstep(
            r,
            glowRadius1,
            dist
        );

    float glow2 =
        1.0 -
        smoothstep(
            glowRadius1,
            glowRadius2,
            dist
        );

    float glowStrength = mix(0.15, 0.40, bloom);
    glow1 *= brightness * glowStrength;
    glow2 *= brightness * glowStrength * 0.6;

    float c = hash(cell + 37.0);
    vec3 warm = vec3(1.0, 0.95, 0.85);
    vec3 cold = vec3(0.85, 0.90, 1.0);
    vec3 dotColor = mix(cold, warm, c);

    vec3 color = bgColor;

    color += glow2 * dotColor;
    color += glow1 * dotColor;
    color += dot * dotColor * brightness;

    vec2 g = abs(fract(grid) - 0.5);
    float line = (1.0 - smoothstep(0.495, 0.500, g.x)) + (1.0 - smoothstep(0.495, 0.500, g.y));
    color += vec3(line) * 0.003;

    float vignette = 1.0 - smoothstep(0.60, 1.25, length(uv));
    color *= vignette;

    fragColor = vec4(color, 1.0);
}