import { expect, APIRequestContext } from "@playwright/test"
import { tarefaModel } from '../fixtures/tarefa.model'

export async function deleteTarefaByHelper(request: APIRequestContext, nomeTarefa: String) {
    await request.delete('http://localhost:3333/helper/tasks/' + nomeTarefa)

}

export async function postTarefa(request: APIRequestContext, tarefa: tarefaModel) {
    const novaTarefa = await request.post('http://localhost:3333/tasks/', { data: tarefa })
    expect(novaTarefa.ok()).toBeTruthy()
}