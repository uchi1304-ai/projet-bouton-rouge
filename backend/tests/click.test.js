
const request = require("supertest");
const app = require("../app");

describe("Tests API Click", () => {

    test.each([
        [1, false],
        [15, false],
        [29, false],
        [30, true]
    ])("Clic %i retourne finished = %s", async (count, finished) => {
        const res = await request(app)
            .post("/click")
            .send({ count });

        expect(res.status).toBe(200);
        expect(res.body.count).toBe(count);
        expect(res.body.finished).toBe(finished);
        expect(typeof res.body.message).toBe("string");
    });

    test.each([
        0, -1, 31, 2.5, "5", null
    ])("Clic invalide : %s", async (count) => {
        const res = await request(app)
            .post("/click")
            .send({ count });

        expect(res.status).toBe(400);
        expect(res.body.error).toBe(
            "Le nombre de clics doit être compris entre 1 et 30."
        );
    });

    test("Compteur absent", async () => {
        const res = await request(app)
            .post("/click")
            .send({});

        expect(res.status).toBe(400);
    });
});


    test("Click avec body undefined", () => {
        const route = app._router.stack.find(
            layer => layer.route && layer.route.path === "/click"
        );

        const handler = route.route.stack[0].handle;

        const req = { body: undefined };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        handler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });