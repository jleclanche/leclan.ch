---
layout: page
permalink: /password-managers/
---
# Password Managers

If you're just starting, here's some guidance on setting up a password manager.

First of all: Don't be afraid of using one. It's not just more secure, it's super convenient. Never again will you ask yourself: Did I make an account for this website/service? What email did I use? Never again will you have to remember a password. Using a password manager is a quality of life improvement.

[KeepassXC](https://keepassxc.org) is what I recommend to people at this point. It's free and you own your data (your passwords). They live wherever you want them to live. There are plenty of online services that are supposedly more convenient but I have to say I trust them less -- YMMV (1Password is the best I'm aware of).

If you do use KeepassXC, you get the added benefit of being able to store 2FA settings in it as well (if you store them in the same database as your passwords, be aware that you lose the security benefit of a second factor, however it is still more secure than not having 2FA enabled due to the One-time password component).

Put every account you ever made and ever make into keepass. Enable 2fa wherever you don't have it enabled. Add login URLs and notes. Generate your passwords from keepass itself; the password generator is really powerful and lets you very easily deal with site-specific shitty password limitations. I'm telling you this because, seriously, it's incredibly convenient to have this stuff as long as you're rigorous about maintaining it.

Oh, also, keepass has the full history of all your passwords. Need to look up an old password? Go into details and look at "History". You can also attach files to items (items don't have to be accounts at all, you can use KeepassXC as a simple encrypted storage db).

Mobile support: [Keepass2Android](https://play.google.com/store/apps/details?id=keepass2android.keepass2android&hl=en) ([Github](https://github.com/PhilippC/keepass2android)). Best android client, with google drive support. iOS: [MiniKeePass](https://github.com/MiniKeePass/MiniKeePass) was recommended by HNers, but I am not able to try it out myself.

IMPORTANT: **BE STUPIDLY PARANOID AND RIGOROUSLY CAREFUL ABOUT YOUR MASTER PASSWORD**. That thing, together with your keepass database, unlocks all your accounts ever. Use a really long passphrase that you will never have to write down (if you do decide to write it down because you don't trust yourself, store it in a safety deposit box, don't put it in a bloody drawer). Make sure the device you unlock the database on is malware-free.

PS: Wondering what's up with Keepass vs. KeepassX vs. KeepassXC? Keepass is the original app, written in .NET but with poor multi-platform support. KeepassX is a rewrite in Qt and is a fantastic password manager, but has gone unmaintained recently. The open source community picked up the slack in the KeepassXC fork (after continuing countless attempts to upstream the patches) and has implemented lots of powerful features. I've switched to it and at this point I strongly believe it's the better client.

