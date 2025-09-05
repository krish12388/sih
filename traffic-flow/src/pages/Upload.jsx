import { useCallback, useMemo, useRef, useState } from 'react'

function Upload() {
	const [selectedFiles, setSelectedFiles] = useState([])
	const [isDragging, setIsDragging] = useState(false)
	const inputRef = useRef(null)

	// AI analysis output placeholder. Replace with your model's results.
	const [analysisResult, setAnalysisResult] = useState(null)

	const handleFiles = useCallback((fileList) => {
		const files = Array.from(fileList || [])
		if (files.length === 0) return
		setSelectedFiles((prev) => [
			...prev,
			...files.map((file) => ({
				id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID?.() || Math.random()}`,
				file,
				status: 'ready',
			}) ),
		])
	}, [])

	const onDrop = useCallback((e) => {
		e.preventDefault()
		setIsDragging(false)
		if (e.dataTransfer?.files) {
			handleFiles(e.dataTransfer.files)
		}
	}, [handleFiles])

	const onDragOver = useCallback((e) => {
		e.preventDefault()
		setIsDragging(true)
	}, [])

	const onDragLeave = useCallback((e) => {
		e.preventDefault()
		setIsDragging(false)
	}, [])

	const formattedTotalSize = useMemo(() => {
		const total = selectedFiles.reduce((sum, f) => sum + (f.file?.size || 0), 0)
		if (total < 1024) return `${total} B`
		if (total < 1024 * 1024) return `${(total / 1024).toFixed(1)} KB`
		return `${(total / (1024 * 1024)).toFixed(2)} MB`
	}, [selectedFiles])

	const removeFile = useCallback((id) => {
		setSelectedFiles((prev) => prev.filter((f) => f.id !== id))
	}, [])

	const clearAll = useCallback(() => setSelectedFiles([]), [])

	const mockUpload = useCallback(async () => {
		setSelectedFiles((prev) => prev.map((f) => ({ ...f, status: 'uploading' })))
		await new Promise((r) => setTimeout(r, 1000))
		setSelectedFiles((prev) => prev.map((f) => ({ ...f, status: 'done' })))
		// Mock analysis. Swap this with your AI model integration.
		setAnalysisResult({
			predicted: 'Green light',
			accident: 'No',
			confidence: 0.7,
			notes: 'Sample output. Replace with real inference results.',
		})
	}, [])

	return (
		<div className='w-full min-h-screen bg-[#0A0D14] text-white p-6'>
			<div className='w-full flex flex-col gap-6'>
				<div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl w-full p-6 md:p-8 flex flex-col gap-6'>
					<div className='flex items-center justify-between flex-wrap gap-4'>
						<div>
							<h1 className='text-2xl md:text-3xl font-semibold'>Upload files</h1>
							
							<p className='text-white/70 text-sm md:text-base'>Drag and drop files or browse from your device</p>
						</div>
						<div className='text-sm text-white/70'>Total size: <span className='text-white'>{formattedTotalSize}</span></div>
					</div>

					<div
						className={`relative rounded-2xl border border-dashed transition-colors ${isDragging ? 'border-white/60 bg-white/5' : 'border-white/20'} p-6 md:p-10 text-center`}
						onDrop={onDrop}
						onDragOver={onDragOver}
						onDragLeave={onDragLeave}
					>
						<div className='flex flex-col items-center gap-3'>
							<div className='rounded-full bg-white/10 w-12 h-12 flex items-center justify-center'>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' className='w-6 h-6 text-white/90'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M3 15.75V18a3 3 0 003 3h12a3 3 0 003-3v-2.25M7.5 9l4.5-4.5L16.5 9M12 4.5V15'/>
								</svg>
							</div>
							<p className='text-white/90'>Drop files here</p>
							<p className='text-white/60 text-sm'>or</p>
							<button
								onClick={() => inputRef.current?.click()}
								className='px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white transition'
							>
								Browse files
							</button>
							<input
								ref={inputRef}
								type='file'
								multiple
								className='hidden'
								onChange={(e) => handleFiles(e.target.files)}
							/>
						</div>
					</div>

					{selectedFiles.length > 0 && (
						<div className='flex flex-col gap-4'>
							<div className='flex items-center justify-between'>
								<h2 className='text-lg font-medium'>Selected files</h2>
								<div className='flex items-center gap-2'>
									<button onClick={mockUpload} className='px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm transition'>Upload</button>
									<button onClick={clearAll} className='px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/20 text-white/90 text-sm transition'>Clear all</button>
								</div>
							</div>
							<ul className='divide-y divide-white/10 rounded-xl overflow-hidden border border-white/10 bg-white/5'>
								{selectedFiles.map(({ id, file, status }) => (
									<li key={id} className='flex items-center justify-between gap-4 p-3'>
										<div className='flex items-center gap-3 min-w-0'>
											<div className='w-9 h-9 rounded-md bg-white/10 flex items-center justify-center shrink-0'>
												<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' className='w-5 h-5 text-white/90'>
													<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v0A3.375 3.375 0 0010.125 3.75h-1.5A3.375 3.375 0 005.25 7.125V19.5A2.25 2.25 0 007.5 21.75h6.75'/>
												</svg>
											</div>
											<div className='min-w-0'>
												<p className='truncate'>{file.name}</p>
												<p className='text-white/60 text-xs'>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
											</div>
										</div>
										<div className='flex items-center gap-3 shrink-0'>
											<span className={`text-xs px-2 py-1 rounded-full border ${status === 'done' ? 'border-emerald-400/40 text-emerald-300 bg-emerald-400/10' : status === 'uploading' ? 'border-amber-400/40 text-amber-300 bg-amber-400/10' : 'border-white/20 text-white/80 bg-white/5'}`}>
												{status}
											</span>
											<button onClick={() => removeFile(id)} className='px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/20 text-white/80 text-xs transition'>Remove</button>
										</div>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* AI Analysis Output */}
					<div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl w-full p-6 md:p-8 flex flex-col gap-4'>
						<div className='flex items-center justify-between flex-wrap gap-2'>
							<h2 className='text-xl font-semibold'>Analysis output</h2>
							{analysisResult && (
								<span className='text-xs px-2 py-1 rounded-full border border-white/20 text-white/80 bg-white/5'>
									Updated just now
								</span>
							)}
						</div>
						{!analysisResult ? (
							<div className='text-white/70 text-sm'>
								No analysis yet. Upload files to see predicted results here.
							</div>
						) : (
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
									<p className='text-white/60 text-xs'>Predicted</p>
									<p className='text-lg'>{analysisResult.predicted}</p>
								</div>
								<div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
									<p className='text-white/60 text-xs'>Accident</p>
									<p className='text-lg'>{analysisResult.accident}</p>
								</div>
								<div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
									<p className='text-white/60 text-xs'>Confidence</p>
									<p className='text-lg'>{Math.round((analysisResult.confidence || 0) * 100)}%</p>
								</div>
								{analysisResult.notes && (
									<div className='md:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-4'>
										<p className='text-white/60 text-xs'>Notes</p>
										<p className='text-white/90 text-sm'>{analysisResult.notes}</p>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Upload


