type Props = {
  splittedPostData: { [key: string]: string }
}

const PostComplete = ({ splittedPostData }: Props) => {
  const targetText = () => {
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

  return (
    <>
      <div class="container textbox-container">
        <h2 class="text-center mb-4">応募完了</h2>

        <div class="notification">
          <div class="text-left">ご応募ありがとうございました。</div>
          <div class="text-left">
            応募内容をポストするボタンを用意してありますので、よろしければご利用ください。
          </div>
          <div class="text-left">※ポストは必須ではありません</div>
          <div class="text-left">
            ※このページは閉じても問題ありません（閉じると戻ることはできません）
          </div>
        </div>

        <div class="mb-3">
          <textarea class="form-control" id="targetText" rows={8} readonly>
            {targetText()}
          </textarea>
        </div>
        <button
          type="button"
          class="btn btn-primary btn-post btn-spacing"
          id="postButton"
        >
          ポスト入力欄に貼り付ける（X へ）
        </button>
        <button type="button" class="btn btn-primary btn-copy" id="copyButton">
          テキストをコピーする
        </button>
      </div>

      <div class="modal fade" id="copyModal" tabindex={-1} aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="copyModalLabel">
                コピー完了
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              テキストがクリップボードにコピーされました！
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { PostComplete }
