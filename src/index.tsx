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
  const sampleData = {
    'fmz-text294': '国連広報センター',
    'fmz-text501':
      '「社会の各個人及び各機関が、この世界人権宣言を常に念頭に置きながら、加盟国自身の人民の間にも、また、…」',
  }
  c.set('headTitle', '(dev) 推し台詞 送信完了 | 幻水総選挙2025')

  return c.render(<PostComplete splittedPostData={sampleData} />)
})

// 同じ URL で使い回すならば、リクエスト元・リクエスト先 の URL によって処理を分岐すると良さそう
app.post('/', async (c) => {
  const postData = await c.req.text()
  const splittedPostData = parseFormData(postData)

  // NOTE: デバッグ用なので production では消していい
  console.debug('splittedPostData:', splittedPostData)

  c.set('headTitle', '推し台詞 送信完了 | 幻水総選挙2025')

  return c.render(<PostComplete splittedPostData={splittedPostData} />)
})

const htmlBody = (
  splittedPostData: { [key: string]: string },
  headTitle: string
) => {
  return `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      document.getElementById('copyButton').addEventListener('click', function() {
        const textToCopy = document.getElementById('targetText').value;
        navigator.clipboard.writeText(textToCopy).then(function() {
          const copyModal = new bootstrap.Modal(document.getElementById('copyModal'));
          copyModal.show();
        }, function() {
          alert('コピーに失敗しました');
        });
      });

      document.getElementById('postButton').addEventListener('click', function() {
        const textToPost = document.getElementById('targetText').value;
        const xUrl = "https://x.com/intent/tweet?text=encodeURIComponent(
          targetText(splittedPostData)
        )";

        window.open(xUrl, '_blank');
      });
    </script>
    </body>
    </html>
  `
}

export default app
