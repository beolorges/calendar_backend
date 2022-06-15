const eventModel = require('../models/event');
const eventUserModel = require('../models/eventUser');
const eventUserProvisionalModel = require('../models/eventUserProvisional');
const userModel = require('../models/user');

module.exports = {
    async create(req, res) {
        try {
            const event = req.body;
            const response = await eventModel.create({ user_id: event?.user_id, name: event?.name, startTime: event?.startTime, endTime: event?.endTime, description: event?.description, location: event?.location });

            event?.userEmails?.map(async (email) => {
                const user_id = await userModel.getUserIdByEmail(email);
                if (user_id)
                    await eventUserProvisionalModel.create({ event_id: response.event_id, user_id: user_id });
            })

            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }

    },

    async getByEventId(req, res) {
        try {
            const { event_id } = req.params;
            const response = await eventModel.getByEventId(event_id);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(500).json({ message: "Evento não encontrados" });
        }
    },

    async getAllByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const createdByUser = await eventModel.getCreatedByUser(user_id);
            const acceptedByUser = await eventUserModel.get(user_id);
            const notAcceptedByUserYet = await eventUserProvisionalModel.get(user_id);

            const response = { createdByUser, acceptedByUser, notAcceptedByUserYet };

            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(500).json({ message: "Eventos não encontrados" });
        }
    },

    async acceptEvent(req, res) {
        try {
            const { user_id, event_id } = req.params;
            const del = await eventUserProvisionalModel.delete({ event_id, user_id });
            if (!del)
                return res.status(500).json({ message: "Evento não encontrado" });

            const response = await eventUserModel.create({ event_id, user_id });

            return res.status(200).json(response);

        } catch (error) {
            return res.status(500).json({ message: "Erro ao aceitar evento" });
        }

    },

    async delete(req, res) {
        try {
            const { user_id, event_id } = req.params;
            const response = await eventModel.delete({ event_id, user_id });

            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar evento" });
        }
    }

}