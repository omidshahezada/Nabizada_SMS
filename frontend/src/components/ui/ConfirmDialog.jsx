import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

export function ConfirmDialog({ open, title = 'حذف اطلاعات', message, onCancel, onConfirm, pending = false }) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      variant="danger"
      footer={(
        <>
          <Button variant="secondary" onClick={onCancel} disabled={pending}>انصراف</Button>
          <Button variant="danger" onClick={onConfirm} loading={pending}>تایید حذف</Button>
        </>
      )}
    >
      <p>{message || 'آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟ این عملیات قابل بازگشت نیست.'}</p>
    </Modal>
  )
}

