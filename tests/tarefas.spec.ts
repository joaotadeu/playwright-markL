import { test, expect } from '@playwright/test'
import { tarefaModel } from './fixtures/tarefa.model'
import { deleteTarefaByHelper, postTarefa } from './support/helpers'
import { TarefasPage } from './support/pages/tasks'
import dados from './fixtures/tarefas.json'

test.describe('Gestão de Tarefas', () => {

    let tarefasPage: TarefasPage

    test.beforeEach(({ page }) => {
        tarefasPage = new TarefasPage(page)
    })

    test('deve poder cadastrar tarefa com sucesso', async ({ page, request }) => {
        const tarefa = dados.cadastro_sucesso as tarefaModel

        await deleteTarefaByHelper(request, tarefa.name)
        await tarefasPage.homePage() // Use `await` para garantir que a navegação seja concluída
        await tarefasPage.criarTarefa(tarefa) // Use `await` para garantir que a tarefa seja criada
        await tarefasPage.devoVerTexto(tarefa.name) // Use `await` para verificar a visibilidade do texto
    })

    test('não deve permitir tarefa duplicada', async ({ page, request }) => {
        const tarefa = dados.cadastro_incorreto as tarefaModel

        await deleteTarefaByHelper(request, tarefa.name)
        await postTarefa(request, tarefa)

        await tarefasPage.homePage()
        await tarefasPage.criarTarefa(tarefa)
        await tarefasPage.validaToast('Task already exists!')
    })

    test('não deve permitir criar tarefa sem preencher a descrição', async ({ page }) => {
        const tarefa = dados.campo_obrigatorio as tarefaModel

        await tarefasPage.homePage()
        await tarefasPage.criarTarefa(tarefa)
        await tarefasPage.validaMensagem('This is a required field')

    })

    test('deve concluir uma tarefa', async ({ page, request }) => {
        const tarefa = dados.atualizacao_tarefa as tarefaModel

        await deleteTarefaByHelper(request, tarefa.name)
        await postTarefa(request, tarefa)

        await tarefasPage.homePage()
        await tarefasPage.validaToggle(tarefa.name)
        await tarefasPage.deveEstaConcluido(tarefa.name)
    })

    test('exlusão de tarefa', async ({ page, request }) => {
        const tarefa = dados.atualizacao_tarefa as tarefaModel

        await deleteTarefaByHelper(request, tarefa.name)
        await postTarefa(request, tarefa)

        await tarefasPage.homePage()
        await tarefasPage.removeTarefa(tarefa.name)
        await tarefasPage.deveSerExcluido(tarefa.name)


    })
})