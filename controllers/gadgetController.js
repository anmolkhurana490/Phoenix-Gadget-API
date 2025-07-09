import { Gadget } from "../config/db.js";

// Code for Gadget Inventory Management
export const getGadgets = async () => {
    const gadgets = await Gadget.findAll();
    return gadgets.map(gadget => ({ ...gadget.dataValues, success: Math.random() * 100 }));
}

export const getGadgetByStatus = async (status) => {
    const gadgets = await Gadget.findAll({ where: { status } });
    return gadgets.map(gadget => ({ ...gadget.dataValues, success: Math.random() * 100 }));
}

export const createGadget = async (data) => {
    const gadget = await Gadget.create({ ...data, name: generateRandomCodename() });
    return gadget;
}

const generateRandomCodename = () => {
    const adjectives = [
        'Silent', 'Shadow', 'Crimson', 'Iron', 'Golden', 'Stealthy', 'Deadly', 'Night', 'Swift', 'Cobalt', 'Phantom', 'Obsidian', 'Electric', 'Frost', 'Blazing', 'Quantum', 'Mystic', 'Solar', 'Lunar', 'Vigilant', 'Scarlet', 'Emerald', 'Titanium', 'Arcane', 'Storm', 'Nebula', 'Inferno', 'Ivory', 'Onyx', 'Azure', 'Radiant', 'Spectral'
    ];
    const nouns = [
        'Falcon', 'Nightingale', 'Kraken', 'Panther', 'Viper', 'Sphinx', 'Raven', 'Specter', 'Wolf', 'Eagle', 'Dragon', 'Cobra', 'Jaguar', 'Phoenix', 'Leopard', 'Wraith', 'Hawk', 'Tiger', 'Hydra', 'Mamba', 'Griffin', 'Lynx', 'Basilisk', 'Condor', 'Scorpion', 'Osprey', 'Mantis', 'Cougar', 'Cheetah', 'Gryphon', 'Serpent', 'Fox'
    ];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `The ${randomAdjective} ${randomNoun}`;
}

export const updateGadget = async (id, data) => {
    const updated = await Gadget.update(data, { where: { id } });

    if (updated) {
        const updatedGadget = await Gadget.findOne({ where: { id } });
        return updatedGadget;
    } else {
        throw new Error("Gadget not found while updating");
    }
}

export const deleteGadget = async (id) => {
    const deleted = await Gadget.update({
        status: "Decommissioned",
        decommissioned_at: Date.now()
    }, { where: { id } });

    if (!deleted) {
        throw new Error("Gadget not found while deleting");
    }
}

// Code for Gadget Self-Destruct
export const self_destruct = async (id) => {
    const gadget = await Gadget.update({ status: "Destroyed" }, { where: { id } });
    if (!gadget) {
        throw new Error("Gadget not found while self-destructing");
    }

    // Simulate Confirmation Code
    const code = generateCode();
    return code;
}

const generateCode = (len) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let code = '';
    for (let i = 0; i < len; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}