// h3 v2 is ESM-only, and the bench runner only resolves .ts/.js — load it dynamically from CJS
import('h3-v2').then(({ H3, serve }) => {
	const app = new H3()

	app.get('/', (event) => {
		event.res.headers.set('content-type', 'text/plain')

		return 'Hi'
	})

	app.get('/id/:id', (event) => {
		event.res.headers.set('content-type', 'text/plain')
		event.res.headers.set('x-powered-by', 'benchmark')

		return `${event.context.params.id} ${event.url.searchParams.get('name')}`
	})

	app.post('/json', (event) => event.req.json())

	// silent: match the other benches (no startup banner)
	// gracefulShutdown: the runner reuses port 3000 0.3s after SIGTERM — don't hold it open
	serve(app, { port: 3000, silent: true, gracefulShutdown: false })
})
