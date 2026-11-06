/**
 * Deterministic IntersectionObserver mock for tests.
 *
 * Install once per test (beforeEach), drive it with `triggerIntersection`,
 * and inspect `instances` / `disconnectCalls` for cleanup assertions.
 * jsdom has no IntersectionObserver, so every test that needs one uses this.
 */

export type MockObserverOptions = {
  root?: Element | Document | null
  rootMargin?: string
  threshold?: number | number[]
}

export type MockIntersectionObserverInstance = {
  callback: IntersectionObserverCallback
  options: MockObserverOptions
  observed: Set<Element>
  disconnected: boolean
}

let timeCounter = 0

export const intersectionObserverMock = {
  instances: [] as MockIntersectionObserverInstance[],
  disconnectCalls: 0,

  reset() {
    this.instances = []
    this.disconnectCalls = 0
    timeCounter = 0
    delete (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver
  },

  install() {
    const mock = intersectionObserverMock
    ;(globalThis as { IntersectionObserver?: unknown }).IntersectionObserver =
      class FakeIntersectionObserver {
        readonly callback: IntersectionObserverCallback
        readonly options: MockObserverOptions
        readonly observed: Set<Element>
        disconnected = false

        constructor(
          callback: IntersectionObserverCallback,
          options?: MockObserverOptions,
        ) {
          this.callback = callback
          this.options = options ?? {}
          this.observed = new Set()
          mock.instances.push(this as unknown as MockIntersectionObserverInstance)
        }

        observe(target: Element) {
          this.observed.add(target)
        }

        unobserve(target: Element) {
          this.observed.delete(target)
        }

        // The shared instance bookkeeping lives on the mock, not the class,
        // so instances pushed via `this` resolve correctly.
        disconnect() {
          this.observed.clear()
          this.disconnected = true
          mock.disconnectCalls += 1
        }

        takeRecords(): IntersectionObserverEntry[] {
          return []
        }
      }
  },

  /** Fire one entry for the fake observer that is watching `target`. */
  trigger(target: Element, isIntersecting: boolean) {
    const instance = this.instances.find((candidate) => candidate.observed.has(target))
    if (!instance) {
      throw new Error('No IntersectionObserver instance is observing the given target')
    }

    const entry = {
      isIntersecting,
      target,
      time: ++timeCounter,
      intersectionRatio: isIntersecting ? 1 : 0,
    } as unknown as IntersectionObserverEntry

    // Dead observers must not fire stale callbacks.
    if (instance.disconnected) {
      throw new Error('A disconnected IntersectionObserver callback was invoked')
    }

    instance.callback([entry], instance as unknown as IntersectionObserver)
  },
}
