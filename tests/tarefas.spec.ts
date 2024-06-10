import { test, expect } from '@playwright/test'
import { tarefaModel } from './fixtures/tarefa.model'
import { deleteTarefaByHelper, postTarefa } from './support/helpers'
import { TarefasPage } from './support/pages/tasks'
import dados from './fixtures/tarefas.json'

test.describe('Gestão de Tarefas', () => {

    test('deve poder cadastrar tarefa com sucesso', async ({ page, request }) => {
        const tarefa = dados.cadastro_sucesso as tarefaModel
        const tarefasPage = new TarefasPage(page)

        await deleteTarefaByHelper(request, tarefa.name)
        await tarefasPage.homePage() // Use `await` para garantir que a navegação seja concluída
        await tarefasPage.criarTarefa(tarefa) // Use `await` para garantir que a tarefa seja criada
        await tarefasPage.devoVerTexto(tarefa.name) // Use `await` para verificar a visibilidade do texto
    })

    test('não deve permitir tarefa duplicada', async ({ page, request }) => {
        const tarefa = dados.cadastro_incorreto as tarefaModel

        const tarefasPage = new TarefasPage(page)

        await deleteTarefaByHelper(request, tarefa.name)
        await postTarefa(request, tarefa)

        await tarefasPage.homePage()
        await tarefasPage.criarTarefa(tarefa)
        await tarefasPage.validaToast('Task already exists!')
    })

    test('não deve permitir criar tarefa sem preencher a descrição', async ({page}) => {
        const tarefa = dados.campo_obrigatorio as tarefaModel
        const tarefasPage = new TarefasPage(page)

        await tarefasPage.homePage()
        await tarefasPage.criarTarefa(tarefa)
        await tarefasPage.validaMensagem('This is a required field')

    })
})