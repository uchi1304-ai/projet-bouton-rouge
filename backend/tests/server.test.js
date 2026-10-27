
jest.mock("../app", () => ({
    listen: jest.fn()
}));

describe("Tests du démarrage du serveur", () => {

    const originalPort = process.env.PORT;

    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
        delete process.env.PORT;
    });

    afterEach(() => {
        if (originalPort === undefined) {
            delete process.env.PORT;
        } else {
            process.env.PORT = originalPort;
        }

        jest.restoreAllMocks();
    });

    test("Démarrage sur le port 3000", () => {
        const app = require("../app");
        const { startServer } = require("../server");

        startServer();

        expect(app.listen).toHaveBeenCalledWith(
            3000,
            "0.0.0.0",
            expect.any(Function)
        );
    });

    test("Démarrage sur un port personnalisé", () => {
        process.env.PORT = "4000";

        const app = require("../app");
        const { startServer } = require("../server");

        startServer();

        expect(app.listen).toHaveBeenCalledWith(
            "4000",
            "0.0.0.0",
            expect.any(Function)
        );
    });

    test("Affichage du message de démarrage", () => {
        const app = require("../app");
        const { startServer } = require("../server");

        const logSpy = jest.spyOn(console, "log")
            .mockImplementation(() => {});

        startServer();

        const callback = app.listen.mock.calls[0][2];
        callback();

        expect(logSpy).toHaveBeenCalledWith(
            "API démarrée sur le port 3000"
        );
    });

});
