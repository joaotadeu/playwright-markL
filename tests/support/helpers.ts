import { expect, APIRequestContext } from "@playwright/test"
import { tarefaModel } from '../fixtures/tarefa.model'

const BASE_API = process.env.BASE_API

export async function deleteTarefaByHelper(request: APIRequestContext, nomeTarefa: String) {
    await request.delete(`${BASE_API}/helper/tasks/${nomeTarefa}`)

}

export async function postTarefa(request: APIRequestContext, tarefa: tarefaModel) {
    const novaTarefa = await request.post(`${BASE_API}/tasks/`, { data: tarefa })
    expect(novaTarefa.ok()).toBeTruthy()
}