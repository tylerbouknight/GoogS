// ==UserScript==
// @name         More From Site
// @author       Tyler Bouknight
// @version      1.0
// @description  Add a "More from *site name*" button under each link in search results that redirects to a site-specific Google search.
// @match        https://www.google.com/*
// @grant        GM_addStyle
// ==/UserScript==



(function() {
    'use strict';

    // Define the blacklisted site hostnames
    var blacklistedSites = ['search.app.goo.gl', 'another-site.com'];

    // CSS style to customize the appearance of the button
    GM_addStyle(`
        .more-from-site-button {
            display: inline-block;
            padding: 4px 10px;
            font-size: 10px;
            color: #2A57CE;
            opacity: .7;
            text-align: left;
            text-decoration: none;
            font-weight: 400;
            margin-top: -10px;
            margin-left: 6px;
        }
    `);
        // Find the search input field on the Google search page
        var searchForm = document.getElementById('searchform');
        if (searchForm) {
            var searchQuery = searchForm.value;

        // Create an object to store hostnames that have already been processed
        var processedHosts = {};

        // Create a MutationObserver to observe changes to the search results container
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    // Find all links in the added nodes
                    var links = mutation.target.querySelectorAll('a');

                    // Iterate through each link and add the "more from this site" button if the site is not blacklisted and doesn't contain "Google" in the hostname
                    links.forEach(function(link) {
                        var hostname = link.hostname.toLowerCase();
                        if (!processedHosts[hostname] && !isBlacklisted(hostname) && !isGoogleLink(hostname)) {
                            var button = createButton(hostname, searchQuery);
                            link.parentNode.insertBefore(button, link.nextSibling);
                            processedHosts[hostname] = true;
                        }
                    });
                }
            });
        });

        // Start observing the body element for changes
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Helper function to check if a site is blacklisted
        function isBlacklisted(hostname) {
            return blacklistedSites.includes(hostname);
        }

        // Helper function to check if a link contains "Google" in the hostname
        function isGoogleLink(hostname) {
            return hostname.includes('google');
        }

        // Helper function to create the "more from this site" button
        function createButton(site, query) {
            var button = document.createElement('a');
            var encodedSearchQuery = encodeURIComponent(query + ' site:' + site); // Append site-specific search to the initial search query
            button.href = 'https://www.google.com/search?q=' + encodedSearchQuery;

            // Remove any subdomains and top-level domains from the hostname
            var parts = site.split('.');
            if (parts.length > 2) {
                site = parts.slice(-2, -1).join('.');
            } else {
                site = parts.slice(0, 1).join('.');
            }

            // Format the hostname
            var formattedSite = site.charAt(0).toUpperCase() + site.slice(1);

            button.textContent = 'More from ' + formattedSite; // Change the text of the button to display the formatted hostname
            button.className = 'more-from-site-button';

            return button;
        }
    }
})();
