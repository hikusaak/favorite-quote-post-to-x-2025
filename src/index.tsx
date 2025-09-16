import { Hono } from 'hono'
import { PostComplete } from './components/PostComplete'
import { parseFormData } from './lib/stringOperation'
import { renderer } from './renderer'

const app = new Hono<{ Variables: { headTitle?: string } }>()
app.use('*', renderer)

app.get('/', (c) => {
  return c.text('', 403)
})

app.get('/healthcheck', (c) => {
  return c.text('', 200)
})

app.get('/example', (c) => {
  const exampleSplittedPostData = {
    'fmz-text294': '国連広報センター',
    'fmz-text501':
      '「社会の各個人及び各機関が、この世界人権宣言を常に念頭に置きながら、加盟国自身の人民の間にも、また、…」',
  }
  c.set('headTitle', '(dev) 推し台詞 送信完了 | 幻水総選挙2025')

  return c.render(<PostComplete splittedPostData={exampleSplittedPostData} />)
})

app.post('/', async (c) => {
  const postData = await c.req.text()
  const splittedPostData = parseFormData(postData)
  c.set('headTitle', '推し台詞 送信完了 | 幻水総選挙2025')

  // NOTE: デバッグ用なので production では消していい
  console.debug('splittedPostData:', splittedPostData)

  return c.render(<PostComplete splittedPostData={splittedPostData} />)
})

export default app
