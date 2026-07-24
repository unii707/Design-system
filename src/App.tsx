import { Flex, Space, Typography } from 'antd';
import { CompanyProvider } from './theme';
import { CompanySearchBar, ConfirmDeleteButton } from './components';
import { BRAND_SPACING } from './theme/tokens';

const FILTER_OPTIONS = [
  { label: '이름', value: 'name' },
  { label: '이메일', value: 'email' },
  { label: '부서', value: 'department' },
];

export default function App() {
  return (
    <CompanyProvider>
      <Flex vertical gap={BRAND_SPACING.xl} align="center">
        <Typography.Title level={3}>디자인 시스템 가이드</Typography.Title>

        <Flex vertical gap={BRAND_SPACING.md} style={{ minWidth: 480 }}>
          <Typography.Title level={5}>CompanySearchBar</Typography.Title>
          <CompanySearchBar
            filterOptions={FILTER_OPTIONS}
            filterValue="name"
            onSearch={(keyword) => console.log('search:', keyword)}
            onReset={() => console.log('reset')}
          />
        </Flex>

        <Flex vertical gap={BRAND_SPACING.md} style={{ minWidth: 480 }}>
          <Typography.Title level={5}>ConfirmDeleteButton</Typography.Title>
          <Space size={BRAND_SPACING.sm}>
            <ConfirmDeleteButton onConfirm={() => console.log('deleted')} />
          </Space>
        </Flex>
      </Flex>
    </CompanyProvider>
  );
}
