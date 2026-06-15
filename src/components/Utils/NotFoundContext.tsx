'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const NotFoundContext = createContext(false)

export function NotFoundProvider({ children }: { children: React.ReactNode }) {
	const [isNotFound, setIsNotFound] = useState(false)

	return (
		<NotFoundContext.Provider value={isNotFound}>
			<NotFoundSetterContext.Provider value={setIsNotFound}>
				{children}
			</NotFoundSetterContext.Provider>
		</NotFoundContext.Provider>
	)
}

const NotFoundSetterContext = createContext<((value: boolean) => void) | null>(null)

export function NotFoundMarker() {
	const setIsNotFound = useContext(NotFoundSetterContext)

	useEffect(() => {
		setIsNotFound?.(true)
		return () => setIsNotFound?.(false)
	}, [setIsNotFound])

	return null
}

export function useIsNotFound() {
	return useContext(NotFoundContext)
}
