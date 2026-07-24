import { ConfigProvider, type ThemeConfig } from 'antd';
import koKR from 'antd/locale/ko_KR';
import { createElement, type PropsWithChildren } from 'react';
import {
  BRAND_COLORS,
  BRAND_SHADOWS,
  BRAND_SIZES,
  BRAND_SPACING,
  BRAND_TYPOGRAPHY,
} from './tokens';

/**
 * AntD ConfigProvider에 주입되는 회사 전용 테마.
 * 모든 값은 반드시 tokens.ts의 브랜드 원시 토큰을 참조합니다.
 */
export const companyTheme: ThemeConfig = {
  token: {
    colorPrimary: BRAND_COLORS.primary,
    colorSuccess: BRAND_COLORS.success,
    colorWarning: BRAND_COLORS.warning,
    colorError: BRAND_COLORS.error,
    colorInfo: BRAND_COLORS.info,

    colorText: BRAND_COLORS.textPrimary,
    colorTextSecondary: BRAND_COLORS.textSecondary,
    colorTextTertiary: BRAND_COLORS.textTertiary,
    colorTextDisabled: BRAND_COLORS.textDisabled,

    colorBgLayout: BRAND_COLORS.bgLayout,
    colorBgContainer: BRAND_COLORS.bgContainer,
    colorBgSpotlight: BRAND_COLORS.bgSpotlight,

    colorBorder: BRAND_COLORS.border,
    colorBorderSecondary: BRAND_COLORS.borderSecondary,

    fontFamily: BRAND_TYPOGRAPHY.fontFamily,
    fontSize: BRAND_TYPOGRAPHY.fontSizeBase,
    fontSizeSM: BRAND_TYPOGRAPHY.fontSizeSm,
    fontSizeLG: BRAND_TYPOGRAPHY.fontSizeLg,
    fontSizeXL: BRAND_TYPOGRAPHY.fontSizeXl,
    fontSizeHeading1: BRAND_TYPOGRAPHY.fontSizeHeading,
    lineHeight: BRAND_TYPOGRAPHY.lineHeightBase,

    borderRadius: BRAND_SIZES.borderRadius,
    borderRadiusSM: BRAND_SIZES.borderRadiusSm,
    borderRadiusLG: BRAND_SIZES.borderRadiusLg,

    controlHeight: BRAND_SIZES.controlHeight,
    controlHeightSM: BRAND_SIZES.controlHeightSm,
    controlHeightLG: BRAND_SIZES.controlHeightLg,

    padding: BRAND_SPACING.md,
    paddingSM: BRAND_SPACING.sm,
    paddingLG: BRAND_SPACING.lg,
    paddingXS: BRAND_SPACING.xs,

    margin: BRAND_SPACING.md,
    marginSM: BRAND_SPACING.sm,
    marginLG: BRAND_SPACING.lg,
    marginXS: BRAND_SPACING.xs,

    boxShadow: BRAND_SHADOWS.base,
    boxShadowSecondary: BRAND_SHADOWS.sm,
  },
  components: {
    Button: {
      controlHeight: BRAND_SIZES.controlHeight,
      controlHeightSM: BRAND_SIZES.controlHeightSm,
      controlHeightLG: BRAND_SIZES.controlHeightLg,
      borderRadius: BRAND_SIZES.borderRadius,
      fontWeight: BRAND_TYPOGRAPHY.fontWeightMedium,
      primaryShadow: BRAND_SHADOWS.none,
    },
    Input: {
      controlHeight: BRAND_SIZES.controlHeight,
      controlHeightSM: BRAND_SIZES.controlHeightSm,
      controlHeightLG: BRAND_SIZES.controlHeightLg,
      borderRadius: BRAND_SIZES.borderRadius,
      activeBorderColor: BRAND_COLORS.primary,
      hoverBorderColor: BRAND_COLORS.primaryHover,
    },
    Select: {
      controlHeight: BRAND_SIZES.controlHeight,
      controlHeightSM: BRAND_SIZES.controlHeightSm,
      controlHeightLG: BRAND_SIZES.controlHeightLg,
      borderRadius: BRAND_SIZES.borderRadius,
    },
    Table: {
      borderRadius: BRAND_SIZES.borderRadius,
      headerBg: BRAND_COLORS.bgSpotlight,
      headerColor: BRAND_COLORS.textPrimary,
      headerBorderRadius: BRAND_SIZES.borderRadius,
      cellPaddingBlock: BRAND_SPACING.sm,
      cellPaddingInline: BRAND_SPACING.md,
      rowHoverBg: BRAND_COLORS.primaryBg,
    },
    Popconfirm: {
      borderRadiusOuter: BRAND_SIZES.borderRadius,
    },
    Card: {
      borderRadiusLG: BRAND_SIZES.borderRadiusLg,
      boxShadowTertiary: BRAND_SHADOWS.sm,
    },
  },
};

/**
 * 회사 전용 AntD Provider.
 * 모든 화면의 최상단은 반드시 이 컴포넌트로 감싸야 합니다. (Design.md 참고)
 */
export function CompanyProvider({ children }: PropsWithChildren) {
  return createElement(ConfigProvider, { theme: companyTheme, locale: koKR }, children);
}

export * from './tokens';
