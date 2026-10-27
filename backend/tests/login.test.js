
const request = require("supertest");
const app = require("../app");




describe("Tests API Login", () => {

    test("Identifiants corrects", async () => {
        const res = await request(app)
            .post("/login")
            .send({ username: "admin", password: "docker" });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            success: true,
            message: "Bienvenue. Et surtout, ne touche pas au bouton."
        });
    });

    test("Mot de passe incorrect", async () => {
        const res = await request(app)
            .post("/login")
            .send({ username: "admin", password: "faux" });

        expect(res.status).toBe(401);
        expect(res.body.success).toBe(false);
    });

    test("Utilisateur incorrect", async () => {
        const res = await request(app)
            .post("/login")
            .send({ username: "inconnu", password: "docker" });

        expect(res.status).toBe(401);
    });

    test("Identifiants absents", async () => {
        const res = await request(app)
            .post("/login")
            .send({});

        expect(res.status).toBe(401);
    });
});


    test("Login avec body undefined", () => {
        const route = app._router.stack.find(
            layer => layer.route && layer.route.path === "/login"
        );

        const handler = route.route.stack[0].handle;

        const req = { body: undefined };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        handler(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Identifiants incorrects."
        });
    });