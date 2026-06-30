'use client'

// libraries
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { FormProvider, type RegisterOptions, type SubmitHandler, useForm, useFormContext } from 'react-hook-form'

// components
import Portal from '@/components/Utils/Portal'
import Dialog from '@/components/Dialog'
import Button from '@/components/Button'

// svg
import UxCheck from '@/assets/svg/ux/check.svg'
import UxEye from '@/assets/svg/ux/eye.svg'
import UxEyeSlash from '@/assets/svg/ux/eye-slash.svg'
import UxSpinner from '@/assets/svg/ux/spinner.svg'
import UxArrowDiagonal from '@/assets/svg/ux/arrow-diagonal.svg'

interface ModalProps {
	id: string
	title: string
	text: string
	onClose: () => void
}

export const Modal = ({
	id,
	title,
	text,
	onClose
}: ModalProps) => {
	return (
		<Portal>
			<Dialog id={id}>
				<div className='text-center flex flex-col items-center justify-center'>

					<h2 className='font-heading text-36 text-green-dark font-semibold'>
						{title}
					</h2>

					<div
						className='text-20 my-6 block'
						dangerouslySetInnerHTML={{ __html: text }}
					/>

					<Button
						data-dialog-close
						onClick={onClose}
						type='button'
						text='Fechar'
						style='dark'
						icon='close'
					/>

				</div>
			</Dialog>
		</Portal>
	)
}

interface FormProps {
	className?: string
	children: React.ReactNode
	endpoint: string
	isFormData?: boolean
	onSuccess: {
		title: string
		text: string
	}
	onError: {
		title: string
		text: string
	}
	clearOnSubmit?: boolean
}

interface FormValues {
	[key: string]: any
}

export const Form = ({
	className,
	children,
	endpoint,
	isFormData,
	onSuccess,
	onError,
	clearOnSubmit,
}: FormProps) => {

	// refs
	const form = useRef<HTMLFormElement>(null)

	// useState to make the Modals visible
	const [renderSuccessModal, setRenderSuccessModal] = useState(false)
	const [renderErrorModal, setRenderErrorModal] = useState(false)

	// close success modal
	const closeSuccessModal = () => {
		setRenderSuccessModal(false)
	}

	// close error modal
	const closeErrorModal = () => {
		setRenderErrorModal(false)
	}

	// form validations
	const methods = useForm({
		criteriaMode: 'all',
		mode: 'all'
	})

	// local state for any global errors
	const [_globalError, setGlobalError] = useState('')

	// submit function
	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		
        // clear any old error messages
		setGlobalError('')

		// fake response timer
		const fakeTimer = 1000

		if (form.current) {
			form.current.setAttribute('data-is-sending', 'true')
			document.dispatchEvent(new Event('formSending'))
		}

		let body

		if (isFormData) {
			const formData = new FormData()

			Object.keys(data).forEach((key) => {
				const value = data[key]

				if (value === undefined || value === null || value === '') return

				// a registered <input type="file"> yields a FileList - send the file itself
				if (typeof FileList !== 'undefined' && value instanceof FileList) {
					if (value[0]) formData.append(key, value[0])
					return
				}

				formData.append(key, value)
			})

			body = formData
		} else {
			body = JSON.stringify(data)
		}

		fetch(endpoint, {
			method: 'post',
			body: body
		})
			.then(async (response) => {
				if (!response.ok) {
					// if the response is not ok, we try to parse the error message
					const errBody = await response.json().catch(() => ({}))
					const message = errBody.message || 'Something went wrong'
					throw new Error(message)
				}

				// if response is ok, parse the JSON
				return response.json()
			})

			// if success
			.then((_responseData) => {
				if (onSuccess) {
					setRenderSuccessModal(true)

					setTimeout(() => {
						const dialog = document.getElementById('success') as HTMLDialogElement
						if (dialog) {
							dialog.showModal()
						}

						if (form.current) {
							form.current.setAttribute('data-is-sending', 'false')
							document.dispatchEvent(new Event('formSent'))

							if (clearOnSubmit) {
								form?.current?.reset()
								document.dispatchEvent(new Event('formReset'))
							}
						}
					}, fakeTimer)
				}
			})

			// if error
			.catch((error) => {
				setTimeout(() => {
					setGlobalError(error.message)
				}, fakeTimer)

				if (onError) {
					setRenderErrorModal(true)

					setTimeout(() => {
						const dialog = document.getElementById('error') as HTMLDialogElement
						if (dialog) {
							dialog.showModal()
						}

						if (form.current) {
							form.current.setAttribute('data-is-sending', 'false')
							document.dispatchEvent(new Event('formError'))
						}
					}, fakeTimer)
				}
			})
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className={clsx(
					className,
					'[&[data-is-sending="true"]_[data-regular-icon]]:opacity-0 [&[data-is-sending="true"]_[data-spinner]]:opacity-100 [&[data-is-sending="true"]_[data-submit-button]]:pointer-events-none'
				)}
				ref={form}
				data-is-sending='false'
			>
				{children}
			</form>

			{/*
			<button
				type='button'
				onClick={() => {
					setRenderSuccessModal(true)
					setTimeout(() => {
						const dialog = document.getElementById('success') as HTMLDialogElement
						if (dialog) {
							dialog.showModal()
						}
					}, 100)
				}}
			>
				test Success Modal
			</button>

			<button
				type='button'
				onClick={() => {
					setRenderErrorModal(true)
					setTimeout(() => {
						const dialog = document.getElementById('error') as HTMLDialogElement
						if (dialog) {
							dialog.showModal()
						}
					}, 100)
				}}
			>
				test Error Modal
			</button>
			*/}

			{renderSuccessModal && (
				<Modal
					id='success'
					title={onSuccess.title}
					text={onSuccess.text}
					onClose={closeSuccessModal}
				/>
			)}

			{renderErrorModal && (
				<Modal
					id='error'
					title={onError.title}
					text={onError.text}
					onClose={closeErrorModal}
				/>
			)}

		</FormProvider>
	)
}

