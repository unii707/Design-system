import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ConfirmDeleteButton } from './ConfirmDeleteButton';

const meta = {
  title: 'Components/ConfirmDeleteButton',
  component: ConfirmDeleteButton,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: '정말 삭제하시겠어요?',
    description: '삭제된 데이터는 복구할 수 없습니다.',
    children: '삭제',
    loading: false,
    disabled: false,
    onConfirm: fn(),
    onCancel: fn(),
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    children: { control: 'text' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
    },
  },
} satisfies Meta<typeof ConfirmDeleteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const CustomText: Story = {
  args: {
    children: '항목 삭제',
    title: '이 항목을 삭제할까요?',
    description: '연결된 하위 데이터도 함께 삭제됩니다.',
  },
};
