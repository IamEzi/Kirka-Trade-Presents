# Kirka Trade Presents

A customizable preset panel for **Kirka.io clients** that makes sending frequently used trade and chat messages quick and easy.

## What it does

**Kirka Trade Presents** adds a compact **PRESETS** panel to the Kirka game interface.

Each preset is a button with a saved chat message. Clicking the button sends that message through the Kirka chat input.

## Features

- 🎮 **Client support** — Designed to work with Kirka clients that support custom scripts.
- 💬 **Quick chat presets** — Send saved messages with one click.
- ✏️ **Edit presets** — Change the preset name, message, and color.
- ➕ **Add presets** — Create your own custom presets.
- ❌ **Delete presets** — Remove presets you no longer need.
- 🎨 **Custom colors** — Give each preset its own button color.
- 🖱️ **Movable panel** — Drag the panel header to reposition it.
- 💾 **Persistent settings** — Presets and panel position are saved locally.
- ⌨️ **Keyboard shortcut** — Press the ` key to open or close the panel.
- 🧩 **Kirka-style UI** — Compact styling designed to fit the game interface.

## Default Presets

The panel includes example presets:

| Preset | Message |
|---|---|
| BUMP | `/trade bump` |
| CANCEL | `/trade cancel` |
| MEOW | `meow` |
| INV | `/inv` |

These are only defaults. You can edit them or create your own.

## Controls

| Control | Action |
|---|---|
| Preset button | Sends the saved chat message |
| `E` | Edit the preset |
| `×` | Delete the preset |
| `ADD PRESET` | Create a new preset |
| ` | Open / close the preset panel |
| Panel header | Drag the panel |

## Adding to a Client

**Kirka Trade Presents** can be added to **Redline Client** and other Kirka clients that support custom JavaScript/userscripts.

Known compatible client types include:

- **Redline Client**
- **Ezi Client**
- **Dawn Client**
- Other compatible Kirka clients

For Redline Client, its official documentation lists **Userscripts** as a supported customization feature. citeturn0search0

The exact method for adding a script can differ between clients.

## How Sending Works

When a preset is clicked, the script:

1. Finds the visible Kirka chat input.
2. Places the preset message into the input.
3. Triggers the required input events.
4. Simulates the Enter key to send the message.

No external server or API is required for the preset system.

## Local Storage

The script uses browser `localStorage` to save:

- Preset names
- Preset messages
- Preset colors
- Panel position

Your custom presets and panel position can remain after refreshing Kirka.

## Compatibility

Designed for **Kirka.io** clients with a compatible custom-script environment.

The script is intended to work across clients such as **Redline Client, Ezi Client, and Dawn Client**, provided their script environment exposes the normal Kirka page DOM.

## Disclaimer

**Kirka Trade Presents** is a community-made script and is not an official Kirka.io product.