interface LabelProps {
    id: string
    label?: string
    required?: boolean
}

export const Label = ({
	id,
    label,
    required
}: LabelProps) => {
	return (
		<label
            className='block text-sm mb-1'
            htmlFor={id}
            data-label
        >

            {label && label}

            {required && (
                <span className='text-red-600'>
                    &nbsp;*
                </span>
            )}

        </label>
	)
}

interface InputProps {
	id: string
	label?: string
	name: string
	hideLabel?: boolean
	type: string
	placeholder: string
	className?: string
	inputClassName?: string
	required?: boolean
	maxLength?: number
	minLength?: number
	hidePasswordToggle?: boolean
	disabled?: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
	match?: string
}

export const Input = ({
	id,
	label,
	name,
	hideLabel,
	type,
	placeholder,
	className,
	inputClassName,
	required,
	maxLength,
	minLength,
	hidePasswordToggle,
	disabled,
	onChange = () => {},
	onKeyDown,
	match
}: InputProps) => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext()

	// track focus state
	const [isFocused, setIsFocused] = useState(false)

	let validations: RegisterOptions = {
		onChange: (e) => onChange(e),
		required
	}

	if (match) {
		validations.validate = (value) => (
			value === watch(match) || 'Password não confere'
        )
	}

	const text = type === 'password' ? 'password' : 'message'

    validations = {
        ...validations,
        required: required && 'Este campo é obrigatório',
        maxLength: maxLength && {
            value: maxLength,
            message: 'Máximo de caracteres excedido',
        },
        minLength: minLength && {
            value: minLength,
            message: `${text} é muito curto`,
        },
    }

    // add pattern validation for email type
    if (type === 'email') {
        validations = {
            ...validations,
            pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email inválido'
            }
        } as {
            required: string | false | undefined
            maxLength:
                | 0
                | {
                        value: number
                        message: string
                    }
                | undefined
            minLength:
                | 0
                | {
                        value: number
                        message: string
                    }
                | undefined
            pattern: {
                value: RegExp
                message: string
            }
        }
    }

	// track visibility for password fields
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	// decide which input type to use (if 'password', swap to 'text' when toggled)
	const currentInputType = type === 'password' && isPasswordVisible ? 'text' : type

	const handleTogglePassword = () => {
		setIsPasswordVisible(!isPasswordVisible)
	}

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && onKeyDown) {
			onKeyDown(event)
		}
	}

	return (
		<div
			className={clsx(
				'relative block w-full mb-2 sm:mb-4',
				className,
				errors[name] && 'text-red-600 [&_input]:border-red-600'
			)}
			data-form-line
		>

			{!hideLabel && (
				<Label
					id={id}
					label={label}
					required={required}
				/>
			)}

			<div className='relative'>

				<input
					type={currentInputType}
					id={id}
					placeholder={placeholder}
					className={clsx(
                        'block w-full border border-gray-lighter bg-transparent rounded-md text-black p-4 text-ellipsis focus-visible:outline-1 focus-visible:outline-gray-light placeholder:opacity-75',
                        inputClassName
                    )}
					disabled={disabled || false}
					onKeyDown={handleKeyPress}
					onFocus={() => setIsFocused(true)}
					{...register(name, {
						...validations,
						onBlur: () => {
							setIsFocused(false)
						}
					})}
				/>

				{type === 'password' && !hidePasswordToggle && (
					<button
						className='absolute z-2 top-1/2 right-1 -translate-y-1/2 flex items-center justify-center min-w-4 w-4 h-4 text-current'
						onClick={handleTogglePassword}
						type='button'
					>
						{isPasswordVisible ? <UxEyeSlash /> : <UxEye />}
					</button>
				)}

			</div>

			{errors[name] && (
				<p className='text-[.5rem] text-white px-1 py-px absolute z-2 bg-red-600 -bottom-2 right-4 rounded-xs'>
                    {String(errors[name].message)}
                </p>
			)}
		</div>
	)
}

