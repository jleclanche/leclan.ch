---
layout: page
permalink: /tabs/
---
# Tabs

This is now the third time in very little time that I have to deal with a pull
request containing "pep8 fixes" that incidentally change all my indents from
tabs into spaces.

First of all, you cannot expect me to review code changes when every file is
"200 additions, 200 deletions". This is common sense, but I feel I have to
write it so that I can just link it directly the next time.

Second of all, when you send PRs to a project, you respect their code style,
no matter how nutters it is.

I really appreciate what impartial tools, such as gofmt, bring to the table
but pep8 is not like that. pep8 just complains, and you fix it, making it
unreadable in the process (hello 79 char lines).

Unfortunately, I feel I have to increasingly justify myself for preferring
tabs. I do justify it, though. On deaf ears, most of the time; the subject of
indentation rules is becoming more taboo as the whining and yelling between
all "sidess" becomes less and less tolerable.  When was the last time you read
actual insight about indentation?

Here we go: **Tabs are inherently perfect for indentation.**
They embody the concept of indentation.

Their size adapts to anyone's readability needs, unlike spaces which force you
to accept the project's indentation levels (Google, your 2-space indentation
makes your code fucking unreadable. Had you used tabs and set their length to 2
characters locally, I would never have known.)
More perfectly in design, tabs can be replaced by spaces with sed; but such an
operation only goes one way. Replacing 4 spaces by tabs is dangerous, because
you'll end up with mixed indent the moment alignment comes into the mix.

Alignment... You'd think programmers would be able to visualize the conceptual
difference between indent and align. But no, whenever I say I indent with tabs,
people picture me aligning ascii art with them. Damn it...

I don't comment on code style because style is purely preferential, which is
also why I don't consider indentation "code style". Because I'm using tabs,
indentation is a hint. The style is whatever you tell your editor to make it
look like.

I'm bothered that spaces seem to be "winning". An itch I can't scratch.
All that because of uninformed decisions dating back decades. Mind you, I'll
never submit changes to your indent (unlike some...), but I do wish more
programmers would consider more concrete arguments than "I have it the way I
like it" for indent.
