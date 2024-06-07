import { test, expect } from '@playwright/test'

test('deve poder cadastrar tarefa com sucesso', async ({ page, request }) => {

    // Dado que tenho uma nova tarefa
    const nomeTarefa = 'Ler um Livro de TypeScript'
    await request.delete('http://localhost:3333/helper/tasks/' + nomeTarefa)

    // E que estou na página de cadastro
    await page.goto('http://localhost:8080/')
    await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L')

    // Quando faço o cadastro dessa tarefa
    const inputNewTask = page.locator('input[class*=InputNewTask]')
    await inputNewTask.fill(nomeTarefa)
    //await page.click('//button[contains(text(), "Create")]')
    await page.click('css=button >> text=Create')

    // Então essa tarefa deve ser exibida
    const target = page.getByTestId('task-item')
    await expect(target).toHaveText(nomeTarefa)

})