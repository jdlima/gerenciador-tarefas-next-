import type {NextApiRequest, NextApiResponse} from 'next';
import { dbConnect } from '../../middlewares/dbConnect';
import { jwtValidator } from '../../middlewares/jwtValidator';
import { TaskModel } from '../../models/TaskModel';
import { DefaultResponse } from '../../types/DefaultResponse';
import { Task } from '../../types/Tasks';
import { TaskRequest } from '../../types/TaskRequest';

const handler = async ( req : NextApiRequest, res : NextApiResponse<DefaultResponse>) => {
try {
    switch(req.method){
        case 'POST':
            await saveTask(req,res);
            default:
                break;
    }


    res.status(400).json({ error: 'Metodo informado nao esta disponivel.'});
}catch(e){
    console.log(e);
    res.status(500).json({ error: 'Ocorreu erro ao gerenciar tarefas, tente novamente.'});
}
}



const saveTask = async ( req : NextApiRequest, res : NextApiResponse<DefaultResponse>) => { 
    const obj : TaskRequest = req.body;
    const userId= req.body?.userId;


if(!obj.name || obj.name.length < 3) {
    return res.status(400).json({ error: 'Nome da tarefa invalido.'});
}



if(!userId ) {
    return res.status(400).json({ message: 'Usuario nao encontrado.'});
}


if(!obj.finishPrevisionDate ) {
    return res.status(400).json({ message: 'Data de previsao nao informada.'});
}


const task : Task = {
    userId,
    name: obj.name,
    finishPrevisionDate : obj.finishPrevisionDate
};


await TaskModel.create(task);
return res.status(200).json({ message: 'Tarefa criado com sucesso.'});

}

export default  dbConnect(jwtValidator(handler));