// components
import { NotFoundMarker } from '@/components/Utils/NotFoundContext'

// pages
import Error404 from '@/app/[locale]/404/page'

export default function NotFound() {
	return (
		<>
			<NotFoundMarker />
			<Error404 />
		</>
	)
}