export const techDescriptionMap: Record<string, string> = {
  // Web fundamentals
  html5: "HTML5 はウェブページの構造を定義するマークアップ言語の最新仕様です。",
  html: "HTML はウェブページの構造を定義するマークアップ言語です。",
  css3: "CSS3 はスタイルとレイアウトを定義するスタイルシート言語の最新仕様です。",
  css: "CSS はスタイルとレイアウトを定義するスタイルシート言語です。",
  sass: "Sass は CSS を拡張するメタ言語で、変数やネストなどを提供します。",
  less: "Less は CSS を拡張するプリプロセッサで、変数やミックスインを提供します.",
  tailwindcss: "Tailwind CSS はユーティリティファーストな CSS フレームワークです。",

  // JavaScript / TypeScript ecosystem
  javascript: "JavaScript はブラウザやサーバーで動作する動的型付けのスクリプト言語です。",
  js: "JavaScript はブラウザやサーバーで動作する動的型付けのスクリプト言語です。",
  typescript: "TypeScript は型システムを備えた JavaScript のスーパーセットです。",
  ts: "TypeScript は型システムを備えた JavaScript のスーパーセットです。",
  node: "Node.js は V8 上で動作するサーバーサイド JavaScript 実行環境です。",
  nodejs: "Node.js は V8 上で動作するサーバーサイド JavaScript 実行環境です。",
  npm: "npm は JavaScript のパッケージマネージャです。",
  pnpm: "pnpm は高速で効率的な JavaScript のパッケージマネージャです。",
  yarn: "Yarn は信頼性を重視した JavaScript のパッケージマネージャです。",

  // Frameworks / Libraries
  react: "React は UI をコンポーネントとして構築するライブラリです。",
  next: "Next.js は React のためのフルスタック Web フレームワークです。",
  nextjs: "Next.js は React のためのフルスタック Web フレームワークです。",
  vue: "Vue.js は軽量で柔軟なフロントエンドフレームワークです。",
  nuxt: "Nuxt.js は Vue 用のフルスタックフレームワークです。",
  angular: "Angular は TypeScript ベースのフロントエンドフレームワークです。",
  svelte: "Svelte はコンパイル時に最適化を行うフロントエンドフレームワークです。",
  redux: "Redux は予測可能な状態管理ライブラリです。",
  zustand: "Zustand は軽量な React 状態管理ライブラリです。",
  reactquery: "TanStack Query はデータフェッチとキャッシュを管理するライブラリです。",
  vite: "Vite は高速な開発サーバーとビルドツールです。",
  webpack: "Webpack はモジュールバンドラーです。",
  parcel: "Parcel は設定不要を目指したバンドラーです。",
  astro: "Astro はコンテンツ中心の高速なウェブサイト構築フレームワークです。",

  // Backend frameworks
  express: "Express は最小限で柔軟な Node.js の Web アプリケーションフレームワークです。",
  nest: "NestJS は TypeScript で構築されたスケーラブルなサーバーサイドフレームワークです。",
  nestjs: "NestJS は TypeScript で構築されたスケーラブルなサーバーサイドフレームワークです。",
  fastify: "Fastify は高性能な Node.js Web フレームワークです。",
  hapi: "hapi は豊富なプラグインエコシステムを持つ Node.js フレームワークです。",

  // Databases / ORMs
  mongodb: "MongoDB はドキュメント指向の NoSQL データベースです。",
  mongoose: "Mongoose は MongoDB 用の ODM ライブラリです。",
  postgres: "PostgreSQL は堅牢なオープンソースのリレーショナルデータベースです。",
  postgresql: "PostgreSQL は堅牢なオープンソースのリレーショナルデータベースです。",
  mysql: "MySQL は広く利用されるオープンソースの RDBMS です。",
  sqlite: "SQLite は軽量な組み込みリレーショナルデータベースです。",
  prisma: "Prisma は型安全な ORM で、DB アクセスを簡素化します。",
  graphql: "GraphQL は柔軟なデータ取得のためのクエリ言語です。",
  apollo: "Apollo は GraphQL のためのクライアント/サーバー実装です。",
  redis: "Redis はインメモリのキー・バリュー型データストアです。",

  // DevOps / Cloud
  docker: "Docker はコンテナ化プラットフォームで、アプリの配布と実行を容易にします。",
  kubernetes: "Kubernetes はコンテナオーケストレーションのためのプラットフォームです。",
  aws: "AWS は幅広いサービスを提供するクラウドコンピューティングプラットフォームです。",
  gcp: "GCP は Google のクラウドプラットフォームです。",
  azure: "Azure は Microsoft のクラウドプラットフォームです。",
  vercel: "Vercel はフロントエンド向けのサーバーレスホスティングプラットフォームです。",
  netlify: "Netlify は Jamstack サイトのビルド・デプロイ・ホスティングを提供します。",
  githubactions: "GitHub Actions は CI/CD ワークフローを自動化するプラットフォームです。",
  gitlabci: "GitLab CI は GitLab に統合された CI/CD ソリューションです.",

  // Languages
  python: "Python は読みやすさと生産性を重視した高水準プログラミング言語です。",
  java: "Java は堅牢で移植性の高いオブジェクト指向言語です。",
  go: "Go はシンプルで高性能な並行処理を特長とする言語です。",
  golang: "Go はシンプルで高性能な並行処理を特長とする言語です。",
  rust: "Rust は安全性とパフォーマンスに重点を置いたシステムプログラミング言語です。",
  ruby: "Ruby は生産性と簡潔さを重視したオブジェクト指向言語です。",
  php: "PHP はサーバーサイドスクリプト言語で、Web 開発に広く使われます。",
  dart: "Dart は Flutter アプリケーションで使われる言語です。",
  kotlin: "Kotlin はモダンで表現力の高い JVM 言語です。",
  swift: "Swift は Apple プラットフォーム向けのモダンな言語です。",

  // Others / Tools
  git: "Git は分散型バージョン管理システムです。",
  jest: "Jest は JavaScript のためのテスティングフレームワークです。",
  cypress: "Cypress は E2E テストフレームワークです。",
  playwright: "Playwright はモダンな E2E テストフレームワークです。",
  storybook: "Storybook は UI コンポーネントを分離して開発・ドキュメント化するツールです。",
};
