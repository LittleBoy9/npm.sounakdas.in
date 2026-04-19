import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor!.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    function animate() {
      followerX += (mouseX - followerX) * 0.08
      followerY += (mouseY - followerY) * 0.08
      follower!.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`
      requestAnimationFrame(animate)
    }

    function onMouseDown() {
      follower!.classList.add('click')
    }
    function onMouseUp() {
      follower!.classList.remove('click')
    }

    function onHoverLink(e: Event) {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.package-card') || target.closest('.modal-link')) {
        follower!.classList.add('hover')
      }
    }
    function onLeaveLink() {
      follower!.classList.remove('hover')
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', onHoverLink)
    document.addEventListener('mouseout', onLeaveLink)
    animate()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onHoverLink)
      document.removeEventListener('mouseout', onLeaveLink)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
