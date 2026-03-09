export type Gender = '' | 'male' | 'female'

export interface FormData {
  phone: string
  firstName: string
  lastName: string
  gender: Gender
  workplace: string
  address: string
  amount: number
  term: number
}

export interface StepValidationState {
  hasErrors: boolean
  attemptedSubmit: boolean
}

export interface ValidationByStep {
  step1: StepValidationState
  step2: StepValidationState
  step3: StepValidationState
}
