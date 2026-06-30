import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'

const s3 = new S3Client({
	region: 'auto',
	endpoint: process.env.R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID!,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
	},
})

const MAX_FILE_BYTES = 15 * 1024 * 1024

export async function POST(req: Request) {
	try {
		const { filename, contentType, size } = await req.json()

		if (contentType !== 'application/pdf') {
			return Response.json({ error: 'Formato não suportado. Envie um arquivo PDF.' }, { status: 400 })
		}

		if (size > MAX_FILE_BYTES) {
			return Response.json({ error: 'O arquivo excede 15 MB.' }, { status: 400 })
		}

		const key = `inscricoes/${randomUUID()}-${filename.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`

		const command = new PutObjectCommand({
			Bucket: process.env.R2_BUCKET!,
			Key: key,
			ContentType: contentType,
			ContentLength: size,
		})

		const url = await getSignedUrl(s3, command, { expiresIn: 900 })

		return Response.json({ url, key })
	} catch {
		return Response.json({ error: 'Erro ao gerar URL de upload.' }, { status: 500 })
	}
}
