interface CompletePageProps {
  splittedPostData: { [key: string]: string }
  headTitle: string
}

const targetText = (splittedPostData: { [key: string]: string }): string => {
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

export const CompletePage = ({
  splittedPostData,
  headTitle,
}: CompletePageProps) => (
  <html lang="ja">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{headTitle}</title>
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
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
      <div className="container textbox-container">
        <h2 className="text-center mb-4">応募完了</h2>

        <div className="notification">
          <div className="text-left">ご応募ありがとうございました。</div>
          <div className="text-left">
            応募内容をポストするボタンを用意してありますので、よろしければご利用ください。
          </div>
          <div className="text-left">※ポストは必須ではありません</div>
          <div className="text-left">
            ※このページは閉じても問題ありません（閉じると戻ることはできません）
          </div>
        </div>

        <div className="mb-3">
          <textarea className="form-control" id="targetText" rows={8} readOnly>
            {targetText(splittedPostData)}
          </textarea>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-post btn-spacing"
          id="postButton"
        >
          ポスト入力欄に貼り付ける（X へ）
        </button>
        <button
          type="button"
          className="btn btn-primary btn-copy"
          id="copyButton"
        >
          テキストをコピーする
        </button>
      </div>

      <div
        className="modal fade"
        id="copyModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="copyModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="copyModalLabel">
                コピー完了
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              テキストがクリップボードにコピーされました！
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
      <script src="/complete-page.js"></script>

      <div className="footer">
        <a
          href="https://election.suikoden.info"
          target="_blank"
          rel="noopener noreferrer"
        >
          幻水総選挙2024
        </a>
      </div>
    </body>
  </html>
)
