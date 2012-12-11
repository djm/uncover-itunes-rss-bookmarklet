(function() {
    /* Bookmarklet that displays the actual podcast feed
     * URL when ran on an iTunes store page for a podcast.
     *
     * Simply grabs the Artist ID from the URL and does
     * an iTunes Store API lookup to get the hidden (original)
     * podcast feed URL (whatever format that may be in).
     *
     * @author: Darian Moody <mail@djm.org.uk>
     * @date: Working as of Sun.22.Apr.2012
     */

    var artist_id,
        feed_url,
        ITUNES_API = '//itunes.apple.com/lookup?id=';

    function retrieveArtistID(url) {
        // Extracts the artist ID from a given URL.
        var re = /id=?([\d]+)/i;
        var match = url.match(re)
        if (match) {
            return match[1];
        } else {
            return false;
        }
    }

    function retrieveFeedFromAPI(artist_id) {
        // Call's the iTunes API with the parsed
        // artist_id and parses the returned JSON
        // to extract the original podcast feed URL.
        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", ITUNES_API+artist_id, false);
        xhReq.send(null);
        var response = xhReq.responseText;
        parsed = JSON.parse(response);
        if (parsed && parsed.resultCount > 0) {
            return parsed.results[0].feedUrl;
        } else {
            return false;
        }
    }

    // Get the entire path string inc query as ID may
    // be in the path or query parts of the URL.
    artist_id = retrieveArtistID(window.location.toString());
    if (artist_id) {
        feed_url = retrieveFeedFromAPI(artist_id);
        if (feed_url) {
            // I was thinking about inserting the element into
            // the page; but this works just as well and will
            // carry on working if the design changes.
            var display = document.createElement("h1");
            display.innerHTML = feed_url;
            document.body.innerHTML = '';
            document.body.appendChild(display);
        } else {
            alert('Failed to retrieve feed from the iTunes API');
        }
    } else {
        alert('Failed to parse the Apple\'s Artist ID.');
    }
})();