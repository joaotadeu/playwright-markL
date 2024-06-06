import {test, expect} from '@playwright/test'

test('webApp deve estar online', async ({page})=> {
    await page.goto('http://127.0.0.1:8080')
        
})

