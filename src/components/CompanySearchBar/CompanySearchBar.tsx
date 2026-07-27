import { Button, Flex, Input, Select } from 'antd';
import { useState } from 'react';
import { spacingTokens } from '../../theme/tokens';

export interface CompanySearchBarFilterOption {
  label: string;
  value: string;
}

export interface CompanySearchBarProps {
  /** 검색 조건 Select의 옵션 목록 */
  filterOptions: CompanySearchBarFilterOption[];
  /** 검색 조건 Select의 현재 값 */
  filterValue?: string;
  /** 검색 조건이 바뀔 때 호출 */
  onFilterChange?: (value: string) => void;
  /** 검색어 입력 placeholder */
  placeholder?: string;
  /** 검색 버튼(또는 Enter) 클릭 시 호출 */
  onSearch?: (keyword: string) => void;
  /** 우측 "초기화" 버튼 클릭 시 호출. 전달하지 않으면 버튼이 렌더링되지 않음 */
  onReset?: () => void;
  loading?: boolean;
}

/**
 * 회사 공통 검색바.
 * 조건 Select + 키워드 Input.Search + (선택) 초기화 Button 조합.
 * 레이아웃은 Flex 컴포넌트만 사용하며 커스텀 CSS/inline style을 사용하지 않습니다.
 */
export function CompanySearchBar({
  filterOptions,
  filterValue,
  onFilterChange,
  placeholder = '검색어를 입력하세요',
  onSearch,
  onReset,
  loading,
}: CompanySearchBarProps) {
  const [keyword, setKeyword] = useState('');

  return (
    <Flex gap={spacingTokens.sm} align="center" wrap="wrap">
      <Select
        options={filterOptions}
        value={filterValue}
        onChange={onFilterChange}
        style={{ minWidth: 160 }}
        placeholder="조건 선택"
      />
      <Input.Search
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onSearch={onSearch}
        placeholder={placeholder}
        loading={loading}
        style={{ maxWidth: 320 }}
        allowClear
      />
      {onReset && <Button onClick={onReset}>초기화</Button>}
    </Flex>
  );
}
