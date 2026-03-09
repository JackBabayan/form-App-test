import { Button, Form, Slider } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FormLayout } from '../layouts/FormLayout'
import { useFormStore } from '../store/formStore'
import { type FormData } from '../types/form'

export function Step3() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const formData = useFormStore((state) => state.formData)
  const stepState = useFormStore((state) => state.validation.step3)
  const setFormData = useFormStore((state) => state.setFormData)
  const setStepValidation = useFormStore((state) => state.setStepValidation)

  const onFinish = () => {
    setStepValidation('step3', false)
  }

  const onFinishFailed = () => {
    setStepValidation('step3', true)
  }

  return (
    <FormLayout title="Форма 3: Параметры займа">
      <Form
        form={form}
        layout="vertical"
        className="form-grid"
        initialValues={formData}
        onValuesChange={(changedValues) => setFormData(changedValues as Partial<FormData>)}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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

        {stepState.attemptedSubmit && stepState.hasErrors && (
          <p className="hint-error">Проверьте параметры перед отправкой.</p>
        )}

        <div className="actions">
          <Button className="btn btn-secondary" type="default" onClick={() => navigate('/step-2')}>
            Назад
          </Button>
          <Button className="btn btn-primary" type="primary" htmlType="submit">
            Подать заявку
          </Button>
        </div>
      </Form>
    </FormLayout>
  )
}
