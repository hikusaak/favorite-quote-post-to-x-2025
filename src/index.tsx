import { Hono } from 'hono'
import { renderer } from './renderer'
import { CompletePage } from './components/CompletePage'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.text('', 403)
})

app.get('/example', (c) => {
  return c.html(
    <CompletePage
      splittedPostData={{
        'fmz-text294': '国連広報センター',
        'fmz-text501':
          '「社会の各個人及び各機関が、この世界人権宣言を常に念頭に置きながら、加盟国自身の人民の間にも、また、…」',
      }}
      headTitle="（開発環境）推し台詞 送信完了 | 幻水総選挙2024"
    />
  )
})

app.post('/', async (c) => {
  const postData = await c.req.text()
  const splittedPostData = splitPostData(postData)

  const headTitle = '推し台詞 送信完了 | 幻水総選挙2024'

  return c.html(htmlBody(splittedPostData, headTitle))
})

const splitPostData = (postData: string) => {
  // TODO: デバッグ用なので production では消す
  console.log('postData:', postData)

  const decodedData = decodeURIComponent(postData)
  const params = decodedData.split('&')
  const splittedPostData: { [key: string]: string } = {}

  params.forEach((param) => {
    const [key, value] = param.split('=')

    splittedPostData[key] = value
  })

  return splittedPostData
}

const targetText = (splittedPostData: { [key: string]: string }): string => {
  // -  フォームID(必ず送信)  fmz-fid
  // 2  キャラクター名  fmz-text294
  // 3  推し台詞  fmz-text501
  // 4  セリフの登場作品  fmz-choi695
  // 5  セリフが登場するシーン・イベント（書籍の  fmz-text001
  // 6  メールアドレス（必要な方のみ）  fmz-tkem528
  const characterName = splittedPostData['fmz-text294']
  const recommendedQuote = splittedPostData['fmz-text501']
  const hashtag = '#幻水総選挙推し台詞'
  const webpageUrl = 'https://election.suikoden.info/event/serif/'

  return `幻水総選挙2024 ${hashtag} に応募しました！

${characterName}
${recommendedQuote}

※応募はこちらから👇
${webpageUrl}`
}

const htmlBody = (
  splittedPostData: { [key: string]: string },
  headTitle: string
) => {
  return `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${headTitle}</title>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
      <link rel="icon" type="image/png" href="/android-touch-icon.png" sizes="192x192">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
      <style>
        body {
          background-color: #f8f9fa;
          font-family: 'Noto Sans JP', sans-serif;
        }
        .textbox-container {
          max-width: 600px;
          margin: 50px auto;
        }
        .form-control[readonly] {
          background-color: #e9ecef;
          color: #495057;
        }
        .btn-copy, .btn-post {
          width: 100%;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
        }
        .btn-spacing {
          margin-bottom: 10px;
        }
        .footer {
          border-top: 1px solid #dee2e6;
          text-align: center;
          padding: 10px 0;
          margin-top: 20px;
          font-size: 0.9em;
          color: #6c757d;
          font-size: 1.1em;
        }
        .footer a {
          color: #6c757d;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
        .notification {
          background-color: #e2f0d9;
          border: 1px solid #b2e4b5;
          border-radius: 5px;
          padding: 15px;
          margin-bottom: 20px;
          text-align: center;
          color: #3c763d;
        }
        .text-left {
          text-align: left;
        }
      </style>
    </head>
    <body>

    <div class="container textbox-container">
      <h2 class="text-center mb-4">応募完了</h2>

      <div class="notification">
        <div class="text-left">ご応募ありがとうございました。</div>
        <div class="text-left">応募内容をポストするボタンを用意してありますので、よろしければご利用ください。</div>
        <div class="text-left">※ポストは必須ではありません</div>
        <div class="text-left">※このページは閉じても問題ありません（閉じると戻ることはできません）</div>
      </div>

      <div class="mb-3">
        <textarea class="form-control" id="targetText" rows="8" readonly>${targetText(
          splittedPostData
        )}</textarea>
      </div>
      <button class="btn btn-primary btn-post btn-spacing" id="postButton">ポスト入力欄に貼り付ける（X へ）</button>
      <button class="btn btn-primary btn-copy" id="copyButton">テキストをコピーする</button>
    </div>

    <div class="modal fade" id="copyModal" tabindex="-1" aria-labelledby="copyModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="copyModalLabel">コピー完了</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          <div class="modal-body">
            テキストがクリップボードにコピーされました！
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">閉じる</button>
          </div>
        </div>
      </div>
    </div>

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
        const xUrl = "https://x.com/intent/tweet?text=${encodeURIComponent(
          targetText(splittedPostData)
        )}";

        window.open(xUrl, '_blank');
      });
    </script>

    <div class="footer">
      <a href="https://election.suikoden.info" target="_blank">幻水総選挙2024</a>
    </div>
    </body>
    </html>
  `
}

export default app
