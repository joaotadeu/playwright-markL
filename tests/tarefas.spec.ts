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

test('não deve permitir tarefa duplicada', async ({ page, request }) => {
    const tarefa = {
        name: 'Comprar ketchup',
        is_done: false
    }

    await request.delete('http://localhost:3333/helper/tasks/' + tarefa.name)
    const novaTarefa = await request.post('http://localhost:3333/tasks/', { data: tarefa })
    expect(novaTarefa.ok()).toBeTruthy()

    await page.goto('http://localhost:8080/')
    await expect(page).toHaveTitle('Gerencie suas tarefas com Mark L')

    const inputNewTask = page.locator('input[class*=InputNewTask]')
    await inputNewTask.fill(tarefa.name)
    await page.click('css=button >> text=Create')

    const target = page.locator('.swal2-html-container')
    await expect(target).toHaveText('Task already exists!')
})