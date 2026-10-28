import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { installMatchMedia } from './matchMedia'

beforeEach(() => {
  installMatchMedia(false)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})
