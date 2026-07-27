import { ConfigProvider, type ThemeConfig } from 'antd';
import koKR from 'antd/locale/ko_KR';
import { createElement, type PropsWithChildren } from 'react';
import {
  colorTokens,
  textTokens,
  typographyTokens,
  spacingTokens,
  radiusTokens,
  sizeTokens,
  shadowTokens,
  breakpointTokens,
  zIndexTokens,
  motionTokens,
  componentTokens,
} from './tokens';

/**
 * AntD ConfigProvider에 주입되는 회사 전용 테마.
 *
 * 이 파일만이 tokens.ts의 프레임워크 중립 값을 "AntD의 SeedToken/AliasToken/
 * ComponentToken 이름"으로 변환하는 유일한 장소입니다. 다른 UI 라이브러리로
 * 전환하게 되면 tokens.ts는 그대로 두고, 이 파일과 동일한 역할을 하는
 * 매핑 파일만 새로 작성하면 됩니다.
 */
export const companyTheme: ThemeConfig = {
  token: {
    // Color
    colorPrimary: colorTokens.brand[500],
    colorSuccess: colorTokens.semantic.success.base,
    colorWarning: colorTokens.semantic.warning.base,
    colorError: colorTokens.semantic.error.base,
    colorInfo: colorTokens.semantic.info.base,

    // Text
    colorText: textTokens.onLight.primary,
    colorTextSecondary: textTokens.onLight.secondary,
    colorTextTertiary: textTokens.onLight.tertiary,
    colorTextDisabled: textTokens.onLight.disabled,

    // Background
    colorBgLayout: colorTokens.gray[100],
    colorBgContainer: colorTokens.base.white,
    colorBgSpotlight: colorTokens.gray[50],

    // Border
    colorBorder: colorTokens.gray[300],
    colorBorderSecondary: colorTokens.gray[200],

    // Typography
    fontFamily: typographyTokens.fontFamily.base,
    fontSize: typographyTokens.fontSize.base,
    fontSizeSM: typographyTokens.fontSize.sm,
    fontSizeLG: typographyTokens.fontSize.lg,
    fontSizeXL: typographyTokens.fontSize.xl,
    fontSizeHeading1: typographyTokens.fontSize.heading,
    lineHeight: typographyTokens.lineHeight.base,

    // Radius
    borderRadius: radiusTokens.base,
    borderRadiusSM: radiusTokens.sm,
    borderRadiusLG: radiusTokens.lg,

    // Control height
    controlHeight: sizeTokens.controlHeightBase,
    controlHeightSM: sizeTokens.controlHeightSm,
    controlHeightLG: sizeTokens.controlHeightLg,

    // Spacing
    padding: spacingTokens.md,
    paddingSM: spacingTokens.sm,
    paddingLG: spacingTokens.lg,
    paddingXS: spacingTokens.xs,
    margin: spacingTokens.md,
    marginSM: spacingTokens.sm,
    marginLG: spacingTokens.lg,
    marginXS: spacingTokens.xs,

    // Shadow
    boxShadow: shadowTokens.base,
    boxShadowSecondary: shadowTokens.sm,

    // Breakpoint (신규 반영)
    screenXS: breakpointTokens.xs,
    screenSM: breakpointTokens.sm,
    screenMD: breakpointTokens.md,
    screenLG: breakpointTokens.lg,
    screenXL: breakpointTokens.xl,
    screenXXL: breakpointTokens.xxl,

    // Z-index (신규 반영)
    zIndexBase: zIndexTokens.base,
    zIndexPopupBase: zIndexTokens.popover,

    // Motion (신규 반영 — AntD의 motionUnit은 초 단위 배율 개념이라
    // motionTokens.duration.fast를 근사치로 매핑)
    motionUnit: motionTokens.duration.fast,
  },

  components: {
    Button: {
      controlHeight: componentTokens.button.height.base,
      controlHeightSM: componentTokens.button.height.sm,
      controlHeightLG: componentTokens.button.height.lg,
      borderRadius: componentTokens.button.borderRadius.base,
      borderRadiusSM: componentTokens.button.borderRadius.sm,
      paddingInline: componentTokens.button.paddingInline.base,
      paddingInlineSM: componentTokens.button.paddingInline.sm,
      paddingInlineLG: componentTokens.button.paddingInline.lg,
      fontWeight: componentTokens.button.fontWeight,
      primaryShadow: shadowTokens.none,
    },
    Input: {
      controlHeight: componentTokens.input.height.base,
      controlHeightSM: componentTokens.input.height.sm,
      controlHeightLG: componentTokens.input.height.lg,
      borderRadius: componentTokens.input.borderRadius,
      activeBorderColor: colorTokens.brand[500],
      hoverBorderColor: colorTokens.brand[400],
    },
    Select: {
      controlHeight: componentTokens.input.height.base,
      controlHeightSM: componentTokens.input.height.sm,
      controlHeightLG: componentTokens.input.height.lg,
      borderRadius: componentTokens.input.borderRadius,
    },
    Table: {
      borderRadius: componentTokens.table.borderRadius,
      headerBg: componentTokens.table.headerBg,
      headerColor: componentTokens.table.headerColor,
      headerBorderRadius: componentTokens.table.borderRadius,
      cellPaddingBlock: componentTokens.table.cellPaddingBlock,
      cellPaddingInline: componentTokens.table.cellPaddingInline,
      rowHoverBg: componentTokens.table.rowHoverBg,
    },
    Popconfirm: {
      borderRadiusOuter: radiusTokens.base,
    },
    Card: {
      borderRadiusLG: radiusTokens.lg,
      boxShadowTertiary: shadowTokens.sm,
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
