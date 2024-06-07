import { test, expect } from '@playwright/test'

test('deve poder cadastrar tarefa com sucesso', async ({ page, request }) => {

    const nomeTarefa = 'Ler um Livro de TypeScript'
    await request.delete('http://localhost:3333/helper/tasks/' + nomeTarefa)

    await page.goto('http://localhost:8080/')
    await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L')

    const inputNewTask = page.locator('input[class*=InputNewTask]')
    await inputNewTask.fill(nomeTarefa)
    await page.click('css=button >> text=Create')

    const target = page.locator(`css=.task-item p >> text=${nomeTarefa}`)
    await expect(target).toBeVisible()

})