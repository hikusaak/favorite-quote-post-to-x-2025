# 「推し台詞」を X へ Post する Webアプリケーション 2025

## 開発サーバの起動

```sh
$ pnpm install
$ pnpm dev
```

## curl でレスポンスを確認する

```sh
$ pnpm dev
$ curl -X POST http://localhost:5173/ \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "fmz-text294=国連広報センター&fmz-text501=社会の各個人及び各機関が、この世界人権宣言を常に念頭に置きながら、加盟国自身の人民の間にも、また、…"
```
