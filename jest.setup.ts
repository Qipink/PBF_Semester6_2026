require('@testing-library/jest-dom');

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

const { useRouter } = require('next/router');

const defaultRouter = {
	route: '/',
	pathname: '/',
	query: {},
	asPath: '/',
	push: jest.fn(),
	replace: jest.fn(),
	back: jest.fn(),
	prefetch: jest.fn(),
	reload: jest.fn(),
	events: {
		on: jest.fn(),
		off: jest.fn(),
		emit: jest.fn(),
	},
	isFallback: false,
	isLocaleDomain: true,
	isReady: true,
};

(global as any).mockNextRouter = (overrides = {}) => {
	(useRouter as jest.Mock).mockReturnValue({
		...defaultRouter,
		...overrides,
	});
};

beforeEach(() => {
	(global as any).mockNextRouter();
});