
const app = require("./app");

const PORT = process.env.PORT || 3000;

function startServer() {
    return app.listen(PORT, "0.0.0.0", () => {
        console.log(`API démarrée sur le port ${PORT}`);
    });
}

if (require.main === module) {
    startServer();
}

module.exports = { startServer };
