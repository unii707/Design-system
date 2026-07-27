# Design System 규칙서

> 이 문서는 이 저장소(회사 전용 디자인 시스템 라이브러리)를 사용하거나 수정하는
> 모든 개발자와 Claude가 공통으로 따라야 하는 규칙입니다. 코드와 문서가 어긋나면
> 반드시 이 문서를 먼저 업데이트하고 코드를 바꾸세요 (문서 우선 원칙).

## 1. 목적

이 디자인 시스템은 AntD를 기반으로 하되, **회사의 여러 프로젝트에서 반복 재사용**하기
위해 만들어졌습니다. 목표는 다음 두 가지입니다.

1. 새 프로젝트를 시작할 때마다 색상/여백/타이포그래피를 다시 정의하지 않고, 이 패키지를
   설치하고 `CompanyProvider`로 감싸는 것만으로 일관된 디자인이 적용되게 한다.
2. 브랜드 리뉴얼이나 서브 브랜드(화이트라벨) 대응 시, **`tokens.ts`의 원시값만 바꾸면**
   전체 프로젝트에 일괄 반영되게 한다.

## 2. 핵심 원칙

- **단일 진실 공급원(SSOT)**: 모든 색상/크기/여백 값은 `theme/tokens.ts`에서만
  정의한다. 컴포넌트 코드, CSS, 인라인 스타일 어디에도 hex 코드나 px 값을
  직접 하드코딩하지 않는다.
- **레이어 분리**: `tokens.ts`는 UI 라이브러리를 전혀 모르는 순수 값만 담고,
  `theme/index.ts`는 그 값을 AntD 이름으로 변환하는 역할만 한다. 이 경계를 절대
  섞지 않는다. (자세한 이유는 §4 참고)
- **컴포넌트는 토큰을 참조만 한다**: `components/` 아래 컴포넌트는 절대 자체적으로
  색상/여백 숫자를 만들지 않는다. `tokens.ts`에서 import 하거나, AntD 테마가
  이미 주입한 값(`useToken()`)을 사용한다.

## 3. 폴더/파일 역할

```
src/
  theme/
    tokens.ts     # 브랜드 전용 원시·시맨틱 토큰 정의 (라이브러리 중립)
    index.ts      # tokens.ts → AntD ThemeConfig 매핑 + CompanyProvider
  components/     # AntD를 감싸거나 커스텀한 회사 전용 공통 컴포넌트
  index.ts        # 라이브러리 통합 진입점 (단일 참조 경로)
```

| 파일 | 알아도 되는 것 | 알면 안 되는 것 |
|---|---|---|
| `tokens.ts` | 색상 hex, px 값, 스케일 구조 | AntD API 이름 (`colorPrimary`, `controlHeight` 등) |
| `index.ts` | AntD `ThemeConfig`, `ConfigProvider` | 새로운 원시 값을 여기서 직접 만드는 것 (금지) |
| `components/*` | `tokens.ts`, AntD 컴포넌트 | 원시 색상 hex를 직접 쓰는 것 (금지) |

## 4. 왜 `tokens.ts`를 라이브러리 중립으로 두는가

지금은 AntD로 프로젝트를 만들지만, 앞으로 다른 UI 라이브러리(MUI, Chakra 등)를 쓰는
프로젝트가 생길 수 있습니다. `tokens.ts`가 AntD 이름(`colorBgContainer` 등)을 그대로
쓰고 있으면 그때 이 파일 자체를 다시 짜야 합니다. 대신 지금 구조는:

```
tokens.ts (라이브러리 중립, 그대로 재사용)
   ↓
theme/index.ts        → AntD 매핑    (지금 사용)
theme/index.mui.ts     → MUI 매핑     (필요 시 추가)
theme/index.chakra.ts  → Chakra 매핑  (필요 시 추가)
```

즉 **새 UI 라이브러리 도입 = 매핑 파일 하나 추가**로 끝나고, 원시 토큰은 건드리지
않습니다.

## 5. `tokens.ts` 토큰 카테고리

| 카테고리 | export 이름 | 설명 |
|---|---|---|
| Color | `colorTokens` | brand/gray 10단계 스케일 + semantic(success/warning/error/info) |
| Text | `textTokens` | opacity 기반 텍스트 컬러. `onLight`(밝은 배경)/`onDark`(어두운·컬러 배경) |
| Typography | `typographyTokens` | fontFamily, fontSize, fontWeight, lineHeight |
| Spacing | `spacingTokens` | 8px 그리드 (`unit: 8`) |
| Radius/Border | `radiusTokens`, `borderTokens` | 모서리 둥글기, 보더 두께 |
| Size | `sizeTokens` | 컨트롤 공통 높이(sm/base/lg) |
| Shadow | `shadowTokens` | elevation |
| Motion | `motionTokens` | duration, easing curve |
| Breakpoint | `breakpointTokens` | 반응형 기준값 |
| Z-index | `zIndexTokens` | 레이어 우선순위 |
| Opacity | `opacityTokens` | hover/disabled/overlay 상태 투명도 |
| Component | `componentTokens` | 버튼/인풋/테이블 등 컴포넌트 단위로 자주 같이 쓰이는 값 묶음 (라이브러리 중립) |