interface TextareaProps {
	id: string
	label?: string
	name: string
	hideLabel?: boolean
	placeholder?: string
	microcopy?: string
	className?: string
	required?: boolean
	maxLength?: number
	minLength?: number
}

export const Textarea = ({
	id,
	label,
	name,
	hideLabel,
	placeholder,
	microcopy,
	required,
	minLength,
	maxLength,
	className
}: TextareaProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext() ?? {}

	// track focus state
	const [isFocused, setIsFocused] = useState(false)

	let validations = {}
	
    validations = {
        required: required && 'Este campo é obrigatório',
        maxLength: maxLength && {
            value: maxLength,
            message: `Máximo de caracteres excedido`
        },
        minLength: minLength && {
            value: minLength,
            message: `A mensagem é muito curta`
        }
    }

	return (
		<div
			className={clsx(
				'relative block w-full mb-2 sm:mb-4',
				className,
				errors[name] && 'text-red-600 [&_textarea]:border-red-600'
			)}
		>

            {!hideLabel && (
				<Label
					id={id}
					label={label}
					required={required}
				/>
			)}

			{microcopy && (
				<p className='text-sm opacity-60 -mt-0.5 mb-2'>
					{microcopy}
				</p>
			)}

			<div className='relative'>
				<textarea
					id={id}
					placeholder={placeholder}
					className='block w-full border border-gray-lighter bg-transparent rounded-md text-black p-4 text-ellipsis focus-visible:outline-1 focus-visible:outline-gray-light placeholder:opacity-75 resize-y min-h-42 h-42'
					onFocus={() => setIsFocused(true)}
					{...register(name, {
						...validations,
						onBlur: () => {
							setIsFocused(false)
						}
					})}
				/>
			</div>

			{errors[name] && (
				<p className='text-[.5rem] text-white px-1 py-px absolute z-2 bg-red-600 -bottom-2 right-4 rounded-xs'>
                    {String(errors[name].message)}
                </p>
			)}
            
		</div>
	)
}

