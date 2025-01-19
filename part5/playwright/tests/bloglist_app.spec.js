const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')

  })
  
  describe('Login', () => {
    test('form is shown', async ({ page }) => {
        await expect(page.getByText('Login to application')).toBeVisible() //check form
    })
    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByRole('textbox').first().fill("user2@example.com") //fill form
        await page.getByRole('textbox').last().fill("password2")
        await page.getByRole('button', { name: 'Login' }).click() //click Login button
        await expect(page.getByText('User Two logged in')).toBeVisible()  
    })
    test('fails with incorrect credentials', async ({ page }) => {
        await page.getByRole('textbox').first().fill("user2@example.com") //fill form
        await page.getByRole('textbox').last().fill("wrongpassword")
        await page.getByRole('button', { name: 'Login' }).click() //click Login button
        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(page.getByText('User Two logged in')).not.toBeVisible() 
    })
  })
  
})