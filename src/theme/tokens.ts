/**
 * 브랜드 원시 토큰 (Primitive Tokens)
 *
 * 이 파일은 디자인 시스템의 "단일 진실 공급원(Single Source of Truth)"입니다.
 * 색상, 타이포그래피, 여백, 크기, 그림자 등 모든 값은 반드시 이 파일에서만 정의하고,
 * 다른 코드에서는 이 토큰을 참조해서 사용해야 합니다. (하드코딩 금지)
 */

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
export const BRAND_COLORS = {
  // 회사 브랜드 Primary 컬러
  primary: '#1B6EF3',
  primaryHover: '#4A8EF7',
  primaryActive: '#1355C7',
  primaryBg: '#EAF2FE',
  primaryBorder: '#B9D4FC',

  // 시맨틱 컬러
  success: '#1DAA6F',
  warning: '#F5A623',
  error: '#E5484D',
  info: '#1B6EF3',

  // 중립 컬러 (텍스트/배경/보더)
  textPrimary: 'rgba(0, 0, 0, 0.88)',
  textSecondary: 'rgba(0, 0, 0, 0.65)',
  textTertiary: 'rgba(0, 0, 0, 0.45)',
  textDisabled: 'rgba(0, 0, 0, 0.25)',

  bgLayout: '#F5F6F8',
  bgContainer: '#FFFFFF',
  bgSpotlight: '#FAFAFA',

  border: '#E3E5E8',
  borderSecondary: '#EDEEF0',
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------
export const BRAND_TYPOGRAPHY = {
  fontFamily:
    "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",

  fontSizeSm: 12,
  fontSizeBase: 14,
  fontSizeLg: 16,
  fontSizeXl: 20,
  fontSizeHeading: 24,

  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  lineHeightBase: 1.5,
} as const;

// ---------------------------------------------------------------------------
// Spacing — 8px 그리드 시스템
// ---------------------------------------------------------------------------
export const BRAND_SPACING = {
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
// Sizes — 컴포넌트 치수 (기본 높이 38px)
// ---------------------------------------------------------------------------
export const BRAND_SIZES = {
  controlHeightSm: 30,
  controlHeight: 38,
  controlHeightLg: 46,

  borderRadiusSm: 4,
  borderRadius: 8,
  borderRadiusLg: 12,
} as const;

// ---------------------------------------------------------------------------
// Shadows
// ---------------------------------------------------------------------------
export const BRAND_SHADOWS = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.06)',
  base: '0 2px 8px rgba(0, 0, 0, 0.08)',
  lg: '0 6px 16px rgba(0, 0, 0, 0.12)',
} as const;