interface CheckboxProps {
	type: 'checkbox' | 'radio'
	id: string
	label: string
	name: string
	className?: string
	required?: boolean
	disabled?: boolean
	checked?: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	children?: React.ReactNode
}

export const Checkbox = ({
	type,
	id,
	label,
	name,
	className,
	required,
	disabled,
	checked,
	onChange = () => {},
	children
}: CheckboxProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	let validations: RegisterOptions = {
		onChange: (e) => onChange(e),
		required
	}

    validations = {
        ...validations,
        required: required && 'Este campo é obrigatório',
    }

	return (
		<div className={clsx(
            'relative block w-full mb-2 sm:mb-4',
            className
        )}>
			<label
				htmlFor={id}
				className='has-[input:checked]:**:data-radio-box:bg-black has-[input:focus]:**:data-radio-box:outline-1 has-[input:focus]:**:data-radio-box:outline-gray-light'
				data-error={!!errors[name]}
				data-label
				data-checkbox
			>
				<input
					type={type}
					id={id}
					className='absolute -z-1 opacity-0'
					defaultChecked={checked}
					disabled={disabled || false}
					value={label}
					{...register(
                        name,
                        { ...validations }
                    )}
				/>

				<span className='flex items-center gap-2 cursor-pointer'>

					<span
                        className='relative flex items-center justify-center w-7 min-w-7 h-7 p-1 border border-gray-lighter rounded-sm text-white'
                        data-radio-box
                    >
						<UxCheck />
					</span>

					{!children && (
						<span
                            className='text-sm leading-snug'
                            data-radio-text
                        >
							{label}
						</span>
					)}

					{children && (
						<span
                            className='text-sm leading-snug'
                            data-radio-text
                        >
							{children}
						</span>
					)}

				</span>
			</label>

			{errors[name] && (
				<p className='text-[.5rem] text-white bg-red-600 px-1 py-px block absolute -bottom-4 sm:-bottom-5 left-0 rounded-xs'>
                    {String(errors[name].message)}
                </p>
			)}

		</div>
	)
}

interface InputHiddenProps {
	name: string
	value: string
	id: string
}

export const InputHidden = ({ name, value, id }: InputHiddenProps) => {
	const { register } = useFormContext() ?? {}

	return (
        <input
            type='hidden'
            id={id}
            value={value}
            {...register(name)}
        />
    )
}

interface SubmitProps {
	text: string
	className?: string
	disabled?: boolean
	onClick?: () => void
	style: 'light' | 'dark'
}

export const Submit = ({
	text,
	className,
	disabled,
	onClick,
	style
}: SubmitProps) => {
	return (
		<Button
			text={text}
			className={className}
			disabled={disabled}
			onClick={onClick}
			type='submit'
			style={style}
			icon='diagonal-arrow'
			data-submit-button
		/>
	)
}

interface SelectOption {
	value: string
	label: string
}

interface SelectProps {
	id: string
	label?: string
	name: string
	options: SelectOption[]
	placeholder?: string
	hideLabel?: boolean
	className?: string
	required?: boolean
	disabled?: boolean
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({
	id,
	label,
	name,
	options,
	placeholder = 'Selecione',
	hideLabel,
	className,
	required,
	disabled,
	onChange = () => {}
}: SelectProps) => {
	const {
		register,
		watch,
		formState: { errors }
	} = useFormContext()

	const validations: RegisterOptions = {
		onChange: (e) => onChange(e),
		required: required && 'Este campo é obrigatório'
	}

	const value = watch(name)

	return (
		<div
			className={clsx(
				'relative block w-full mb-2 sm:mb-4',
				className,
				errors[name] && 'text-red-600 [&_select]:border-red-600'
			)}
			data-form-line
		>

			{!hideLabel && (
				<Label
					id={id}
					label={label}
					required={required}
				/>
			)}

			<div className='relative'>

				<select
					id={id}
					disabled={disabled || false}
					defaultValue=''
					className={clsx(
						'appearance-none block w-full border border-gray-lighter bg-transparent rounded-md p-4 pr-12 cursor-pointer focus-visible:outline-1 focus-visible:outline-gray-light',
						value ? 'text-black' : 'text-black/50'
					)}
					{...register(name, validations)}
				>

					<option value='' disabled>
						{placeholder}
					</option>

					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}

				</select>

				<span className='absolute z-1 top-1/2 right-4 -translate-y-1/2 flex items-center justify-center w-3 h-3 pointer-events-none text-current'>
					<svg
						viewBox='0 0 12 8'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='w-full h-full'
					>
						<path
							d='M1 1.5L6 6.5L11 1.5'
							stroke='currentColor'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</span>

			</div>

			{errors[name] && (
				<p className='text-[.5rem] text-white px-1 py-px absolute z-2 bg-red-600 -bottom-2 right-4 rounded-xs'>
					{String(errors[name].message)}
				</p>
			)}
		</div>
	)
}

