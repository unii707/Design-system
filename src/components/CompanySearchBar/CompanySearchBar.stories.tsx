import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { CompanySearchBar } from './CompanySearchBar';

const FILTER_OPTIONS = [
  { label: '이름', value: 'name' },
  { label: '이메일', value: 'email' },
  { label: '부서', value: 'department' },
];

const meta = {
  title: 'Components/CompanySearchBar',
  component: CompanySearchBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    filterOptions: FILTER_OPTIONS,
    filterValue: 'name',
    placeholder: '검색어를 입력하세요',
    loading: false,
    onFilterChange: fn(),
    onSearch: fn(),
    onReset: fn(),
  },
  argTypes: {
    filterValue: {
      control: 'select',
      options: FILTER_OPTIONS.map((option) => option.value),
    },
    placeholder: { control: 'text' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof CompanySearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const WithoutReset: Story = {
  args: {
    onReset: undefined,
  },
};
