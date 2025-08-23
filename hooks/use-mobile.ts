import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile(breakPoint?: number) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakPoint ?? MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < (breakPoint ?? MOBILE_BREAKPOINT))
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < (breakPoint ?? MOBILE_BREAKPOINT))
    return () => mql.removeEventListener("change", onChange)
  }, [breakPoint])

  return !!isMobile
}
