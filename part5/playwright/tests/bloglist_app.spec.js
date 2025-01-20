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
  
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
        await page.getByRole('textbox').first().fill("user2@example.com") //fill form
        await page.getByRole('textbox').last().fill("password2")
        await page.getByRole('button', { name: 'Login' }).click() //click Login button
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('testTitle')
      await textboxes[1].fill('testAuthor')
      await textboxes[2].fill('http://testURL.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.waitForSelector('text=testTitle')
      await expect(page.getByText('testTitle, testAuthor')).toBeVisible()
     })

     
    test('a blog can be liked.', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      const likes_XPath = '//*[@id="likes"]'
      const likesBefore = await page.locator(likes_XPath).innerText()
      const likesBeforeNumber = parseInt(likesBefore.split(' ')[1])

      await page.getByRole('button', { name: 'like' }).click()     
      await page.waitForTimeout(100)
      const likesAfter = await page.locator(likes_XPath).innerText()
      const likesAfterNumber = parseInt(likesAfter.split(' ')[1])
      await expect(likesAfterNumber).toBe(likesBeforeNumber + 1)
     })

    test('the user who added the blog can delete the blog.', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
    
      page.on('dialog', dialog => dialog.accept())
    
      await page.getByRole('button', { name: 'delete' }).click()
      await page.waitForTimeout(100)
      await expect(page.getByText('testTitle, testAuthor')).not.toBeVisible()     
    })
  })
})