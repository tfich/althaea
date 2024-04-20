import React, { useContext, useEffect, useRef } from 'react'
import { CSSTransition as ReactCSSTransition } from 'react-transition-group'

type TransitionContextProps = {
  parent: {
    show: boolean
    isInitialRender: boolean
    appear?: boolean
  }
}

const TransitionContext = React.createContext<Partial<TransitionContextProps>>({
  parent: {
    show: false,
    isInitialRender: true
  }
})

function useIsInitialRender() {
  const isInitialRender = useRef(true)
  useEffect(() => {
    isInitialRender.current = false
  }, [])
  return isInitialRender.current
}

interface TransitionProps {
  show: boolean
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
  appear?: boolean
}

type CSSTransitionProps = TransitionProps

const CSSTransition: React.FC<CSSTransitionProps> = ({
  show,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  appear,
  children
}) => {
  const enterClasses = enter.split(' ').filter((s) => s.length)
  const enterFromClasses = enterFrom.split(' ').filter((s) => s.length)
  const enterToClasses = enterTo.split(' ').filter((s) => s.length)
  const leaveClasses = leave.split(' ').filter((s) => s.length)
  const leaveFromClasses = leaveFrom.split(' ').filter((s) => s.length)
  const leaveToClasses = leaveTo.split(' ').filter((s) => s.length)

  function addClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.add(...classes)
  }

  function removeClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.remove(...classes)
  }

  const nodeRef = React.useRef<HTMLDivElement>(null)

  // TODO: fix this any
  const ReactCSSTrans = ReactCSSTransition as any

  return (
    <ReactCSSTrans
      appear={appear}
      nodeRef={nodeRef}
      unmountOnExit
      in={show}
      addEndListener={(node, done) => {
        nodeRef.current?.addEventListener('transitionend', done, false)
      }}
      onEnter={(node) => {
        nodeRef.current && addClasses(nodeRef.current, [...enterClasses, ...enterFromClasses])
      }}
      onEntering={(node) => {
        nodeRef.current && removeClasses(nodeRef.current, enterFromClasses)
        nodeRef.current && addClasses(nodeRef.current, enterToClasses)
      }}
      onEntered={(node) => {
        nodeRef.current && removeClasses(nodeRef.current, [...enterToClasses, ...enterClasses])
      }}
      onExit={(node) => {
        nodeRef.current && addClasses(nodeRef.current, [...leaveClasses, ...leaveFromClasses])
      }}
      onExiting={(node) => {
        nodeRef.current && removeClasses(nodeRef.current, leaveFromClasses)
        nodeRef.current && addClasses(nodeRef.current, leaveToClasses)
      }}
      onExited={(node) => {
        nodeRef.current && removeClasses(nodeRef.current, [...leaveToClasses, ...leaveClasses])
      }}
    >
      <div ref={nodeRef}>{children}</div>
    </ReactCSSTrans>
  )
}

const Transition: React.FC<TransitionProps> = ({ show, appear, ...rest }) => {
  const { parent } = useContext(TransitionContext)
  const isInitialRender = useIsInitialRender()
  const isChild = show === undefined

  if (isChild) {
    return (
      <CSSTransition
        appear={parent ? parent.appear || !parent.isInitialRender : false}
        show={parent?.show ? parent.show : false}
        {...rest}
      />
    )
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear
        }
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  )
}

export default Transition
