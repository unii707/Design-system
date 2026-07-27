/**
 * 브랜드 원시 & 시맨틱 토큰 (Design Tokens)
 *
 * 이 파일은 디자인 시스템의 "단일 진실 공급원(Single Source of Truth)"입니다.
 * 색상, 타이포그래피, 여백, 크기, 그림자 등 모든 값은 반드시 이 파일에서만 정의하고,
 * 다른 코드에서는 이 토큰을 참조해서 사용해야 합니다. (하드코딩 금지)
 *
 * 중요: 이 파일은 특정 UI 라이브러리(AntD, MUI, Chakra 등)를 전혀 알지 못하는
 * "프레임워크 중립" 계층입니다. 새 프로젝트에서 다른 UI 라이브러리를 쓰게 되더라도
 * 이 파일은 그대로 재사용하고, "이 토큰을 라이브러리 컴포넌트에 어떻게 매핑할지"만
 * 라이브러리별 매핑 파일(예: AntD용 index.ts)에서 새로 작성하면 됩니다.
 */

// ---------------------------------------------------------------------------
// 1. Color — Primitive Scale
// ---------------------------------------------------------------------------
// brand 스케일은 primary(#0248FF)를 기준으로 white/black과 mix하여 파생했습니다.
// 리브랜딩 시 500(base)만 교체하고 동일한 mix 비율로 재계산하면
// hover/active 등 나머지 단계가 자동으로 따라옵니다.
// (400 ≈ 기존 primaryHover, 700 ≈ 기존 primaryActive 와 근사)
export const colorTokens = {
  brand: {
    50: '#EBF0FF',
    100: '#D1DEFF',
    200: '#A6BFFF',
    300: '#7BA0FF',
    400: '#5383FF',
    500: '#0248FF', // base primary
    600: '#0241E6',
    700: '#023ACF',
    800: '#0131AD',
    900: '#01288C',
  },

  gray: {
    50: '#FAFAFA',
    100: '#F5F6F8',
    200: '#EDEEF0',
    300: '#E3E5E8',
    400: '#D0D3D7',
    500: '#A6ABB2',
    600: '#787E87',
    700: '#565C64',
    800: '#33383E',
    900: '#1A1D21',
  },

  semantic: {
    success: { light: '#E7F8F1', base: '#1DAA6F', dark: '#128052' },
    warning: { light: '#FEF3E2', base: '#F5A623', dark: '#C27F0E' },
    error: { light: '#FCEAEA', base: '#E5484D', dark: '#B7282D' },
    info: { light: '#E9F1FE', base: '#1B6EF3', dark: '#0F52C4' },
  },

  base: {
    white: '#FFFFFF',
    black: '#000000',
  },
} as const;

// ---------------------------------------------------------------------------
// 2. Text — Opacity 기반 시맨틱 텍스트 컬러
// ---------------------------------------------------------------------------
// 고정 hex 대신 opacity(rgba)를 쓰면 배경색이 바뀌어도(다크모드 전환 등)
// 대비가 자동으로 유지됩니다. onLight(밝은 배경) / onDark(어두운·컬러 배경)
// 두 세트로 나눠서 라이트/다크 모드와 컬러 배경(예: primary 버튼 내부 텍스트)에
// 모두 대응합니다.
export const textTokens = {
  onLight: {
    primary: 'rgba(0, 0, 0, 0.88)',
    secondary: 'rgba(0, 0, 0, 0.65)',
    tertiary: 'rgba(0, 0, 0, 0.45)',
    disabled: 'rgba(0, 0, 0, 0.25)',
  },
  onDark: {
    primary: 'rgba(255, 255, 255, 0.95)',
    secondary: 'rgba(255, 255, 255, 0.75)',
    tertiary: 'rgba(255, 255, 255, 0.55)',
    disabled: 'rgba(255, 255, 255, 0.35)',
  },
} as const;