### Color 스케일 규칙

`colorTokens.brand`는 `500`을 base primary로 두고, white/black을 mix하는 방식으로
파생됩니다 (`50` = 흰색에 가장 가까움 → `900` = 검은색에 가장 가까움). **리브랜딩
시 `500`만 바꾸고 나머지 단계는 동일 비율로 재계산**하세요. 손으로 hover/active
hex를 따로 정하지 않습니다.

## 6. `theme/index.ts` 규칙

- `token` 최상위에는 AntD의 `SeedToken`/`AliasToken`만 오버라이드한다.
- 컴포넌트별 세부 조정은 반드시 `components: {...}` 안에서만 하고, `componentTokens`
  (tokens.ts)를 참조한다. AntD 필드 이름에 맞는 리터럴 값을 `index.ts`에서
  직접 만들지 않는다 — 값이 필요하면 `tokens.ts`에 먼저 추가한다.
- `index.ts`가 export하는 것: `companyTheme`(ThemeConfig), `CompanyProvider`(컴포넌트),
  그리고 `export * from './tokens'` (하위 프로젝트에서 원시 토큰을 직접 참조할 수 있게).

## 7. `components/` 작성 규칙

- 새 공통 컴포넌트를 추가할 때는 AntD 컴포넌트를 감싸는 형태를 우선 고려한다
  (완전 새로 만들지 않는다).
- 스타일이 필요하면 `tokens.ts`의 값을 import 하거나, AntD의 `theme.useToken()`으로
  이미 주입된 값을 사용한다. 절대 새 hex/px 값을 그 자리에서 만들지 않는다.
- 컴포넌트 전용 값이 반복적으로 필요하면, 그 자리에서 만들지 말고 `tokens.ts`의
  `componentTokens`에 먼저 추가한 뒤 가져다 쓴다.
- 여러 화면에서 반복되는 UI 조합(검색바, 삭제 확인 버튼 등)은 `src/components/<ComponentName>/`에
  폴더 단위로 추가하고 `src/components/index.ts`에서 export 한다.
- 공통 컴포넌트는 항상 `CompanyProvider`가 적용된 상태를 가정하고 작성하며, 자체적으로
  테마를 재정의하지 않는다.
- **새 공통 컴포넌트를 추가할 때는 같은 폴더에 `*.stories.tsx`를 함께 작성하는 것이
  필수다.** props로 노출되는 값은 `argTypes`의 `control`로 연결해 Storybook UI에서
  바로 조작할 수 있게 한다. 스토리가 없는 컴포넌트는 리뷰에서 반려한다.

### Storybook 실행

- `npm run storybook` — 개발 서버 실행 (`http://localhost:6006`). `.storybook/preview.tsx`의
  `CompanyProvider` decorator가 모든 스토리에 자동으로 적용되므로, 별도로 Provider를
  감싸지 않아도 브랜드 테마(색상/폰트/여백 등)가 반영된 상태로 렌더링된다.
- `npm run build-storybook` — 정적 빌드 (`storybook-static/`, git 추적 제외).

## 8. 새 프로젝트에 이 디자인 시스템을 적용하는 절차

1. 패키지 설치 후 최상단에 `CompanyProvider`로 감싼다.
2. 브랜드가 동일하면 `tokens.ts`를 그대로 사용한다.
3. 서브 브랜드/화이트라벨이라면 `tokens.ts`를 프로젝트 로컬에서 override하거나,
   `colorTokens.brand[500]` 등 필요한 값만 교체한 파생 버전을 만든다. (§5 스케일
   규칙을 따를 것 — hover/active를 손으로 다시 정하지 않는다.)
4. AntD가 아닌 다른 라이브러리를 쓰는 프로젝트라면, `tokens.ts`는 그대로 가져오고
   해당 라이브러리용 매핑 파일만 새로 작성한다 (§4 참고).

## 9. AntD Layout 전용 가이드 (Flex / Space)

### 9.1 원칙
- 레이아웃(정렬, 배치, 줄바꿈, 요소 간 간격)은 **오직 AntD의 `Flex`와 `Space` 컴포넌트로만** 구성한다.
- `div` + CSS(`display: flex`, `justify-content`, `gap` 등)를 직접 작성하는 것을 금지한다.
- `Row`/`Col`(그리드 시스템)이 필요한 표 형태 레이아웃을 제외하면, 대부분의 화면 레이아웃은 `Flex`로 충분하다.

