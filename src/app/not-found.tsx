// this only renders for requests the next-intl middleware never sees (its matcher
// excludes them), so there's no locale/translation context available here - the real,
// styled, locale-aware 404 is src/app/[locale]/not-found.tsx
export default function RootNotFound() {
	return (
		<html lang='pt-BR'>
			<body>
				<h1>404</h1>
			</body>
		</html>
	)
}
