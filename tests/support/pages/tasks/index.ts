import { Locator, Page, expect } from "@playwright/test"
import { tarefaModel } from "../../../fixtures/tarefa.model"

export class TarefasPage {
    readonly page: Page
    readonly inputTarefaName: Locator

    constructor(page: Page) {
        this.page = page
        this.inputTarefaName = page.locator('input[class*=InputNewTask]')
    }

    async criarTarefa(tarefa: tarefaModel) {
        await this.inputTarefaName.fill(tarefa.name)
        const createButton = this.page.locator('css=button >> text=Create')
        await expect(createButton).toBeVisible() // Verifica se o botão está visível antes de clicar
        await createButton.click()
    }

    async homePage(){
        await this.page.goto('http://localhost:8080')
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
        const validaMessage = await this.inputTarefaName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validaMessage).toEqual(text)
    }

    async validaToggle(tarefaName: string) {
        const target = await this.page.locator(`//p[text()="${tarefaName}"]/..//button[contains(@class, "Toggle")]`)
        await target.click()
    }
    
    async deveEstaConcluido(tarefaName: string){
        const target = this.page.getByText(tarefaName)
        await expect(target).toHaveCSS('text-decoration-line', 'line-through')
    }

    async removeTarefa(tarefaName: string){
        const target = await this.page.locator(`//p[text()="${tarefaName}"]/..//button[contains(@class, "Delete")]`)
        await target.click()
    }

    async deveSerExcluido(tarefaName: string){
        const target = this.page.locator(`css=.task-item p >> text=${tarefaName}`)
        await expect(target).not.toBeVisible()
    }
}