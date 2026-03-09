import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Modal, Slider } from 'antd'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../api'
import { FormLayout } from '../layouts/FormLayout'
import { useFormStore } from '../store/formStore'
import { type FormData } from '../types/form'

export function Step3() {
  const navigate = useNavigate()
  const formData = useFormStore((state) => state.formData)
  const setFormData = useFormStore((state) => state.setFormData)
  const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null)

  const submitApplicationMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => setSubmitResult('success'),
    onError: () => setSubmitResult('error'),
  })

  const onFinish = () => {
    submitApplicationMutation.mutate({
      title: `${formData.firstName} ${formData.lastName}`.trim(),
    })
  }

  const closeResultModal = () => {
    const shouldGoToFirstStep = submitResult === 'success'
    setSubmitResult(null)

    if (shouldGoToFirstStep) {
      navigate('/step-1')
    }
  }

  return (
    <FormLayout title="Форма 3: Параметры займа">
      <Form
        layout="vertical"
        className="form-grid"
        initialValues={formData}
        onValuesChange={(changedValues) => setFormData(changedValues as Partial<FormData>)}
        onFinish={onFinish}
      >
        <Form.Item
          label={`Сумма займа: $${formData.amount}`}
          name="amount"
          rules={[{ required: true, message: 'Выберите сумму займа' }]}
        >
          <Slider min={200} max={1000} step={100} />
        </Form.Item>

        <Form.Item
          label={`Срок займа: ${formData.term} дней`}
          name="term"
          rules={[{ required: true, message: 'Выберите срок займа' }]}
        >
          <Slider min={10} max={30} step={1} />
        </Form.Item>

        <div className="actions">
          <Button className="btn btn-secondary" type="default" onClick={() => navigate('/step-2')}>
            Назад
          </Button>

          <Button
            className="btn btn-primary"
            type="primary"
            htmlType="submit"
            loading={submitApplicationMutation.isPending}
          >
            Подать заявку
          </Button>
        </div>
      </Form>


      <Modal
        title={submitResult === 'error' ? 'Ошибка' : 'Заявка отправлена'}
        open={submitResult !== null}
        onCancel={closeResultModal}
        onOk={closeResultModal}
        okText="Понятно"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        {submitResult === 'error' ? (
          <p>Не удалось отправить заявку. Попробуйте еще раз</p>
        ) : (
          <p>
            Поздравляем, {formData.lastName} {formData.firstName}. Вам одобрена {formData.amount}
            {' '}на {formData.term} дней.
          </p>
        )}
      </Modal>
    </FormLayout>
  )
}
