# More From Site Userscript

This userscript adds a "More from *site name*" button under each link in Google search results. When clicked, the button redirects the user to a site-specific Google search. The script also includes a blacklist of sites for which the button will not be displayed.

## Installation

1. Install a userscript manager such as Tampermonkey or Greasemonkey.
2. Copy the code from the userscript.
3. Create a new script in the userscript manager.
4. Paste the code into the editor and save the script.

The script should now be active and will run on Google search pages.

## Usage

When you perform a Google search, you'll see a "More from *site name*" button under each link in the search results. Clicking this button will redirect you to a site-specific Google search.

## Customization

You can customize the appearance of the "More from *site name*" button by editing the CSS in the `GM_addStyle` function.

You can also add or remove sites from the blacklist by editing the `blacklistedSites` array.

---
### Issues/Todos 

- Presents links to nonexistent host sites. For example on iOS, there is a link for “Maps” results that redirects to nothing.
- After redirect, the first webpage retains the ‘more from’ button - which, of course, presents the same page.

### Notes

- Use the iOS specific script for iOS/Safari.
- If someone smarter than I would like to merge them feel completely free to do so - would be much appreciated.
- Also, unimportantly, I used GPT to write this readme. As well as the inline script notes, formatting, and debugging.