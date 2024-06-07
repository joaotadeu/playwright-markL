import { test, expect } from '@playwright/test'

test('deve poder cadastrar tarefa com sucesso', async ({ page, request }) => {

    await request.delete('http://localhost:3333/helper/tasks/Ler um livro de TypeScript')

    await page.goto('http://localhost:8080/')
    await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L')

    const inputNewTask = page.locator('input[class*=InputNewTask]')
    await inputNewTask.fill('Ler um livro de TypeScript')
    //await page.click('//button[contains(text(), "Create")]')
    await page.click('css=button >> text=Create')

})