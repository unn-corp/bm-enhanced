## About This Repository
This project is a real-time Chrome extension and tampermonkey userscript for Battlemetrics.com. It was created as a passion project to help server admins to better moderate their communities and read the logs of active servers in games with dozens of online users.

It's free and open source, please consider leaving a coffee https://ko-fi.com/synarion if you would like. 

## Requirements & Install
Option 1: Chrome Extension (Chrome Only)
- Chrome based browser (v130+ Tested) with **DEV MODE** enable (required).
Option 2: Tampermonkey Extension (Chrome & Firefox/Zen)
- Tampermonkey Browser Extension: [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en&pli=1) v120+ OR [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) 78+ (Tested on stable). 

Which is better? For chrome, the extension has reduced permission scope compared to Tampermonkey which has access to all sites by default. I haven't benchmarked them, but I suspect the extension is better than Tampermonkey.

> [!WARNING]
> Chromium browsers (Chrome, Edge, Brave etc..) all require "DEV MODE" enabled in the extension settings area (see "Getting Started" guide below).

## Features Of This Project
------- For Users -------
* Highlight words within the log, based on phrases to help easily moderate.
* Access time in seconds (when hovering on the time) to know the exact second things occur. 
* Highlights admins with 3 different possible colors, knowing if admin is online easily.
* Faster ban viewing, automatically go to your ORG bans instead of "unsorted". 
* Copy/Paste button when viewing player profiles, copy all data at once.
* [CommunityBanList](https://communitybanlist.com/) CBL auto lookup for SteamIDs.
* Fixes "RCON disabled warning" so it doesn't overflow over other servers when many servers are collapsed.
* Organized flags are better, for ORGs with many flags. Less scrolling!
* Grays out unimportant events like joins/leaves.
* Highlights the default note icon for better visablity when viewing players. 

---- For Community Owners/Devs -------
* Real-time updating, using github repo as update source for most ORG settings/data.
* Extension/script version checking, alert users across your ORG when updates are required.
* Easily modifiable.
* Divide up permissions, point adminList.json and termList.sjon to a different Github Repo and keep the script under lock and key.
* Wiki to help users install and set up the script or extension for you to share.
* Tested in Squad/Arma Reforger communities, support likely in other games (unconfirmed)
* Website (github pages) adminList.json builder [Example](https://synarious.github.io/bm-enhanced/)

## Getting Started 
### See [Getting Started Wiki](https://github.com/Synarious/bm-enhanced/wiki ) on how to install & more.

## Contributions & Notes For Devs
- [LiQ Gaming](https://liqgaming.com/#/) - Avengerian (time seconds), Got2bHockey (Github Actions)
- /GmG\ - Eddie (button fixes and CBL bits)
- This project's scope is limited to reading/modifying the **locally** delivered web content and locally injecting CSS and web improvements without touching the BM API (as such this code could run offline). Code suggestions that automates or performs interactive API requests like bans, kicks and queries using your Battlemetrics tokens will not be merged into this project as that approaches being a self-bot which could result in your BM account being suspended. Add such code at your own risk.
- Auto updating isn't functional due to changes in Chrome Manifest V3, there are some possible workarounds and sadly have been proven to be challenging to get working. Instead of auto updating the entire script, it pulls from JSON files which is tad safer and allows for updating in real time without forcing clients/machines to update. In general the extension/scripts should only need to be updated during feature/breaking updates. 

