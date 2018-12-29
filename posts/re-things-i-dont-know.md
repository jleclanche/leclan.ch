---
layout: page
permalink: /posts/re-things-i-dont-know/
---

# Re: "Things I Don't Know as of 2018"

*[Original article](https://overreacted.io/things-i-dont-know-as-of-2018/) (Dan Abramov's excellent Overreacted blog)*

In this post I'll try to give an entry point to as many of the subjects listed in that post as I can. I skipped a couple that were either too broad, or where I don't feel comfortable advising.

These entry points are provided "as is", with no guarantees of effectiveness. YMMV.


## Unix commands and Bash

Don't be afraid of "looking up everything else" than ls and cd. You can be doing Bash regularly for 10 years and still regularly Google how to test whether a string is actually empty.
If you want to really learn it, I recommend the following approach:

1. Switch to [ZSH](https://www.zsh.org/) as your primary shell. It's very close to Bash, with some sane additions. The skills are transferrable.
2. Set up a good .zshrc file. [Here](https://github.com/jleclanche/dotfiles) is mine, I regularly distribute it as a starting point.
3. Stop using the GUI to do things. Force yourself to use the CLI whenever possible, even if it's less efficient.

The ZSH ecosystem is pretty active. When you're ready, look up zsh plugins. There's a plugin manager and everything.


## Containers

Docker is not a VM, it's a "container". The difference matters, see [this excellent Stack Overflow answer](https://stackoverflow.com/a/16048358).

> "Are Docker and Kubernetes related?"

Kubernetes uses Docker, the same way Uber uses cars.

Kubernetes organizes a bunch of docker containers and orchestrates them together. When is that useful? Well, let's say you have your app running in a Docker container. You deploy your container somewhere running your app and you're happy. It gets popular. You want to spin up some new instances, and you start getting expectations about your SLA. Now suddenly your deploys aren't as easy as before and there's a bunch of new problems to worry about.
Kubernetes helps with all that. It's overkill unless you're really at scale, but there are other more approachable solutions that can be useful at smaller scale (such as [AWS ECS](https://aws.amazon.com/ecs/)).

The Docker ecosystem is extremely broad, covering not just containers but also testing, deployment, production, etc. So it's important to know when it can solve a problem you're having, in order to start playing with it. Docker's key feature is reproducibility:

- Do you need to distribute something (an app, a build, ...) that is part of a complex environment and have it work the same everywhere? You probably want Docker.
- Do you want to deploy a self-contained service in production? Using Docker is probably a good idea.
- Does your app's development environment depend on a bunch of running services, such as redis, postgres, etc? [Docker Compose](https://docs.docker.com/compose/) might be a good fit!


## Serverless

30 second serverless primer:

Your app runs in a container, somewhere in the cloud provider's stack. Requests to your app go through an API layer of some kind. Said API will ensure there is an instance of your app available to respond to the request, and respond with your app's response.
The cloud provider is responsible for automatically scaling up/down the concurrency of your app's containers, and orchestrating it in general.

Why this matters:
 - It's way easier than handrolling it (see the above section on containers).
 - It makes scaling some services *way way up* very accessible.
 - It allows some interesting solutions to old use cases (eg. offloading a cpu-intensive part of your web app to a separate, serverless service)

How this changes programming: It depends on how much use you decide to make out of it. Serverless is not the magic wand many people make it to be, so YAG(N)NI. But it heavily encourages a more functional approach to app development, as well as splitting up parts of your app depending on their bottleneck (cpu, network, …).

Your Hello World task: Build a PNG to JPG API endpoint!

Hello World bonus points for AWS: Upload the JPG to S3 and add an S3 event trigger to generate a thumbnail, in a separate Lambda function!

Definitely use [Serverless Framework](https://github.com/serverless/serverless) for deployments, it's wonderful!


## Python

[`apt-get install diveintopython3`](https://packages.debian.org/jessie/diveintopython3) ([Or paperback on Amazon](https://www.amazon.com/Dive-into-Python-Mark-Pilgrim/dp/1430224150))

> "There are many things there like import behavior that are completely opaque to me."

Import behaviour in Python has the merit to be very consistent, but it is confusing, especially if you come from the JS/webpack world where you can import any file on the filesystem.
On top of this, [import behaviour was altered in Python 2.5+](https://www.python.org/dev/peps/pep-0328/) and eventually made default.

- Python files can only import other Python modules or files.
- Valid names for such imports are `[a-zA-Z_][a-zA-Z0-9_]*`.
- Python will resolve the import starting from the current folder, then using `PYTHONPATH`, which works similarly to the system's `PATH` and by default includes the stdlib's directory, its site-packages directory (where globally installed libraries go).
- The first time you import a module during your app's lifecycle, all the code in it will load and run. Subsequent imports load from the cache and don't re-run the code (unless you explicitly use the `reload()` function).

An import can look like this: `import some_module`. This will make the first `submodule.py` (or `submodule.pyc`, or `submodule/__init__.py(c)`) it resolves available as a namespace, in the variable `some_module`.

An import can also look like this: `from some_module import foo`, which will only extract `some_module.foo` and make it available in the variable `foo`. Optionally, you can give an "as" directive to make it available under a different name (`from some_module import foo as bar`).

An import can traverse nested modules. Those are subdirectories, but they **have to have a `__init__.py`**:

```
awesomeproject
├── __init__.py
└── topmodule
    ├── __init__.py
    ├── not_a_module
    │   └── no_init.py
    └── submodule
        └── __init__.py

# Valid:
from awesomeproject.topmodule import submodule

# Also valid, but verbose:
import awesomeproject.topmodule.submodule

# These will not find anything and result in an ImportError:
from awesomeproject.topmodule import not_a_module
from awesomeproject.topmodule.not_a_module import no_init
```

## SCSS / Sass

There's not a lot to SCSS, you can just pick it up and start using it!

I honestly do not write css without a .scss extension, much like I never write JS unless it's Typescript. (Exceptions for small apps without a deployment pipeline)
SCSS can take in regular CSS, so there's no migration there. Even if you just use variables or very basic nesting, it makes the code a lot cleaner.

[Here is a fun example](https://twitter.com/Adys/status/1078029163267870733) of some SCSS code which would be much harder to read in plain CSS.


## CORS

Ok, let's just go through it right now. There's quite a bit to CORS, but 90% of it is a 3 minute thing.

Modern browsers will "preflight" certain requests (POST with most content-types and any PUT/DELETE) when they are sent to other domains than the current one. Why? Security reasons, we don't need to get into it here.

"Preflighting" means preceding the requests with an `HTTP OPTIONS` request to the server, including some `Access-Control-Request.-*` headers describing the request. The server should reply with its "CORS rules" and if they do not match the request being preflighted, that request *will not happen* and whatever made it will see a 403.

The server's replies are `Access-Control-Allow-Methods` (which methods are allowed), `Access-Control-Allow-Credentials` (whether credentials are allowed), `Access-Control-Allow-Origin` (which domains are allowed, can be `*`) and `Access-Control-Allow-Headers` (which headers are supported).

That's all there really is to it! CORS is a framework that lets your server whitelist access patterns to your API.


## Deployment and Devops

Again this is a bit broad, so I can't go into it very much, but I wanted to point towards [Terraform](https://www.terraform.io/) when it comes to infrastructure management. I'm very lucky to have learned it during my time at [HearthSim](https://hearthsim.net/) and I now find it an invaluable tool to not only describe and retain architecture in source control, but link up multiple different services with interlinked dependencies.

For example, you can have a Cloudflare DNS record always be the value of your load balancer's dns address. And you can have the DB_PORT environment variable of your docker container always be the port of your RDS instance.
This type of DRY when it comes to deployment is invaluable to avoid losing track of what a value actually is, even if you're not the one generating said value.


## TypeScript

Best for last?

In all honesty, if you're a JS dev, rename your .js files to .ts, hook up a compiler, and start. When you're ready, enable --strict.

TypeScript, being fully backwards-compatible with JS, will not require you to rework your project.
Do make sure you have an IDE that supports Typescript and shows you the type of every variable you hover. Add some basic types in your function declarations. Start gradually, don't feel pressured.

I mean this: **If you're a JavaScript developer, switching to TypeScript should be your #1 priority.** It's easy, it's gradual, and it *will* save you a TON of time and headaches in the long run.

I am hesitant to explain why; many others have. The reasons are many and the barrier of entry is extremely low, so I feel that this is a favour you should do to yourself, and it shouldn't need much convincing.

I personally have started to seriously doubt the reliability of pure-javascript, non-typescript projects (or projects that don't at least include type definitions) and am more hesitant to include them as dependencies. I have yet to hear a single reason in favour of using JS instead of TS for absolutely *anything* that already goes through a JS compiler.
