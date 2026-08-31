# Sitecraft — Google Sites HTML editor

A browser-based design studio for creating a polished one-page Google Sites design and exporting it as HTML.

## Run locally

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173). Use **Export HTML** to download the current design. The resulting file can be hosted and embedded in Google Sites, or used as the starting point for a custom HTML section.

## Publish it with GitHub Pages

This repository includes a GitHub Actions deployment workflow. Once the repository is pushed to GitHub:

1. Open the repository's **Settings** → **Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Push to the `work` branch (or run the **Deploy Sitecraft to GitHub Pages** workflow manually from the **Actions** tab).
4. GitHub will show the public Pages URL in the workflow summary and on the Pages settings screen. It is normally `https://<your-github-user>.github.io/<repository-name>/`.

The deployed site is the editor itself, so anyone with the link can open it and download a design as HTML.

## Included editing controls

- Select page sections from the layer list.
- Edit hero copy directly in the canvas.
- Change the hero background, height, and heading size.
- Switch between desktop, tablet, and mobile preview widths.
- Download the complete document as an HTML file.
