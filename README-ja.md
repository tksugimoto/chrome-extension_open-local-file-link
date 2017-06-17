# 機能
IEと違いChromeだとローカルファイルへのリンク（file://～）があっても開けないので、拡張で開けるようにする

1. ローカルファイルへのリンクをクリック<br>
    <img src="chrome-store/screenshot-01.png" width="640px;">
1. ファイルが開く

# Chromeストア
https://chrome.google.com/webstore/detail/nikfmfgobenbhmocjaaboihbeocackld

# Todo
- [x] ローカルファイルのリンクをクリックしたらChromeでも開く
- [x] セキュリティの確保（勝手にタブを開かれるとセキュリティ的にまずいので制限する）
    - [x] ~~開くことができるページを設定（通知により確認）できるようにする~~ ↓の方法に変更
    - [x] （↑の通知による確認ではなく、）ユーザーのクリック時のみ開くようにする
        - 悪意あるページのScriptで（無限に）開けないように
        - [Event.isTrusted - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/Event/isTrusted "https://developer.mozilla.org/ja/docs/Web/API/Event/isTrusted")を使用
- [ ] \<pre>や\<code>内のローカルファイルのパスをリンク化
- [ ] pptやxlsなどは直接ファイルを開くようにする（Native Messaging + レジストリ変更が必要）

