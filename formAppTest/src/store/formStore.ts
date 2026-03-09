import { create } from "zustand";
import { type FormData, type ValidationByStep } from "../types/form";

const initialFormData: FormData = {
  phone: "",
  firstName: "",
  lastName: "",
  gender: "",
  workplace: "",
  address: "",
  amount: 200,
  term: 10,
};

const initialValidation: ValidationByStep = {
  step1: { hasErrors: false, attemptedSubmit: false },
  step2: { hasErrors: false, attemptedSubmit: false },
  step3: { hasErrors: false, attemptedSubmit: false },
};

type StepKey = keyof ValidationByStep;

interface FormStoreState {
  formData: FormData;
  validation: ValidationByStep;
  setFormData: (values: Partial<FormData>) => void;
  setStepValidation: (step: StepKey, hasErrors: boolean) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStoreState>((set) => ({
  formData: initialFormData,
  validation: initialValidation,
  setFormData: (values) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...values,
      },
    })),
  setStepValidation: (step, hasErrors) =>
    set((state) => ({
      validation: {
        ...state.validation,
        [step]: {
          attemptedSubmit: true,
          hasErrors,
        },
      },
    })),
  resetForm: () =>
    set({
      formData: initialFormData,
      validation: initialValidation,
    }),
}));
