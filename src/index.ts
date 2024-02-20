import type { GeneratedWebfont, PublicApi } from 'vite-svg-2-webfont'
import type { GeneratedFontTypes } from '@vusion/webfonts-generator'
import type { Plugin, HtmlTagDescriptor } from 'vite'
import type { Plugin as RollupPlugin } from 'rollup'

type PluginOptions = {
  preloadFormats: GeneratedFontTypes[]
}

export const vitePluginPreloadWebfont = (options: PluginOptions): Plugin => {
  let parentPlugin: RollupPlugin<PublicApi>
  return {
    name: 'tm-vite-plugin-preload-webfont',
    buildStart({ plugins }) {
      const parentName = 'vite-svg-2-webfont'
      const viteSvg2FontPlugin = plugins.find((plugin) => plugin.name === parentName)
      if (!viteSvg2FontPlugin) {
        throw new Error(`This plugin depends on the "${parentName}" plugin.`)
      }
      parentPlugin = viteSvg2FontPlugin
    },
    transformIndexHtml: {
      enforce: 'post',
      transform(html, ctx) {
        // ignore next because the bundle will be always here on build
        if (!ctx.bundle) {
          return html
        }

        const assets: GeneratedWebfont[] = []
        parentPlugin.api?.getGeneratedWebfonts().forEach((webfont) => {
          assets.push(webfont)
        })

        return assets
          .filter((asset) => options.preloadFormats.includes(asset.type))
          .map<HtmlTagDescriptor>((asset) => {
            return {
              tag: 'link',
              attrs: {
                rel: 'preload',
                crossorigin: true,
                type: `font/${asset.type}`,
                href: asset.href,
                as: 'font',
              },
              injectTo: 'head',
            }
          })
      },
    },
  }
}
