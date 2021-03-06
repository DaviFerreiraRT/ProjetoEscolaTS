import { Router } from 'express';
import * as Joi from 'joi';
import DisciplinaDAO from '../dao/disciplinaDAO';
import AppError from '../error/AppError';

const router = Router();

router.post('/disciplina', async (request, response) => {
    const { body } = request;

    const schema = Joi.object({
        nome: Joi.string().max(50).required(),
    });
    const rs = schema.validate(body, { abortEarly: false });
    if (rs.error) {
        throw new AppError(rs.error.message);
    }
    const disciplina = await DisciplinaDAO.create({
        nome: String(body.nome),
    });
    return response.status(200).json(disciplina);
});

router.get('/disciplina', async (request, response) => {
    const { body } = request;
    const schema = Joi.object({
        id: Joi.string().uuid().required(),
    });
    const rs = schema.validate(body, { abortEarly: false });
    if (rs.error) {
        throw new AppError(rs.error.message);
    }
    const disciplina = await DisciplinaDAO.findById({ id: body.id });
    if (disciplina) {
        return response.status(200).json({ disciplina });
    }
    return response.status(204).json({});
});

router.delete('/disciplina', async (request, response) => {
    const { body } = request;
    const schema = Joi.object({
        id: Joi.string().uuid().required(),
    });
    const rs = schema.validate(body, { abortEarly: false });
    if (rs.error) {
        throw new AppError(rs.error.message);
    }
    const rsDelete = await DisciplinaDAO.removeById({ id: body.id });
    return response.status(200).json({ resultado: rsDelete });
});

router.get('/listTurma', async (request, response) => {
    const disciplina = await DisciplinaDAO.listDisciplinas();
    return response.status(200).json(disciplina);
});
export default router;
