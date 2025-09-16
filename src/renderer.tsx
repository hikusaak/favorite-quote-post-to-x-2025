import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, ViteClient } from 'vite-ssr-components/hono'

export const renderer = jsxRenderer(({ children }, c) => {
  const title = c.get('headTitle') || '幻水総選挙2025'

  return (
    <html lang="ja">
      <head>
        <ViteClient />
        <Link href="/src/style.css" rel="stylesheet" />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  )
})
