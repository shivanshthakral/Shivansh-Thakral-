import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1200,height:630},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 await page.addStyleTag({content:'.site-header,.floating-dock,.personal-topline,.hero-aside,.personal-hero-foot,.hello-sticker{display:none!important}.personal-hero{margin:0;min-height:630px;padding-top:1px}.personal-name{margin-top:60px;font-size:165px}.portrait-stage{inset:60px 23% 0}.name-star{animation:none}'});
 await page.screenshot({path:'public/og.png'});
 await page.reload({waitUntil:'networkidle'});
 await page.setViewportSize({width:390,height:844});
 await page.locator('#life').scrollIntoViewIfNeeded();
 await page.locator('#life').screenshot({path:'qa/final-mobile-life.png'});
 const print=page.locator('.photo-print[data-rank="0"]');const box=await print.boundingBox();
 await page.mouse.move(box.x+box.width*.7,box.y+box.height*.5);await page.mouse.down();await page.mouse.move(box.x+box.width*.3,box.y+box.height*.5,{steps:8});await page.mouse.up();
 assert.equal(await page.locator('.photo-print[data-rank="0"] img').getAttribute('src'),'/photos/adventure.webp');assert.equal(await page.locator('.photo-dialog[open]').count(),0);
 await page.getByRole('button',{name:'Enlarge photo: A little adventure'}).click();
 const modalBox=await page.locator('.photo-dialog').boundingBox(); assert.ok(modalBox.x>=0 && modalBox.x+modalBox.width<=390);
 await page.screenshot({path:'qa/final-mobile-photo-modal.png'});
 await page.keyboard.press('Escape');
 await page.setViewportSize({width:1440,height:1000});
 await page.locator('#about').scrollIntoViewIfNeeded();await page.locator('#about').screenshot({path:'qa/final-about.png'});
 console.log('Swipe, no accidental enlargement, photo modal and original portrait verified.');
}finally{await browser.close()}
