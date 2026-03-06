const { blocks } = require('./scripts/blocks');
const { dashboard } = require('./scripts/dashboard');
const { wizard } = require('./scripts/wizard');
const { frontendModular } = require('./scripts/frontend-modular');

module.exports = [
    blocks,
    dashboard,
    wizard,
    frontendModular,
];
