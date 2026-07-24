# CLAUDE.md

이 저장소는 우리 회사 전용 디자인 시스템 라이브러리입니다.
Claude Code가 이 프로젝트에서 UI 관련 작업(신규 화면, 컴포넌트 수정, 리팩터링 등)을 수행할 때는
아래 지침을 **최우선 규칙**으로 따라야 합니다. 코드 스타일이나 개인적 선호보다 이 문서가 우선합니다.

## 최우선 준수 사항

1. **`Design.md`를 항상 먼저 확인한다.**
   UI 관련 작업을 시작하기 전에 반드시 루트의 `Design.md`를 읽고, 거기 정의된
   브랜드 토큰 규칙 / Flex·Space 레이아웃 가이드 / inline style·커스텀 CSS 금지 규칙을 적용한다.
   내용이 모호하면 임의로 판단하지 말고 `Design.md`의 표/예시를 기준으로 판단한다.

2. **모든 화면은 `CompanyProvider`로 감싸야 한다.**
   - `CompanyProvider`는 `src/theme/index.ts`에 정의되어 있으며 `ConfigProvider` + `companyTheme`을 캡슐화한다.
   - 새 진입점(`main.tsx`, 새 앱, 스토리북 등)을 만들 때 `ConfigProvider`를 직접 사용하지 말고
     반드시 `CompanyProvider`만 사용한다.
   - 이미 `CompanyProvider`로 감싸진 트리 내부에서 `ConfigProvider`를 다시 사용하거나 테마를 로컬로 덮어쓰지 않는다.

3. **`src/index.ts`를 단일 참조 경로로 사용한다.**
   테마와 공통 컴포넌트는 `src/theme`, `src/components`를 직접 깊은 경로로 import하지 말고,
   가능하면 최상위 `src/index.ts`가 export하는 값을 사용한다.

4. **토큰 없이 값을 하드코딩하지 않는다.**
   색상 코드, px 값, 폰트 굵기 등을 새로 작성해야 한다면 `src/theme/tokens.ts`에
   토큰을 추가/재사용하고, 화면 코드에는 토큰 참조만 남긴다.

5. **레이아웃은 `Flex`/`Space`, 스타일은 `style` prop 대신 컴포넌트 props.**
   `Design.md` 3.2에 정의된 치수(`minWidth`/`maxWidth`) 예외를 제외하고
   `style` prop이나 신규 CSS 클래스를 작성하지 않는다.

## 작업 순서 체크리스트 (UI 작업 시)

- [ ] `Design.md`를 읽었는가?
- [ ] 이 화면/컴포넌트가 `CompanyProvider` 하위에서 렌더링되는가?
- [ ] 재사용 가능한 조합이면 `src/components/`에 공통 컴포넌트로 추출했는가?
- [ ] 색상/간격/크기 값이 전부 `tokens.ts` 또는 AntD 공식 props에서 왔는가?
- [ ] inline style / 커스텀 CSS를 추가하지 않았는가? (치수 예외 제외)

## 참고 파일
- `Design.md` — 상세 디자인 규칙
- `src/theme/tokens.ts` — 브랜드 원시 토큰
- `src/theme/index.ts` — `companyTheme`, `CompanyProvider`
- `src/components/` — 공통 컴포넌트 (`CompanySearchBar`, `ConfirmDeleteButton` 등)
- `src/index.ts` — 라이브러리 통합 진입점
