import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, ViteClient } from 'vite-ssr-components/hono'

export const renderer = jsxRenderer(({ children }, c) => {
  const title = c.get('headTitle') || '幻水総選挙2025'

  return (
    <html lang="ja">
      <head>
        <ViteClient />
        <Link href="/src/styles.css" rel="stylesheet" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link
          rel="icon"
          type="image/png"
          href="/android-touch-icon.png"
          sizes="192x192"
        />
        {/* <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <script
          type="importmap"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: ここは dangerous で問題ない
          dangerouslySetInnerHTML={{
            __html: `{
              "imports": {
                "@popperjs/core": "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/esm/popper.min.js",
                "bootstrap": "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.esm.min.js"
              }
            }`,
          }}
        />
        <script
          type="module"
          // Hono はサーバサイドのフレームワークなので window.bootstrap を定義しておく
          // biome-ignore lint/security/noDangerouslySetInnerHtml: ここは dangerous で問題ない
          dangerouslySetInnerHTML={{
            __html: `import * as bootstrap from 'bootstrap'

                      document.addEventListener('DOMContentLoaded', function() {
                        const popoverButton = document.getElementById('popoverButton')
                        if (popoverButton) {
                          new bootstrap.Popover(popoverButton)
                        }
                      })

                      window.bootstrap = bootstrap`,
          }}
        />
      </body>
    </html>
  )
})
