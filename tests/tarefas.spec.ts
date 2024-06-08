import { test, expect } from '@playwright/test'
import { tarefaModel } from './fixtures/tarefa.model'
import { deleteTarefaByHelper, postTarefa } from './support/helpers'

// Agrupando testes relacionados a tarefas
test.describe('Gestão de Tarefas', () => {

    test.beforeEach(async ({ page }) => {
        // Coloque aqui as configurações ou pré-condições comuns a todos os testes deste grupo
        await page.goto('http://localhost:8080/')
        await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L')
    })

    test('deve poder cadastrar tarefa com sucesso', async ({ page, request }) => {
        const tarefa: tarefaModel = {
            name: 'Ler um livro de TypeScript',
            is_done: false
        }

        // Deleta qualquer tarefa existente com o mesmo nome
        await deleteTarefaByHelper(request, tarefa.name)

        const inputNewTask = page.locator('input[class*=InputNewTask]')
        await inputNewTask.fill(tarefa.name)
        await page.click('css=button >> text=Create')

        const target = page.locator(`css=.task-item p >> text=${tarefa.name}`)
        await expect(target).toBeVisible()
    })

    test('não deve permitir tarefa duplicada', async ({ page, request }) => {
        const tarefa: tarefaModel = {
            name: 'Comprar ketchup',
            is_done: false
        }

        // Deleta qualquer tarefa existente com o mesmo nome
        await deleteTarefaByHelper(request, tarefa.name)
        // Cria a tarefa inicialmente
        await postTarefa(request, tarefa)

        const inputNewTask = page.locator('input[class*=InputNewTask]')
        await inputNewTask.fill(tarefa.name)
        await page.click('css=button >> text=Create')

        const target = page.locator('.swal2-html-container')
        await expect(target).toHaveText('Task already exists!')
    })
})