export const useScrollToTop = () => {
  const isBrowser = () => typeof window !== 'undefined'

  function scrollToTop() {
    if (!isBrowser()) return

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return scrollToTop
}
