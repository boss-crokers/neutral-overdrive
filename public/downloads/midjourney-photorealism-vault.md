# Midjourney v6 Photorealism Vault

A masterclass database containing advanced prompt engineering configurations, camera lens settings, and lightning coefficients to render ultra-realistic, studio-grade photographs in Midjourney v6.

---

## 1. Core Midjourney v6 Parameters

When prompting for photorealism, you must lock in these v6 parameters at the end of your prompts:

*   `--v 6.0` - Ensures you are using the latest, high-fidelity model.
*   `--style raw` - Bypasses Midjourney's default artistic stylization, producing a more neutral, organic camera shot.
*   `--ar 16:9` - Use landscape layout for cinematic ratios (or `9:16` for mobile vertical formats).
*   `--stylize 50` to `--stylize 150` - Keep stylization low. High stylization (`--stylize 500+`) adds too much CGI polish, destroying skin texture and fabric realism.

---

## 2. Virtual Camera Lens Configurations

To make Midjourney render realistic depth of field and scale, describe the virtual lens and camera body explicitly in your prompts:

| Camera Setup / Lens | Ideal For | Prompt Snippet |
| :--- | :--- | :--- |
| **85mm f/1.4 Lens** | Portraits / Sharp focus | `portrait shot, shot on 85mm lens, f/1.4 aperture, shallow depth of field, sharp eyes, soft background blur` |
| **35mm f/2.8 Lens** | Street photography / Context | `candid street photography, shot on 35mm lens, natural lighting, documentary style, lifelike details` |
| **24mm Wide-Angle** | Architecture / Landscapes | `wide-angle view, shot on 24mm lens, deep depth of field, dramatic scale, high-resolution details` |
| **Hasselblad 500C** | Retro film texture | `vintage portrait, medium format film texture, shot on Hasselblad 500c, soft natural light, film grain` |

---

## 3. Advanced Lighting Modifiers

Avoid generic words like "photorealistic" or "hyperrealistic." Instead, describe the physical properties of the light source:

*   **Golden Hour:** `soft warm golden hour light, long shadows, low sun angle, atmospheric dust`
*   **Volumetric/Rembrandt:** `Rembrandt lighting, dark moody background, high-contrast side-light, dramatic chiaroscuro`
*   **Studio Softbox:** `diffused softbox studio light, catchlights in eyes, clean shadow falloff, professional skin-tone mapping`
*   **Overcast Daylight:** `soft overcast skylight, low-contrast shadows, even exposure, natural textures`

---

## 4. Master Prompt Formulas (Copy-Paste Recipes)

### A. The Cinematic Portrait (Studio Setup)
> **Prompt:** `A close-up portrait of a rugged 45-year-old developer looking into the lens, shot on Hasselblad medium format, 85mm lens, f/2.2 aperture, subtle catchlights in eyes, professional studio softbox side-lighting, fine skin pores, fabric texture of a knit sweater visible, dark slate gray background, photorealistic --style raw --ar 16:9 --v 6.0 --stylize 75`

### B. The Street/Candid Photograph (Natural Light)
> **Prompt:** `Candid documentary street photography, a developer working on a laptop inside a cyberpunk coffee shop, shot on Leica M11, 35mm lens, f/4.0 aperture, neon ambient light reflecting on glass, steam rising from coffee mug, cinematic color grading, natural grain --style raw --ar 16:9 --v 6.0 --stylize 100`

### C. The Industrial Architecture Shot (Wide-Angle)
> **Prompt:** `Architectural photography, a brutalist concrete data center nestled in a misty pine forest, wide-angle 24mm lens, f/8 aperture, sharp focus from foreground to background, soft overcast gray skylight, moody atmosphere, wet concrete textures --style raw --ar 16:9 --v 6.0 --stylize 120`
