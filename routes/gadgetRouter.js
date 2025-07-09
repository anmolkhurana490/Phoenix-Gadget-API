import { Router } from "express";
import { getGadgets, getGadgetByStatus, createGadget, updateGadget, deleteGadget, self_destruct } from "../controllers/gadgetController.js";

const router = Router();

// Gadget Inventory Routes
router.get("/", async (req, res) => {
    try {
        const status = req.query.status;

        if (status) { // if path = "/gadgets?status={status}"
            const gadgets = await getGadgetByStatus(status);
            return res.status(200).json(gadgets);
        }
        else { // if path = "/gadgets"
            const gadgets = await getGadgets();
            res.status(200).json(gadgets);
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const gadget = await createGadget(req.body);
        res.status(201).json(gadget);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedGadget = await updateGadget(id, req.body);
        res.status(200).json(updatedGadget);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Gadget ID is required" });
        }

        await deleteGadget(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Gadget Self-Destruct routes
router.post("/:id/self-destruct", async (req, res) => {
    try {
        const { id } = req.params;
        const code = await self_destruct(id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;