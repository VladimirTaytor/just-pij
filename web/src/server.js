import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import cookieParser from 'cookie-parser'

import { i18nMiddleware } from './i18n.js';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// How it works: https://sapper.svelte.dev/docs#sapper_build
polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
    cookieParser(),
    i18nMiddleware(),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
