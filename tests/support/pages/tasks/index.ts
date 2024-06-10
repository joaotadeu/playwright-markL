import { Page, expect } from "@playwright/test"
import { tarefaModel } from "../../../fixtures/tarefa.model"

export class TarefasPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async criarTarefa(tarefa: tarefaModel) {
        const inputNewTask = this.page.locator('input[class*=InputNewTask]')
        // Verifica se o input está visível antes de interagir
        await expect(inputNewTask).toBeVisible()
        await inputNewTask.fill(tarefa.name)
        const createButton = this.page.locator('css=button >> text=Create')
        await expect(createButton).toBeVisible() // Verifica se o botão está visível antes de clicar
        await createButton.click()
    }

    async homePage(){
        await this.page.goto('http://localhost:8080')
        await expect(this.page).toHaveTitle('Gerencie suas tarefas com Mark L')
    }

    async devoVerTexto(tarefaName: string){
        const target = this.page.locator(`css=.task-item p >> text=${tarefaName}`)
        await expect(target).toBeVisible()
    }

    async validaToast(text: string){
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }

    async validaMensagem(text: string){
        const inputTarefaName = this.page.locator('input[class*=InputNewTask]')
        const validaMessage = await inputTarefaName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validaMessage).toEqual(text)
    }
}