### 9.2 사용 기준
| 상황 | 사용 컴포넌트 |
|---|---|
| 가로/세로 배치, 정렬, 줄바꿈이 필요한 일반 레이아웃 | `Flex` |
| 버튼 그룹, 태그 그룹처럼 동일한 간격의 인라인 나열 | `Space` |
| 대시보드/폼의 반응형 그리드 | `Row` / `Col` |

### 9.3 예시

```tsx
// ✅ 올바른 예 — Flex + 토큰 간격
<Flex vertical gap={spacingTokens.md}>
  <Flex justify="space-between" align="center">
    <Typography.Title level={4}>목록</Typography.Title>
    <Space size={spacingTokens.sm}>
      <Button>내보내기</Button>
      <Button type="primary">추가</Button>
    </Space>
  </Flex>
</Flex>

// ❌ 금지 — 직접 CSS로 레이아웃 구성
<div style={{ display: 'flex', justifyContent: 'space-between' }}>...</div>
```

## 10. 커스텀 CSS / inline style 사용 금지

### 10.1 원칙
- **`style` prop, `.css` 파일 신규 클래스, `styled-components` 등 커스텀 스타일링을 금지한다.**
- 색상, 여백, 폰트, 정렬, 배치 등 시각적 스타일은 전부 다음 중 하나로만 표현한다.
  1. `CompanyProvider`가 주입하는 전역 테마 토큰 (기본값 그대로 사용)
  2. AntD 컴포넌트가 제공하는 공식 props (`type`, `size`, `gap`, `align`, `justify`, `danger` 등)
  3. `theme/tokens.ts`의 브랜드 토큰 (컴포넌트 props로 전달하는 경우에 한함)
- `App.css`, `index.css` 같은 전역 CSS 파일에 새로운 규칙을 추가하지 않는다. (리셋/폰트 로딩 등 최소 설정만 예외)

### 10.2 유일한 예외 — 치수 제약
- AntD에 전용 props가 없는 **폭(width) 제약**(`minWidth`, `maxWidth`)에 한해서만 `style`을 허용한다.
  (예: `Select`, `Input.Search`의 최소/최대 너비 지정)
- 이 경우에도 색상/여백/폰트 값은 절대 넣지 않으며, 숫자는 임의값이 아니라 UX상 근거가 있는 값이어야 한다.
- 그 외 모든 시각적 속성(색상, 굵기, 그림자, radius 등)에는 `style`을 사용하지 않는다.

```tsx
// ✅ 허용되는 유일한 예외 — 치수 제약만
<Select style={{ minWidth: 160 }} options={options} />

// ❌ 금지 — 색상/여백을 inline style로
<Button style={{ backgroundColor: '#1B6EF3', marginLeft: 8 }}>저장</Button>
```

### 10.3 위반 시 대체 방법
| 하고 싶은 것 | 하지 말 것 | 대신 할 것 |
|---|---|---|
| 버튼 강조 색상 변경 | `style={{ background: '#f00' }}` | `type="primary"`, `danger` prop 사용 |
| 요소 간 간격 조정 | `style={{ marginRight: 12 }}` | `Flex`/`Space`의 `gap`/`size` + `spacingTokens` |
| 폰트 크기 변경 | `style={{ fontSize: 18 }}` | `Typography` 컴포넌트의 `level`/`type` props |
| 전역 색상 변경 | 컴포넌트별 `style` 덮어쓰기 | `tokens.ts` 수정 → `companyTheme`에 자동 반영 |

## 11. 하지 말아야 할 것 (안티패턴)

- ❌ 컴포넌트 코드에 `#0248FF`, `16px` 같은 값을 직접 쓰기
- ❌ `tokens.ts`에 `colorBgContainer`, `controlHeight` 같은 AntD 전용 이름 넣기
- ❌ `index.ts`에서 `tokens.ts`를 거치지 않은 새 원시값 정의하기
- ❌ 같은 개념(예: 버튼 높이)을 두 군데에서 서로 다른 값으로 중복 정의하기
- ❌ `as const` 없이 토큰 객체 export 하기 (타입 추론이 느슨해짐)

## 12. 변경 이력 관리

- `tokens.ts`의 값이 바뀌면(특히 `colorTokens.brand`, `spacingTokens`, `sizeTokens`)
  이 문서의 관련 표를 함께 업데이트한다.
- Breaking change(카테고리 이름 변경, 필드 삭제 등)는 패키지 버전을 올리고,
  이 문서 최상단에 변경 일자와 요약을 남긴다.
- `theme/`(`tokens.ts`, `index.ts`) 관련 변경은 `main`에 직접 push하지 않고,
  반드시 별도 브랜치를 만들어 PR로 진행한다.

---

_최종 수정: 이 문서는 `tokens.ts`/`index.ts` 하이브리드 구조(프레임워크 중립 토큰 계층 +
AntD 매핑 계층) 확정 시점 기준으로 작성되었습니다. 구조를 변경하면 반드시 이 문서도
함께 수정하세요._
