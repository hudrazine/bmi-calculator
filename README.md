# BMI Calculator

簡易的なBMI診断Webツールです。

## 使用方法

このツールはHTMLのid属性に`bmi`を持つ要素にマウントされます。

使用例:

```html
<div id="bmi"></div>

<script type="module" crossorigin src="https://cdn.example.com/@shikumito/bmi-calculator@latest/dist/bmi-calculator.js"></script>
<link rel="stylesheet" crossorigin href="https://cdn.example.com/@shikumito/bmi-calculator@latest/dist/bmi-calculator.css">
```

js/cssのリンクは実際のデプロイ先のURLに変更する必要があります。

## Development

### 必須

- Node.js
- pnpm

### セットアップ

```bash
pnpm install
pnpm dev # 開発用サーバーを起動
```

### ビルド

```bash
pnpm build
```

上記のコマンドを実行すると`dist`ディレクトリにビルドされたファイルが生成されます。

---
Copyright © [2024] [Shikumito, Inc.]. All rights reserved.
