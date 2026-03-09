import { Button, Form, Input, Select } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { fetchCategories } from '../api'
import { FormLayout } from '../layouts/FormLayout'
import { useFormStore } from '../store/formStore'
import { type FormData } from '../types/form'

export function Step2() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const formData = useFormStore((state) => state.formData)
  const stepState = useFormStore((state) => state.validation.step2)
  const setFormData = useFormStore((state) => state.setFormData)
  const setStepValidation = useFormStore((state) => state.setStepValidation)
  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ['workplace-categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  })

  
  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category
      .split('-')
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join(' '),
  }))

  const onFinish = () => {
    setStepValidation('step2', false)
    navigate('/step-3')
  }

  const onFinishFailed = () => {
    setStepValidation('step2', true)
  }

  return (
    <FormLayout title="Форма 2: Адрес и место работы">
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
          label="Место работы"
          name="workplace"
          rules={[{ required: true, message: 'Выберите место работы' }]}
        >
          <Select
            placeholder="Выберите место работы"
            options={categoryOptions}
            loading={isLoading}
            disabled={isLoading || isError}
          />
        </Form.Item>
        {isError && (
          <p className="hint-error">Не удалось загрузить список мест работы. Обновите страницу.</p>
        )}

        <Form.Item
          label="Адрес проживания"
          name="address"
          rules={[{ required: true, message: 'Введите адрес проживания' }]}
        >
          <Input />
        </Form.Item>

        {stepState.attemptedSubmit && stepState.hasErrors && (
          <p className="hint-error">Заполните обязательные поля, чтобы продолжить.</p>
        )}

        <div className="actions">
          <Button className="btn btn-secondary" type="default" onClick={() => navigate('/step-1')}>
            Назад
          </Button>
          <Button className="btn btn-primary" type="primary" htmlType="submit">
            Далее
          </Button>
        </div>
      </Form>
    </FormLayout>
  )
}
