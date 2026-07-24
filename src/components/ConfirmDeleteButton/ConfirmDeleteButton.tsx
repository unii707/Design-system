import { Button, Popconfirm, type ButtonProps } from 'antd';

export interface ConfirmDeleteButtonProps {
  /** Popconfirm 제목 */
  title?: string;
  /** Popconfirm 설명 */
  description?: string;
  /** 사용자가 최종 확인했을 때 호출 */
  onConfirm: () => void;
  /** 취소를 눌렀을 때 호출 */
  onCancel?: () => void;
  /** 버튼에 표시할 텍스트 */
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  size?: ButtonProps['size'];
}

/**
 * 삭제 확인 전용 공통 버튼.
 * danger Button + Popconfirm 조합을 표준화하여
 * 프로젝트 전역에서 삭제 UX(문구, 색상, 인터랙션)를 통일합니다.
 */
export function ConfirmDeleteButton({
  title = '정말 삭제하시겠어요?',
  description = '삭제된 데이터는 복구할 수 없습니다.',
  onConfirm,
  onCancel,
  children = '삭제',
  loading,
  disabled,
  size,
}: ConfirmDeleteButtonProps) {
  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText="삭제"
      cancelText="취소"
      okType="danger"
      disabled={disabled}
    >
      <Button danger loading={loading} disabled={disabled} size={size}>
        {children}
      </Button>
    </Popconfirm>
  );
}
