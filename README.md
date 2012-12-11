Reveal the actual RSS feed behind an iTunes podcast page
========================================================

A Javascript bookmarklet to reveal the actual RSS/feed URL of an iTunes podcast, simply by visiting the relevant iTunes page and clicking the bookmarklet.

Install
-------

1. Simply drag the following link to your Browser's bookmark toolbar/menu to install.

[itunes-to-rss](javascript:(function(){var%20newScript=document.createElement('script');newScript.src='https://raw.github.com/djm/uncover-itunes-rss-bookmarklet/master/bookmarklet.js;document.body.appendChild(newScript);})();)

2. Then visit an appropriate iTunes podcast page, e.g: [The Critical Records podcast](https://itunes.apple.com/gb/podcast/critical-podcast/id293017397)

3. Click the bookmarklet while on the page to reveal the true RSS podcast URL/content feed.

4. Praise the FSM that you no longer have to load up iTunes. 



Todo
----

* Fetch the actual RSS, parse it and display actual links to the podcast content (mp3/m4as etc).
* Test cross browser. Sorry, this is not a priority right now; working in Chrome 23 + Firefox on Linux.
