# AGENTS.md

This file provides guidance to all AI Agent when working with code in this repository.

## Commands

```bash
npm run dev    # 開発サーバー (http://localhost:3000)
npm run build  # 本番ビルド
npm run lint   # ESLint
```

テストスイートはない。UI の動作確認は `npm run dev` で実機確認する。

## 環境変数

`.env.local` が必要 (gitignore 対象)。`src/app/_clients/index.ts` で起動時に検証される。

```
TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=
YOUTUBE_API_KEY=
```

## アーキテクチャ

esports イベント参加者の Twitch/YouTube ライブ配信状況を表示する Next.js 14 App Router アプリ。

**レイヤー構造:**

```
src/app/components/    # Presentation — MUI ベースの React コンポーネント
src/app/_usecases/     # Use Case — fetchChannels / featLives (React cache() でリクエスト単位に重複排除)
src/domains/           # Domain — Channel / Stream / Team / Player の型定義
src/infrastructure/    # Infrastructure — Twitch API / YouTube API の実装
```

**イベントページのデータフロー:**

`/events/[slug]` (Server Component, ISR 300s)
→ `_config/index.ts` でスラッグからイベント設定を取得
→ `fetchChannels()` でプレイヤーのユーザー名を Channel ID に解決
→ `featLives()` でライブ中の配信を取得
→ `<ChannelList>` (Client Component) でプラットフォーム / ライブのみフィルタリング

## 重要な規約

**プレイヤー定義**: `domains/teams.ts` の `Twitch()` / `Youtube()` ファクトリ関数を使う。

```typescript
import { Twitch, Youtube } from "@/domains/teams";

Twitch("username")         // Twitch ユーザー名
Youtube("@handle")         // YouTube @ ハンドル
```

**新規イベントの追加**:
1. `src/app/events/_config/<slug>.ts` を作成して `EventConfig` 型で設定を記述
2. `src/app/events/_config/index.ts` の `events` マップに登録

**YouTube ライブ判定**: RSS フィードで動画 ID を収集 → Video API で `liveBroadcastContent === 'live'` を確認する二段階方式。チャンネル数が多い場合は API クォータに注意。

**Twitch API**: ユーザー/ストリームのリクエストは 100 件ずつチャンク処理 (`infrastructure/twitch.ts`)。

**MUI テーマ**: `youtube` / `twitch` / `live` カラーを独自拡張済み (`src/app/theme.ts`)。新しい色を追加する場合はテーマ拡張の型宣言も更新する。
