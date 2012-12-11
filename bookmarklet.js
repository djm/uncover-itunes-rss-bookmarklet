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
            // We blank the page and insert there as I don't want to update this script
            // whenever Apple feels like re-designing the podcast page markup.
            // Yes, we're abusing br tags for spacing. Humblest apologies.
            document.body.innerHTML = '<br/><h1>Podcast RSS URL: <a href="'+feed_url+'">'+feed_url+'</a></h1>';
        } else {
            alert('Failed to retrieve feed from the iTunes API');
        }
    } else {
        alert('Failed to parse the Apple\'s Artist ID.');
    }
})();