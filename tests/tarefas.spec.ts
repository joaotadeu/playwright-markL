import { test, expect } from '@playwright/test'
import { tarefaModel } from './fixtures/tarefa.model'
import { deleteTarefaByHelper, postTarefa } from './support/helpers'
import { TarefasPage } from './support/pages/tasks'

test.describe('Gestão de Tarefas', () => {

    test('deve poder cadastrar tarefa com sucesso', async ({ page, request }) => {
        const tarefa: tarefaModel = {
            name: 'Ler um livro de TypeScript',
            is_done: false
        }

        const tarefasPage = new TarefasPage(page)

        await deleteTarefaByHelper(request, tarefa.name)
        await tarefasPage.homePage() // Use `await` para garantir que a navegação seja concluída
        await tarefasPage.criarTarefa(tarefa) // Use `await` para garantir que a tarefa seja criada
        await tarefasPage.devoVerTexto(tarefa.name) // Use `await` para verificar a visibilidade do texto
    })

    test('não deve permitir tarefa duplicada', async ({ page, request }) => {
        const tarefa: tarefaModel = {
            name: 'Comprar ketchup',
            is_done: false
        }

        await deleteTarefaByHelper(request, tarefa.name)
        await postTarefa(request, tarefa)

        await page.goto('http://localhost:8080/')
        await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L')

        const inputNewTask = page.locator('input[class*=InputNewTask]')
        await inputNewTask.fill(tarefa.name)
        await page.click('css=button >> text=Create')

        const target = page.locator('.swal2-html-container')
        await expect(target).toHaveText('Task already exists!')
    })
})