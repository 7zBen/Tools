# Tools

A public GitHub Pages site for small browser tools. Each tool runs entirely in the visitor’s browser. Link lists and other tool data are stored in `localStorage` on that device and are not sent to GitHub or any other server.

Live URLs after Pages is enabled:

- Homepage: `https://YOUR_USER.github.io/Tools/`
- Link Queuer: `https://YOUR_USER.github.io/Tools/tools/link-queuer/`

Replace `YOUR_USER` with your GitHub username.

## Set up GitHub Pages

You already have a repo named `Tools`. Put these files in the **root** of that repo (not in a subfolder).

1. Copy everything in this folder into the repo:
   - `index.html` — homepage
   - `site.json` — site title and optional GitHub owner/repo override
   - `.nojekyll` — tells Pages to serve files as-is
   - `404.html`
   - `tools/link-queuer/` — the first tool
   - `tools/manifest.json` — fallback list if the GitHub API is unavailable
2. Commit and push to `main` (or `master`).
3. On GitHub open **Settings → Pages**.
4. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main` (or `master`), folder: `/ (root)`
5. Save and wait a minute. The Pages URL appears at the top of that settings page.

If the homepage owner/repo detection is wrong (custom domain), edit `site.json`:

```json
{
  "title": "Tools",
  "description": "Small browser tools. Your data stays on your device.",
  "github": {
    "owner": "YOUR_USER",
    "repo": "Tools"
  }
}
```

## How the homepage finds tools

The homepage looks in `/tools`.

1. It asks the public GitHub API for the contents of the `tools` folder.
2. Each **subfolder** that contains `index.html` becomes a card.
3. Folder name `Link_Queue` or `link-queuer` is shown as **Link Queue** / **Link Queuer**.
4. If the folder has `tool.json`, that name and description are used instead.
5. If the API is rate-limited or you are opening the files locally, it falls back to `tools/manifest.json`.

No rebuild step. Add a folder, push, refresh the homepage.

## Add another tool

```
tools/
  my_new_tool/
    index.html
    tool.json
```

`tool.json`:

```json
{
  "name": "My New Tool",
  "description": "One sentence on what it does."
}
```

Also add it to `tools/manifest.json` so the homepage still works without the API:

```json
{
  "tools": [
    {
      "slug": "link-queuer",
      "name": "Link Queuer",
      "description": "Paste a pile of links, open one, and it drops off the list. Nothing is uploaded."
    },
    {
      "slug": "my_new_tool",
      "name": "My New Tool",
      "description": "One sentence on what it does."
    }
  ]
}
```

`slug` must match the folder name.

## Link Queuer

Opens a link in a new tab and removes it from the queue so you can work through a long list without losing track.

- Add links by paste, file, or drag-and-drop. Only `http` and `https` URLs are accepted.
- **Open** — new tab, then drop it from the list.
- **Keep** — open but leave it in the list.
- **Skip** — remove without opening.
- Queue is saved in this browser only. Use **Export remaining .txt** if you want a file copy.
- Undo with the button or ⌘Z / Ctrl+Z.

Because this is a static page, it cannot silently rewrite a `.txt` file on someone’s computer. Export is the way to get an updated list out.

## Privacy

- No accounts, analytics, or third-party scripts.
- Link Queuer never POSTs or beacons your URLs.
- The homepage only calls `api.github.com` to list tool folders in this public repo. That request does not include anyone’s link queue.
