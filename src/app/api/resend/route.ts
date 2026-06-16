import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
	throw new Error('RESEND_API_KEY is not defined')
}

const resend = new Resend(process.env.RESEND_API_KEY)

const getDestinationEmail = (): string => {
	return 'poliveira@aethergp.com'
}

const IGNORED_FIELDS = ['form', 'company'] // company = honeypot

const MAX_FILE_BYTES = 15 * 1024 * 1024

const normalizeValue = (value: unknown): string => {
	if (typeof value === 'string') return value
	if (typeof value === 'number' || typeof value === 'boolean') return String(value)
	return JSON.stringify(value)
}

// accepts both JSON (most forms) and multipart/form-data (forms with a file upload).
// returns the plain field map plus any uploaded File pulled out separately.
const parseRequest = async (req: Request): Promise<{ body: Record<string, unknown>; file: File | null }> => {
	const contentType = req.headers.get('content-type') ?? ''

	if (contentType.includes('multipart/form-data')) {
		const formData = await req.formData()
		const body: Record<string, unknown> = {}
		let file: File | null = null

		for (const [key, value] of formData.entries()) {
			if (typeof value === 'object' && 'arrayBuffer' in value) {
				file = value as File
			} else {
				body[key] = value
			}
		}

		return { body, file }
	}

	const body = await req.json()
	return { body, file: null }
}

export async function POST(req: Request) {
	try {
		const { body, file } = await parseRequest(req)

		// honeypot (anti-spam)
		if (body.company) {
			return new Response(
				JSON.stringify({ status: 'success' }),
				{ status: 200 }
			)
		}

		if (!body.Email) {
			return new Response(
				JSON.stringify({
					status: 'error',
					error: 'Email é obrigatório',
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			)
		}

		// server-side guard for the upload (mirrors the client-side validation)
		if (file) {
			if (file.type !== 'application/pdf') {
				return new Response(
					JSON.stringify({ status: 'error', error: 'Formato não suportado. Envie um arquivo PDF.' }),
					{ status: 400, headers: { 'Content-Type': 'application/json' } }
				)
			}
			if (file.size > MAX_FILE_BYTES) {
				return new Response(
					JSON.stringify({ status: 'error', error: 'O arquivo excede 15 MB.' }),
					{ status: 400, headers: { 'Content-Type': 'application/json' } }
				)
			}
		}

		const destinationEmail = getDestinationEmail()
		const isInscricao = body.form === 'inscricao'

		const keyValuePairs = Object.entries(body).filter(
			([key]) => !IGNORED_FIELDS.includes(key)
		)

		const formattedData = keyValuePairs
			.map(
				([key, value]) => `
					<tr style="vertical-align: top;">
						<td style="padding: 10px; border: 1px solid #ccc; background-color: #f2f2f2; font-size: 14px; line-height: 1.25; color: #030304;">
							<strong>${key}:</strong>
						</td>
						<td style="padding: 10px; border: 1px solid #ccc; font-size: 14px; line-height: 1.25; color: #030304;">
							${normalizeValue(value)}
						</td>
					</tr>
				`
			)
			.join('')

		const htmlMessage = `
			<div style="background-color: #f2f2f2; padding: 50px 20px; font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;">
				<div style="margin: auto; background-color: #fff; padding: 40px; width: 520px; max-width: 100%;">
					<p style="font-size: 18px; color: #030304;">
						<strong>Aether Global Pharma</strong>
					</p>

					<hr /><br />

					<table style="border-collapse: collapse; width: 100%;" cellspacing="0" cellpadding="0">
						<tbody>
							${formattedData}
						</tbody>
					</table>
				</div>
			</div>
		`

		const textMessage = keyValuePairs
			.map(([key, value]) => `${key}: ${normalizeValue(value)}`)
			.join('\n')

		const attachments = file
			? [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()) }]
			: undefined

		const subject = isInscricao
			? `Nova inscrição de projeto${body.Nome ? ` - ${normalizeValue(body.Nome)}` : ''}`
			: body.Assunto
				? `Contato - ${normalizeValue(body.Assunto)}`
				: 'Mensagem enviada de Formulário de Contato'

		const { error } = await resend.emails.send({
			from: 'Aether Global Pharma <aether@aethergp.com.br>',
			to: [destinationEmail],
			replyTo: normalizeValue(body.Email),
			subject,
			html: htmlMessage,
			text: textMessage,
			attachments,
		})

		if (error) {
			console.error('Error sending email:', error)
			return new Response(
				JSON.stringify({
					status: 'error',
					error: 'Erro ao enviar email',
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				}
			)
		}

		// confirmation e-mail to the proponent (spec-inscreva-seu-projeto, Seção 6)
		if (isInscricao) {
			const name = body.Nome ? normalizeValue(body.Nome) : ''

			const confirmationHtml = `
				<div style="background-color: #f2f2f2; padding: 50px 20px; font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;">
					<div style="margin: auto; background-color: #fff; padding: 40px; width: 520px; max-width: 100%; font-size: 15px; line-height: 1.6; color: #030304;">
						<p style="font-size: 18px;"><strong>Aether Global Pharma</strong></p>
						<hr /><br />
						<p>Olá${name ? `, ${name}` : ''}.</p>
						<p>Confirmamos o recebimento da inscrição do seu projeto na plataforma Aether. Nossa equipe científica fará a avaliação inicial e, havendo aderência ao nosso modelo, entraremos em contato por este e-mail.</p>
						<p>Obrigado por compartilhar sua pesquisa com a gente.</p>
						<p>- Equipe Aether</p>
					</div>
				</div>
			`

			const { error: confirmationError } = await resend.emails.send({
				from: 'Aether Global Pharma <aether@aethergp.com.br>',
				to: [normalizeValue(body.Email)],
				subject: 'Recebemos a inscrição do seu projeto - Aether',
				html: confirmationHtml,
				text: `Olá${name ? `, ${name}` : ''}. Confirmamos o recebimento da inscrição do seu projeto na plataforma Aether. Nossa equipe científica fará a avaliação inicial e, havendo aderência ao nosso modelo, entraremos em contato por este e-mail. Obrigado por compartilhar sua pesquisa com a gente. - Equipe Aether`,
			})

			// the proponent confirmation is best-effort - don't fail the submission if it bounces
			if (confirmationError) {
				console.error('Error sending confirmation email:', confirmationError)
			}
		}

		return new Response(
			JSON.stringify({ status: 'success' }),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	} catch (error) {
		console.error('Unexpected error:', error)

		return new Response(
			JSON.stringify({
				status: 'error',
				error: 'Erro inesperado ao processar a solicitação',
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	}
}
