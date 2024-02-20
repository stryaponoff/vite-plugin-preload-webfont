# vite-plugin-preload-webfont

## Usage example:
```typescript
// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteSvgToWebfont } from 'vite-svg-2-webfont';
import { vitePluginPreloadWebfont } from 'vite-plugin-preload-webfont'

const webfontFolder = resolve('./src/webfont');

export default defineConfig({
    plugins: [
        viteSvgToWebfont({
            context: webfontFolder,
            htmlDest: resolve(webfontFolder, 'icons.ts'),
            htmlTemplate: resolve(webfontFolder, 'icons.ts.hbs'),
            fontName: 'exampleIcon',
            baseSelector: '.exIcon',
            generateFiles: 'html',
        }),
        vitePluginPreloadWebfont({ preloadFormats: ['woff2'] }),
    ],
});

```