// ---------------------------------------------------------------------------
// 3. Typography
// ---------------------------------------------------------------------------
export const typographyTokens = {
  fontFamily: {
    base: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    code: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
  },
  fontSize: {
    sm: 12,
    base: 14,
    lg: 16,
    xl: 20,
    heading: 24,
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    base: 1.5,
  },
} as const;

// ---------------------------------------------------------------------------
// 4. Spacing — 8px 그리드 시스템
// ---------------------------------------------------------------------------
export const spacingTokens = {
  unit: 8,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

// ---------------------------------------------------------------------------
// 5. Radius / Border
// ---------------------------------------------------------------------------
export const radiusTokens = {
  sm: 4,
  base: 8,
  lg: 12,
  full: 9999,
} as const;

export const borderTokens = {
  widthThin: 1,
  widthBase: 1,
  widthThick: 2,
} as const;

// ---------------------------------------------------------------------------
// 6. Size — 컴포넌트 공통 치수 기준
// ---------------------------------------------------------------------------
export const sizeTokens = {
  controlHeightSm: 24,
  controlHeightBase: 32,
  controlHeightLg: 40,
} as const;

// ---------------------------------------------------------------------------
// 7. Shadow
// ---------------------------------------------------------------------------
export const shadowTokens = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.06)',
  base: '0 2px 8px rgba(0, 0, 0, 0.08)',
  lg: '0 6px 16px rgba(0, 0, 0, 0.12)',
} as const;

// ---------------------------------------------------------------------------
// 8. Motion — 신규
// ---------------------------------------------------------------------------
export const motionTokens = {
  duration: {
    fast: 0.1,
    base: 0.2,
    slow: 0.3,
  },
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ---------------------------------------------------------------------------
// 9. Breakpoint — 신규
// ---------------------------------------------------------------------------
export const breakpointTokens = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;

// ---------------------------------------------------------------------------
// 10. Z-index — 신규
// ---------------------------------------------------------------------------
export const zIndexTokens = {
  base: 0,
  sticky: 1020,
  dropdown: 1050,
  modal: 1000,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

// ---------------------------------------------------------------------------
// 11. Opacity — 상태 값, 신규
// ---------------------------------------------------------------------------
export const opacityTokens = {
  hover: 0.85,
  disabled: 0.4,
  overlay: 0.45,
} as const;

// ---------------------------------------------------------------------------
// 12. Component Semantic Primitives
// ---------------------------------------------------------------------------
// "어떤 값을 쓸지"만 정의하는 라이브러리 중립 계층입니다.
// "AntD Button API의 어떤 필드에 넣을지" 같은 매핑은 라이브러리별 매핑 파일
// (예: AntD용 index.ts)에서만 담당합니다.
//
// sizeTokens 기준으로 통일
export const componentTokens = {
  button: {
    height: {
      sm: sizeTokens.controlHeightSm,
      base: sizeTokens.controlHeightBase,
      lg: sizeTokens.controlHeightLg,
    },
    paddingInline: { sm: 12, base: spacingTokens.md, lg: spacingTokens.lg },
    fontSize: { sm: 13, base: typographyTokens.fontSize.base, lg: typographyTokens.fontSize.lg },
    fontWeight: typographyTokens.fontWeight.semibold,
    borderRadius: { sm: 6, base: radiusTokens.base, lg: radiusTokens.base },
  },
  input: {
    height: {
      sm: sizeTokens.controlHeightSm,
      base: sizeTokens.controlHeightBase,
      lg: sizeTokens.controlHeightLg,
    },
    borderRadius: radiusTokens.base,
  },
  table: {
    headerBg: colorTokens.gray[50],
    headerColor: textTokens.onLight.primary,
    cellPaddingBlock: spacingTokens.sm,
    cellPaddingInline: spacingTokens.md,
    rowHoverBg: colorTokens.brand[50],
    borderRadius: radiusTokens.base,
  },
} as const;
