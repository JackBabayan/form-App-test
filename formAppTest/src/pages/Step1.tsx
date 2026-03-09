import { Button, Form, Input, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FormLayout } from '../layouts/FormLayout'
import { useFormStore } from '../store/formStore'
import { type FormData } from '../types/form'

export function Step1() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const formData = useFormStore((state) => state.formData)
  const stepState = useFormStore((state) => state.validation.step1)
  const setFormData = useFormStore((state) => state.setFormData)
  const setStepValidation = useFormStore((state) => state.setStepValidation)

  const onFinish = () => {
    setStepValidation('step1', false)
    navigate('/step-2')
  }

  const onFinishFailed = () => {
    setStepValidation('step1', true)
  }

  return (
    <FormLayout title="Форма 1: Личные данные">
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
          label="Телефон"
          name="phone"
          rules={[
            { required: true, message: 'Введите телефон' },
            { pattern: /^0\d{3}\s?\d{3}\s?\d{3}$/, message: 'Формат: 0XXX XXX XXX' },
          ]}
        >
          <Input placeholder="0XXX XXX XXX" />
        </Form.Item>

        <Form.Item
          label="Имя"
          name="firstName"
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[{ required: true, message: 'Введите фамилию' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пол"
          name="gender"
          rules={[{ required: true, message: 'Выберите пол' }]}
        >
          <Select
            placeholder="Выберите пол"
            options={[
              { value: 'male', label: 'Мужской' },
              { value: 'female', label: 'Женский' },
            ]}
          />
        </Form.Item>

        {stepState.attemptedSubmit && stepState.hasErrors && (
          <p className="hint-error">Заполните обязательные поля, чтобы продолжить.</p>
        )}

        <div className="actions">
          <Button className="btn btn-primary" type="primary" htmlType="submit">
            Далее
          </Button>
        </div>
      </Form>
    </FormLayout>
  )
}
