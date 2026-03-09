import type { ReactNode } from 'react'

interface FormLayoutProps {
  title: string
  children: ReactNode
}

export function FormLayout({ title, children }: FormLayoutProps) {
  return (
    <main className="page">
      <section className="form-shell">
        <header className="form-header">
          <h1>{title}</h1>
        </header>
        {children}
      </section>
    </main>
  )
}
