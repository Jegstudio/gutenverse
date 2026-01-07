const { blocks } = require('./scripts/blocks');
const { dashboard } = require('./scripts/dashboard');
const { wizard } = require('./scripts/wizard');
const { frontendModular } = require('./scripts/frontend-modular');
const { formFallback } = require('./scripts/frontend-form-fallback');

module.exports = [
    blocks,
    dashboard,
    wizard,
    frontendModular,
    formFallback
].map((config) => ({
    ...config,
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
}));
