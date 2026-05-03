import { test, expect } from '@playwright/test';

test.describe('VoteWise AI Application', () => {
  test('has proper page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/VoteWise AI/);
  });

  test('loads main navigation elements', async ({ page }) => {
    await page.goto('/');
    
    // Check for main navigation
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('button', { name: /Go to Timeline/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Go to Learn/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Go to AI Help/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Go to Test/i })).toBeVisible();
  });

  test('displays hero section correctly', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: 'VoteWise AI' })).toBeVisible();
    await expect(page.getByText(/Your comprehensive guide to understanding elections/)).toBeVisible();
  });

  test('timeline interaction works', async ({ page }) => {
    await page.goto('/');
    
    // Check timeline is visible
    await expect(page.getByRole('tablist', { name: /Election Process Steps/i })).toBeVisible();
    
    // Click on different timeline steps
    await page.getByRole('tab', { name: /View step 2: Candidate Filing/i }).click();
    await expect(page.getByText('Candidate Filing')).toBeVisible();
    
    await page.getByRole('tab', { name: /View step 3: Campaigning/i }).click();
    await expect(page.getByText('Campaigning')).toBeVisible();
  });

  test('navigation between sections works', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to Learn section
    await page.getByRole('button', { name: /Go to Learn/i }).click();
    await expect(page.getByText('Loading Modules...')).toBeVisible();
    
    // Wait for content to load
    await page.waitForTimeout(1000);
    
    // Navigate to AI Assistant
    await page.getByRole('button', { name: /Go to AI Help/i }).click();
    await expect(page.getByText('Loading Assistant...')).toBeVisible();
    
    // Navigate to Quiz
    await page.getByRole('button', { name: /Go to Test/i }).click();
    await expect(page.getByText('Loading Quiz...')).toBeVisible();
  });

  test('mobile menu works', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport
    
    // Check hamburger menu is visible
    await expect(page.getByLabel('Toggle mobile menu')).toBeVisible();
    
    // Open mobile menu
    await page.getByLabel('Toggle mobile menu').click();
    await expect(page.getByRole('navigation', { name: 'Mobile Navigation' })).toBeVisible();
    
    // Check mobile navigation items
    await expect(page.getByRole('button', { name: /Timeline/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Learn/i })).toBeVisible();
    
    // Close mobile menu
    await page.getByLabel('Toggle mobile menu').click();
    await expect(page.getByRole('navigation', { name: 'Mobile Navigation' })).not.toBeVisible();
  });

  test('AI Assistant section loads', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to AI Assistant
    await page.getByRole('button', { name: /Go to AI Help/i }).click();
    
    // Wait for loading
    await page.waitForSelector('text=Loading Assistant...', { state: 'hidden' });
    
    // Check AI Assistant elements
    await expect(page.getByText('AI Election Assistant')).toBeVisible();
    await expect(page.getByPlaceholderText(/Please setup API key first/)).toBeVisible();
  });

  test('footer is present', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to bottom to ensure footer is loaded
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check footer elements
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(page.getByText('VoteWise')).toBeVisible();
    await expect(page.getByText('Educational purpose only')).toBeVisible();
  });

  test('accessibility features work', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper ARIA labels
    await expect(page.getByRole('banner')).toBeVisible(); // header
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible(); // footer
    
    // Check keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: /Go to Timeline/i })).toBeFocused();
  });

  test('responsive design works', async ({ page }) => {
    // Test desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Main Navigation' })).toBeVisible();
    
    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('navigation', { name: 'Main Navigation' })).toBeVisible();
    
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('navigation', { name: 'Main Navigation' })).not.toBeVisible();
    await expect(page.getByLabel('Toggle mobile menu')).toBeVisible();
  });
});