interface FileUploadProps {
	id: string
	label?: string
	name: string
	microcopy?: string
	accept?: string
	maxSizeMB?: number
	hideLabel?: boolean
	className?: string
	required?: boolean
	uploadToR2?: boolean
}

export const FileUpload = ({
	id,
	label,
	name,
	microcopy,
	accept = 'application/pdf',
	maxSizeMB = 15,
	hideLabel,
	className,
	required,
	uploadToR2 = false
}: FileUploadProps) => {
	const {
		register,
		watch,
		setValue,
		formState: { errors }
	} = useFormContext()

	const inputRef = useRef<HTMLInputElement | null>(null)
	const maxBytes = maxSizeMB * 1024 * 1024

	const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
	const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null)
	const [uploadError, setUploadError] = useState('')

	const files = watch(name) as FileList | string | undefined
	const isStandardFile = !uploadToR2 && files instanceof FileList ? files[0] : null

	const { ref, ...field } = register(name, {
		required: required && 'Este campo é obrigatório',
		...(uploadToR2
			? {}
			: {
				validate: {
					size: (value: FileList) =>
						!value?.[0] || value[0].size <= maxBytes || `O arquivo excede ${maxSizeMB} MB. Reduza o tamanho ou envie um resumo.`,
					type: (value: FileList) =>
						!value?.[0] || value[0].type === 'application/pdf' || 'Formato não suportado. Envie um arquivo PDF.'
				}
			})
	})

	const clearStandard = () => {
		setValue(name, undefined, { shouldValidate: true })
		if (inputRef.current) inputRef.current.value = ''
	}

	const clearR2 = () => {
		setUploadState('idle')
		setUploadedFile(null)
		setUploadError('')
		setValue(name, '', { shouldValidate: true })
		if (inputRef.current) inputRef.current.value = ''
	}

	const handleR2Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		if (file.type !== 'application/pdf') {
			setUploadError('Formato não suportado. Envie um arquivo PDF.')
			setUploadState('error')
			return
		}

		if (file.size > maxBytes) {
			setUploadError(`O arquivo excede ${maxSizeMB} MB. Reduza o tamanho ou envie um resumo.`)
			setUploadState('error')
			return
		}

		setUploadState('uploading')
		setUploadError('')

		try {
			const presignRes = await fetch('/api/r2-presign', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ filename: file.name, contentType: file.type, size: file.size })
			})

			if (!presignRes.ok) {
				const err = await presignRes.json()
				throw new Error(err.error || 'Erro ao preparar upload.')
			}

			const { url, key } = await presignRes.json()

			const uploadRes = await fetch(url, {
				method: 'PUT',
				body: file,
				headers: { 'Content-Type': file.type }
			})

			if (!uploadRes.ok) throw new Error('Erro ao enviar arquivo.')

			setValue(name, key, { shouldValidate: true })
			setUploadedFile({ name: file.name, size: file.size })
			setUploadState('done')
		} catch (err) {
			setUploadError(err instanceof Error ? err.message : 'Erro ao enviar arquivo.')
			setUploadState('error')
			if (inputRef.current) inputRef.current.value = ''
		}
	}

	const formatSize = (bytes: number) => {
		const mb = bytes / 1024 / 1024
		return mb < 0.1 ? `${Math.round(bytes / 1024)} KB` : `${mb.toFixed(1)} MB`
	}

	const showEmpty = uploadToR2 ? uploadState === 'idle' || uploadState === 'error' : !isStandardFile
	const showDone = uploadToR2 ? uploadState === 'done' : !!isStandardFile

	return (
		<div
			className={clsx(
				'relative block w-full mb-2 sm:mb-4',
				className,
				errors[name] && 'text-red-600'
			)}
			data-form-line
		>

			{!hideLabel && (
				<Label
					id={id}
					label={label}
					required={required}
				/>
			)}

			<input
				type='file'
				id={id}
				accept={accept}
				className='sr-only'
				ref={(element) => {
					ref(element)
					inputRef.current = element
				}}
				{...(uploadToR2
					? { onChange: handleR2Change, name }
					: field
				)}
			/>

			{showEmpty && (
				<label
					htmlFor={id}
					className={clsx(
						'flex items-center gap-3 border border-dashed border-gray-lighter rounded-md p-4 cursor-pointer transition-colors duration-200 hover:border-green-dark',
						errors[name] && 'border-red-600'
					)}
				>
					<span className='flex items-center justify-center w-5 h-5 shrink-0 text-current'>
						<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='w-full h-full'>
							<path d='M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48' />
						</svg>
					</span>
					<span className='text-sm opacity-75'>
						{uploadState === 'error' ? uploadError : 'Clique para anexar um arquivo'}
					</span>
				</label>
			)}

			{uploadState === 'uploading' && (
				<div className='flex items-center gap-3 border border-dashed border-gray-lighter rounded-md p-4'>
					<span className='text-sm opacity-75'>A enviar arquivo...</span>
				</div>
			)}

			{showDone && (
				<div className='flex items-center justify-between gap-3 border border-gray-lighter rounded-md p-4'>
					<span className='flex items-center gap-3 min-w-0 text-green-dark'>
						<span className='flex items-center justify-center w-5 h-5 shrink-0 text-current'>
							<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='w-full h-full'>
								<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
								<path d='M14 2v6h6' />
							</svg>
						</span>
						<span className='truncate text-sm'>
							{uploadToR2 ? uploadedFile?.name : isStandardFile?.name}
							<span className='opacity-60'>
								{` · ${formatSize(uploadToR2 ? (uploadedFile?.size ?? 0) : (isStandardFile?.size ?? 0))}`}
							</span>
						</span>
					</span>

					<button
						type='button'
						onClick={uploadToR2 ? clearR2 : clearStandard}
						aria-label='Remover arquivo'
						className='flex items-center justify-center w-5 h-5 shrink-0 text-green-dark transition-opacity duration-200 hover:opacity-60 cursor-pointer'
					>
						<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='w-3.5 h-3.5'>
							<path d='M18 6 6 18M6 6l12 12' />
						</svg>
					</button>
				</div>
			)}

			{microcopy && (
				<p className='text-sm opacity-60 mt-2'>
					{microcopy}
				</p>
			)}

			{errors[name] && (
				<p className='text-[.5rem] text-white px-1 py-px absolute z-2 bg-red-600 -bottom-2 right-4 rounded-xs'>
					{String(errors[name].message)}
				</p>
			)}
		</div>
	)
}

// off-screen anti-spam honeypot - the route drops submissions where `company` is filled
export const Honeypot = () => {
	const { register } = useFormContext() ?? {}

	return (
		<div
			className='absolute left-[-9999px] w-px h-px overflow-hidden'
			aria-hidden='true'
		>
			<label htmlFor='b_website'>Não preencher</label>
			<input
				type='text'
				id='b_website'
				tabIndex={-1}
				autoComplete='off'
				{...(register ? register('b_website') : {})}
			/>
		</div>
	)
}