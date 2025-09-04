# Run

```bash
# package install
pnpm i

# run develop
pnpm dev

# package audit
pnpm audit

# workspace outdated
cd /apps/api || cd /apps/web && pnpm outdated
```

# Fortem

Sui 블록체인 기반 분산 애플리케이션 (DApp) - 모노레포 구조

## 🏗️ 프로젝트 구조

```
fortem/
├── apps/                   # 애플리케이션들
│   ├── api/               # Backend API 서버 (NestJS)
│   └── web/               # Frontend 웹앱 (Next.js)
├── packages/              # 공유 라이브러리
│   ├── core/             # DB, 엔티티, 공통 모듈
│   └── shared/           # 타입, 상수, 유틸리티
└── 설정 파일들...
```

## 🚀 빠른 시작

### 개발 환경 설정
```bash
# 1. 저장소 클론
git clone https://github.com/DillonMemo/monorepo-with-pnpm
cd monorepo-with-pnpm

# 2. 의존성 설치
pnpm install

# 3. 개발 서버 실행 (API + Web)
pnpm dev
```

### 개별 서비스 실행
```bash
# API 서버만 실행
pnpm dev:api

# 웹 앱만 실행
pnpm dev:web

# 배치 서버 실행
pnpm dev:batch
```

## 🔧 빌드 & 배포

### 빌드 순서 (중요!)
```bash
# 전체 빌드 (올바른 순서로 자동 실행)
pnpm build

# 단계별 빌드
pnpm build:shared    # 1. shared 패키지 먼저
pnpm build:api       # 2. API 서버
pnpm build:web       # 3. 웹 앱
```

## 📦 워크스페이스 의존성 관리

### ✅ 올바른 패키지 설치
```bash
# 루트에서 워크스페이스 단위로 설치
pnpm add package-name --filter api
pnpm add package-name --filter web
pnpm add package-name --filter @name/shared

# 공통 의존성은 루트에 추가
pnpm add package-name
```

### ❌ 하지 말아야 할 것
```bash
# 개별 앱에서 직접 설치 금지
cd apps/api && pnpm add package-name  # ❌
```

## 🔄 Git 워크플로우 & 커밋 컨벤션

### 브랜치 생성 & 개발 시작
```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### Conventional Commits
```bash
# 커밋 타입
feat:     ✨ 새로운 기능
fix:      🐛 버그 수정
docs:     📚 문서 수정
style:    💄 코드 포맷팅
refactor: ♻️ 리팩토링
test:     🧪 테스트 추가/수정
chore:    🔧 빌드, 패키지 매니저 등
perf:     ⚡ 성능 개선
ci:       👷 CI/CD 관련
build:    🏗️ 빌드 시스템 관련
revert:   ⏪ 이전 커밋 되돌리기

# 예시
git commit -m "feat: add user authentication module"
git commit -m "fix: resolve memory leak in data processing"
git commit -m "docs: update API documentation"
```

### 릴리즈 생성
```bash
yarn release
```
자동으로 실행되는 과정:
- Conventional Commits 기반 버전 계산
- CHANGELOG.md 자동 생성/업데이트
- Git 태그 생성 (v0.1.2 형태)
- GitHub Release 생성
- 모든 package.json 버전 동기화

## 🛠️ 개발 시 주의사항

### 빌드 순서 준수
- `shared` → `core` → `apps` 순서로 빌드해야 함
- `yarn dev` 명령어가 올바른 순서로 자동 실행

### 패키지 간 Import 규칙
```typescript
// ✅ 올바른 import (workspace 이름 사용)
import { SomeType } from '@fortem/shared';
import { DatabaseModule } from '@fortem/core';

// ❌ 상대 경로 사용 금지
import { SomeType } from '../../packages/shared/src';
```

### 코드 변경 시 영향도
- **shared 패키지 수정** → 모든 앱 재빌드 필요
- **core 패키지 수정** → api, batch 앱 재빌드 필요
- **개별 앱 수정** → 해당 앱만 재빌드

### 자주 발생하는 문제 해결
```bash
# "Module not found @fortem/shared" 에러
pnpm build:shared && pnpm build:core

# 의존성 충돌 시
rm -rf node_modules pnpm-lock.yaml
pnpm install

# TypeScript 캐시 문제 시
find . -name "tsconfig.tsbuildinfo" -delete
```

## 🧪 테스트 & 검증

### 커밋 전 체크리스트
```bash
pnpm build                          # 빌드 성공 확인

# 개별 앱 린트 & 테스트
pnpm --filter api run lint     # API 린트 검사
pnpm --filter api run test     # API 테스트 실행
pnpm --filter web run lint     # Web 린트 검사
```

<!-- ### 컨트랙트 테스트
```bash
yarn contracts:test     # Move 테스트 실행
yarn contracts:build   # 컴파일 검증
``` -->

## 📚 추가 리소스

- [Sui Documentation](https://docs.sui.io/)
- [Move Language Book](https://move-language.github.io/move/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Yarn Workspaces](https://classic.yarnpkg.com/docs/workspaces/)

## 🔗 관련 링크

- **Testnet Explorer**: https://suiexplorer.com/?network=testnet
- **Mainnet Explorer**: https://suiexplorer.com/?network=mainnet
- **Sui Faucet**: https://discord.com/invite/sui

---

## 팀원들에게 중요한 알림 🚨

1. **절대 개별 앱에서 직접 패키지 설치하지 마세요**
2. **빌드 순서를 무시하고 개별 실행하지 마세요**
3. **메인넷 배포 전에는 반드시 테스트넷에서 검증하세요**
4. **컨트랙트 배포 후 패키지 ID를 잊지 말고 기록하세요**
5. **커밋 컨벤션을 반드시 지켜주세요**

============== Deprecated Start ==============
## 🌐 스마트 컨트랙트 개발 & 배포

### 컨트랙트 개발 플로우
```bash
# 1. 컨트랙트 코드 작성 (contracts/sources/)
# 2. 테스트 실행
yarn contracts:test

# 3. 빌드 확인
yarn contracts:build

# 4. 커밋
git commit -m "feat: add new contract functionality"
```

### 환경별 배포

#### 테스트넷 배포
```bash
# 기본 테스트넷 배포
yarn contracts:deploy
# 또는
yarn contracts:deploy:testnet

# 환경 스위치만
yarn contracts:switch:testnet
```

#### 메인넷 배포
```bash
# 메인넷 배포 (의존성 검증 포함)
yarn contracts:deploy:mainnet

# 환경 스위치만
yarn contracts:switch:mainnet
```

#### 고급 배포 옵션
```bash
# 커스텀 가스 예산으로 배포
cd contracts && ./deploy.sh -e testnet -g 50000000

# 의존성 검증과 함께 배포
cd contracts && ./deploy.sh -e mainnet -v

# 도움말
cd contracts && ./deploy.sh -h
```

### 배포 후 중요 작업
1. **패키지 ID 기록**: 배포 후 나오는 Package ID를 반드시 저장
2. **팀 공유**: 새로운 컨트랙트 주소를 팀원들과 공유
3. **환경 설정 업데이트**: 프론트엔드/백엔드에서 새 컨트랙트 주소 사용
4. **트랜잭션 확인**: [Sui Explorer](https://suiexplorer.com)에서 배포 트랜잭션 확인
============== Deprecated End ==============