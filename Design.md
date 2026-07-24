# Design.md — 회사 디자인 시스템 가이드

이 문서는 우리 회사 프론트엔드 프로젝트에서 UI를 작성할 때 반드시 지켜야 하는
디자인 규칙을 정의합니다. `src/theme`, `src/components`가 이 가이드의 구현체이며,
모든 신규 화면과 컴포넌트는 이 가이드를 따라야 합니다.

관련 코드:
- 원시 토큰: `src/theme/tokens.ts`
- 테마/Provider: `src/theme/index.ts`
- 공통 컴포넌트: `src/components/`
- 통합 진입점: `src/index.ts`

---

## 1. 브랜드 토큰 규칙

### 1.1 원칙
- 색상, 폰트, 간격, 크기, 그림자 등 모든 디자인 값은 **`src/theme/tokens.ts`의 원시 토큰**에서만 가져옵니다.
- 화면/컴포넌트 코드에 `#1B6EF3`, `16px`, `bold` 같은 값을 직접 타이핑하는 것을 금지합니다.
- 새로운 값이 필요하면 먼저 `tokens.ts`에 토큰을 추가하고, 그 토큰을 참조합니다.

### 1.2 토큰 카탈로그

| 그룹 | 내보내는 이름 | 설명 |
|---|---|---|
| 색상 | `BRAND_COLORS` | Primary `#1B6EF3` 및 시맨틱/중립 색상 |
| 타이포그래피 | `BRAND_TYPOGRAPHY` | 폰트 패밀리, 크기, 굵기, 행간 |
| 간격 | `BRAND_SPACING` | **8px 그리드** 기반 (`xxs:2 xs:4 sm:8 md:16 lg:24 xl:32 xxl:40`) |
| 크기 | `BRAND_SIZES` | 컨트롤 높이(기본 `38px`), 모서리 반경(기본 `8px`) |
| 그림자 | `BRAND_SHADOWS` | `sm` / `base` / `lg` 3단계 |

### 1.3 8px 그리드 규칙
- 컴포넌트 내부/외부 여백은 항상 `BRAND_SPACING`의 값(8의 배수)만 사용합니다.
- 임의의 여백(예: `10px`, `13px`)을 절대 사용하지 않습니다.
- AntD의 `gap`, `padding`, `margin` 계열 props에는 숫자 리터럴 대신 `BRAND_SPACING.*`을 전달합니다.

```tsx
// ✅ 올바른 예
<Flex gap={BRAND_SPACING.md}>...</Flex>

// ❌ 금지
<Flex gap={20}>...</Flex>
```

### 1.4 컨트롤 크기 규칙
- Button/Input/Select 등 폼 컨트롤의 기본 높이는 `38px`(`BRAND_SIZES.controlHeight`)입니다.
- 이는 `companyTheme`의 `token.controlHeight`와 `components.Button/Input/Select`에 이미 매핑되어 있으므로,
  **개별 컴포넌트에서 높이를 임의로 재정의하지 않습니다.**
- 모서리 반경은 기본 `8px`(`BRAND_SIZES.borderRadius`)이며, 마찬가지로 테마에서 전역 적용됩니다.

---

## 2. AntD Layout 전용 가이드 (Flex / Space)

### 2.1 원칙
- 레이아웃(정렬, 배치, 줄바꿈, 요소 간 간격)은 **오직 AntD의 `Flex`와 `Space` 컴포넌트로만** 구성합니다.
- `div` + CSS(`display: flex`, `justify-content`, `gap` 등)를 직접 작성하는 것을 금지합니다.
- `Row`/`Col`(그리드 시스템)이 필요한 표 형태 레이아웃을 제외하면, 대부분의 화면 레이아웃은 `Flex`로 충분합니다.

### 2.2 사용 기준
| 상황 | 사용 컴포넌트 |
|---|---|
| 가로/세로 배치, 정렬, 줄바꿈이 필요한 일반 레이아웃 | `Flex` |
| 버튼 그룹, 태그 그룹처럼 동일한 간격의 인라인 나열 | `Space` |
| 대시보드/폼의 반응형 그리드 | `Row` / `Col` |

### 2.3 예시

```tsx
// ✅ 올바른 예 — Flex + 토큰 간격
<Flex vertical gap={BRAND_SPACING.md}>
  <Flex justify="space-between" align="center">
    <Typography.Title level={4}>목록</Typography.Title>
    <Space size={BRAND_SPACING.sm}>
      <Button>내보내기</Button>
      <Button type="primary">추가</Button>
    </Space>
  </Flex>
</Flex>

// ❌ 금지 — 직접 CSS로 레이아웃 구성
<div style={{ display: 'flex', justifyContent: 'space-between' }}>...</div>
```

---

## 3. 커스텀 CSS / inline style 사용 금지

### 3.1 원칙
- **`style` prop, `.css` 파일 신규 클래스, `styled-components` 등 커스텀 스타일링을 금지합니다.**
- 색상, 여백, 폰트, 정렬, 배치 등 시각적 스타일은 전부 다음 중 하나로만 표현합니다.
  1. `CompanyProvider`가 주입하는 전역 테마 토큰 (기본값 그대로 사용)
  2. AntD 컴포넌트가 제공하는 공식 props (`type`, `size`, `gap`, `align`, `justify`, `danger` 등)
  3. `src/theme/tokens.ts`의 브랜드 토큰 (컴포넌트 props로 전달하는 경우에 한함)
- `App.css`, `index.css` 같은 전역 CSS 파일에 새로운 규칙을 추가하지 않습니다. (리셋/폰트 로딩 등 최소 설정만 예외)

### 3.2 유일한 예외 — 치수 제약
- AntD에 전용 props가 없는 **폭(width) 제약**(`minWidth`, `maxWidth`)에 한해서만 `style`을 허용합니다.
  (예: `Select`, `Input.Search`의 최소/최대 너비 지정)
- 이 경우에도 색상/여백/폰트 값은 절대 넣지 않으며, 숫자는 임의값이 아니라 UX상 근거가 있는 값이어야 합니다.
- 그 외 모든 시각적 속성(색상, 굵기, 그림자, radius 등)에는 `style`을 사용하지 않습니다.

```tsx
// ✅ 허용되는 유일한 예외 — 치수 제약만
<Select style={{ minWidth: 160 }} options={options} />

// ❌ 금지 — 색상/여백을 inline style로
<Button style={{ backgroundColor: '#1B6EF3', marginLeft: 8 }}>저장</Button>
```

### 3.3 위반 시 대체 방법
| 하고 싶은 것 | 하지 말 것 | 대신 할 것 |
|---|---|---|
| 버튼 강조 색상 변경 | `style={{ background: '#f00' }}` | `type="primary"`, `danger` prop 사용 |
| 요소 간 간격 조정 | `style={{ marginRight: 12 }}` | `Flex`/`Space`의 `gap`/`size` + `BRAND_SPACING` |
| 폰트 크기 변경 | `style={{ fontSize: 18 }}` | `Typography` 컴포넌트의 `level`/`type` props |
| 전역 색상 변경 | 컴포넌트별 `style` 덮어쓰기 | `tokens.ts` 수정 → `companyTheme`에 자동 반영 |

---

## 4. 신규 공통 컴포넌트 규칙
- 여러 화면에서 반복되는 UI 조합(검색바, 삭제 확인 버튼 등)은 `src/components/<ComponentName>/`에
  폴더 단위로 추가하고 `src/components/index.ts`에서 export 합니다.
- 공통 컴포넌트는 항상 `CompanyProvider`가 적용된 상태를 가정하고 작성하며, 자체적으로 테마를 재정의하지 않습니다.
