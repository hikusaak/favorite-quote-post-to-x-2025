import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, ViteClient } from 'vite-ssr-components/hono'

export const renderer = jsxRenderer(({ children }, c) => {
  const title = c.get('headTitle') || '幻水総選挙2025'

  return (
    <html lang="ja">
      <head>
        <ViteClient />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <title>{title}</title>
        <meta property="og:locale" content="ja_JP" />
        <meta
          property="og:image"
          content="https://thanks-favorite-quotes-vote.suikoden.info/ogp.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@gensosenkyo" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/favicon-180x180.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/base-min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <Link href="/src/styles.css" rel="stylesheet" />
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
        <script type="module" src="/client.js"></script>
      </body>
    </html>
  )
})
