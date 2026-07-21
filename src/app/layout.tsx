interface RootLayoutProps {
	children: React.ReactNode
}

// a root layout is required by Next.js whenever a root not-found.tsx exists;
// the real <html>/<body> shell lives in src/app/[locale]/layout.tsx
export default function RootLayout({
	children
}: RootLayoutProps) {
	return children
}
