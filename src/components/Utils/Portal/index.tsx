'use client'

// libraries
import { ReactNode, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    children: ReactNode
}

const subscribe = () => () => {}

export default function Portal({ children }: PortalProps) {
    // null on the server and during hydration, the #portal node once on the client
    const portalRoot = useSyncExternalStore(
        subscribe,
        () => document.getElementById('portal'),
        () => null
    )

    if (!portalRoot) {
        return null
    }

    return createPortal(children, portalRoot)
}