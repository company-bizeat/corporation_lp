# corporation_lp

BizEat の法人向けランディングページ（`corporate.bizeat.jp`）。静的 HTML を GitHub Pages で配信する。
飲食店向けの `partner_lp`（`partner.bizeat.jp`）を雛形にしている。

## 構成

```
index.html    本文（1ページ）
contact.html  導入のご相談フォーム（Formspree に POST）
styles.css    スタイル一式
script.js     ヘッダー・FAQ・スクロール表示などの動き（両ページ共通）
contact.js    フォームの送信処理
assets/       画像・ロゴ
CNAME         公開ドメイン
.nojekyll     Jekyll を使わない（README などがそのまま配信されないようにする）
```

## 直すときの注意

- 文言のもとになる情報（料金・割引率・支払条件）は、他の公開ページの記載と揃える。
- フッターは `index.html` と `contact.html` の両方にある。片方を直したらもう片方も直す。
- `contact.html` のフォームは Formspree のフォームIDを `action` に入れて動く。IDはここには書かない。
- 決め打ちの `<br>` は使わず、折り返しは `.nobr` で指定する。

## 公開

GitHub Pages（Deploy from a branch: `main` / root）。ドメインは `CNAME` と DNS の CNAME レコードで設定する。
