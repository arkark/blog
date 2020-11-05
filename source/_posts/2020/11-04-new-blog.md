---
title: ブログを引っ越しました
date: 2020-11-04 22:40:36
tags:
    - misc
thumbnail: /images/2020/20201104-ark_white.png
---

ブログをはてなブログから静的サイトジェネレータによって生成したブログに移行しました。

- 以前のブログは[こちら](https://ark4rk.hatenablog.com/)

ひとまず引っ越し前の記事はこのまま残します。バックアップは取っているので記事完全消失はないと思います。気が向いたらこちらに移すかもしれないです。

以下はありきたりなことを書いているので読む価値はあまりないです。暇な人向け。

## 引っ越した理由

- 快適な執筆環境がほしい
    - 慣れたエディタでの編集
    - markdownで書ける
    - ホットリロード
    - 特殊な記法で消耗しない[^1]
    - git管理
    - デプロイの自動化
    - etc.
- 独自ドメインを使いたい
- ウェブページの配信・レンダリングを高速にしたい
- 以上を基本無料で実現したい[^2]

[^1]: 例えば、はてなブログのmarkdownモードで数式を入力しようとしたらエスケープ地獄になる
[^2]: ドメイン維持費はどうしようもないので、これは例外とする

はてなブログは個人的に好きなサービスだったのですが、色々消耗してしまったのでやめました。

## 使用ツールなど

- [Hexo](https://hexo.io/): 静的サイトジェネレータ
- [Cactus](https://github.com/probberechts/hexo-theme-cactus): ブログテーマ
- [Vercel](https://vercel.com/): ホスティングサービス
- Google Domains: DNS設定
- KaTeX: 数式レンダリング
- markdown-it: markdownパーサ
- [JetBrains Mono](https://www.jetbrains.com/mono/): フォント

Repository: https://github.com/arkark/blog

### Hexo

Node製の静的サイトジェネレータです。他にGatsby/Hugo/Zolaあたりが候補でしたが

- 好みのテーマがあった
- 欲しい機能が一通り揃っている
- ブログ生成にフォーカスしていて使い方がシンプル

という理由からHexoにしました。生成速度が気になりだしたらHugoやZolaに変えるかもしれないですが、今のところ不満はないです。

### Cactus

テーマは[Cactus](https://github.com/probberechts/hexo-theme-cactus)にして、一部自分好みに改変しました：

- 各記事のタイトル付近にツイートボタンを設置
- フォントをJetBrains Monoに変更
- CSS (Stylus) を調整
- etc.

フォークしたリポジトリをgit submoduleで組み込んで使用しています。

### Vercel

Netlifyでも良かったんですが、最近Vercelが気に入っているのでこっちにしました。深い理由はないです。

### Google Domains

既存サービスのドメインを用いると、そのサービスからの移行がしづらかったりサービスが終了したときにページが消失してしまったりするデメリットがあるため、独自ドメインでブログを公開したかったです。

ちなみに、URLのパスに`/blog`とかを付けるよりも`blog.example.com`のようなサブドメインにする方が好きなので、そのように設定しました。

### KaTeX

MathJaXより断然KaTeX派です。

### markdown-it

最近のmarkdownパーサはmarkdown-itが主流なイメージがあったのでこれにしました。npmパッケージとしては[hexo-renderer-markdown-it](https://github.com/hexojs/hexo-renderer-markdown-it)を使っています。

ところで[markdown-it-katex](https://github.com/waylonflinn/markdown-it-katex)を使おうとしたら全然メンテナンスされてなくてびっくりしました。たくさんフォークされているし、どれを使えばいいんですか？とりあえず今回は[@iktakahiro/markdown-it-katex](https://github.com/iktakahiro/markdown-it-katex)を使いました。

追記：

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">markdown-it-katexメンテされてないやんけ問題、個人的にはmarkdown-it-texmathなのかなと思っている（mathレンダリングエンジンへの依存を後から注入するスタイルなのが好感度高い）</p>&mdash; sekai🧀 (@sekai67) <a href="https://twitter.com/sekai67/status/1323993294225879041?ref_src=twsrc%5Etfw">November 4, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

良さそう。[markdown-it-texmath](https://github.com/goessner/markdown-it-texmath)に変更しました。

### JetBrains Mono

好きなフォントのひとつです。Web fontとして使ってます。

## 動作テスト

以下、テストです。

1. これはテストです。
1. *これはテストです。*
1. **これはテストです。**
    - :cat::wolf::camel::snake::bird::turtle::octopus::whale::dolphin::dragon:

xxx | yyy | zzz
--: | :-: | :--
111 | 222 | 333
qw  | er  | ty
a   | b   | c

> Ghidra is a software reverse engineering (SRE) framework created and maintained by the National Security Agency Research Directorate. This framework includes a suite of full-featured, high-end software analysis tools that enable users to analyze compiled code on a variety of platforms including Windows, macOS, and Linux. Capabilities include disassembly, assembly, decompilation, graphing, and scripting, along with hundreds of other features. Ghidra supports a wide variety of processor instruction sets and executable formats and can be run in both user-interactive and automated modes. Users may also develop their own Ghidra plug-in components and/or scripts using Java or Python.
> https://github.com/NationalSecurityAgency/ghidra

$x^y = 1$

$$
c = \pm\sqrt{a^2 + b^2}
$$

```rust
// https://doc.rust-lang.org/rust-by-example/std_misc/file/read_lines.html

use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn main() {
    // File hosts must exist in current path before this produces output
    if let Ok(lines) = read_lines("./hosts") {
        // Consumes the iterator, returns an (Optional) String
        for line in lines {
            if let Ok(ip) = line {
                println!("{}", ip);
            }
        }
    }
}

// The output is wrapped in a Result to allow matching on errors
// Returns an Iterator to the Reader of the lines of the file.
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
```

![](/images/2020/20201104-ark_white.png)
