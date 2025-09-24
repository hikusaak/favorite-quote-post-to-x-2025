type Props = {
  splittedPostData: { [key: string]: string }
}

const PostComplete = ({ splittedPostData }: Props) => {
  const TEXTAREA_ROWS = 8

  // NOTE: 2024年のキー名
  // -  フォームID(必ず送信)  fmz-fid
  // 2  キャラクター名  fmz-text294
  // 3  推し台詞  fmz-text501
  // 4  セリフの登場作品  fmz-choi695
  // 5  セリフが登場するシーン・イベント（書籍の  fmz-text001
  // 6  メールアドレス（必要な方のみ）  fmz-tkem528

  // FIXME: キーの名称は作成フォームにて確定してから変更する必要がある
  const characterName = splittedPostData['fmz-text294']
  const recommendedQuote = splittedPostData['fmz-text501']
  const hashtag = '#幻水総選挙推し台詞'
  const webpageUrl = 'https://election.suikoden.info/event/quote/'

  const targetText = () => {
    return `幻水総選挙2025 ${hashtag} に応募しました！

${characterName}
${recommendedQuote}

※応募はこちらから👇
${webpageUrl}`
  }

  return (
    <>
      <div class="wrapper">
        <main class="main">
          <h1><a href="https://election.suikoden.info" target="_blank" rel="noopener">幻水総選挙2025</a></h1>
          <h2>応募完了</h2>

          <section class="sec">
            <div class="box box__text">
              <p>ご応募ありがとうございました。<br />応募内容をポストするボタンを用意してありますので、よろしければご利用ください。</p>
              <p>※ポストは必須ではありません。<br />※このページは閉じても問題ありません。（閉じると戻ることはできません）</p>
            </div>
            <div class="box box__detail">
              <textarea
                class="form-control"
                id="targetText"
                rows={TEXTAREA_ROWS}
                readonly
              >
                {targetText()}
              </textarea>
            </div>
          </section>

          <button
            type="button"
            class="btn btn-primary btn-post"
            onclick="window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(document.getElementById('targetText').value)}`, '_blank')"
          >
            ポスト入力欄に貼り付ける（X へ）
          </button>
          <button
            type="button"
            class="btn btn-primary btn-copy"
            onclick="navigator.clipboard.writeText(document.getElementById('targetText').value).then(() => new bootstrap.Modal(document.getElementById('copyModal')).show()).catch(() => alert('コピーに失敗しました'))"
          >
            テキストをコピーする
          </button>
        </main>
        <footer class="footer">
          <div>
            <a href="https://election.suikoden.info" target="_blank" rel="noopener">幻水総選挙2025 Webサイト</a><i class="fa-solid fa-arrow-up-right-from-square"></i>
          </div>
          <div>
            <a href="https://x.com/gensosenkyo" target="_blank" rel="noopener">幻水総選挙 X（旧Twitter）</a><i class="fa-solid fa-arrow-up-right-from-square"></i>
          </div>
        </footer>
      </div>

      <div class="modal fade" id="copyModal" tabindex={-1} aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <h3>コピー完了</h3>
            <button
              type="button"
              class="btn-close --close-01"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
            <p>テキストをクリップボードにコピーしました！</p>
            <button
              type="button"
              class="btn-close --close-02"
              data-bs-dismiss="modal"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export { PostComplete }
