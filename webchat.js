/* Techtronix Webchat
 *
 * Embed helper script
 */

'use strict';

// Configuration
const HOST = 'irc.techtronix.net';
const PORT = 6697;
const SECURE = true;

/** Build IRC URL
 * @param {string} host The IRC host
 * @param {number} port The IRC port
 * @param {boolean} secure Is the IRC port set to accept TLS connections?
 * @return {string} The constructed URL
 */
function buildIrcUrl(host, port, secure) {
    // If port is 6667, but secure is enabled, send a warning to console
    if ((port === 6667) && secure) {
        console.warn('Specified port is 6667, but secure is set to true. Did you mean for secure to be false?');
    }

    // Continue on with the URL building
    let urlString = '';
    if (secure) {
        urlString += 'ircs://';
    } else {
        urlString += 'irc://';
    }
    urlString += host;
    urlString += ':';
    urlString += port;
    return encodeURI(urlString);
}

/** Build KiwiIRC link
 *
 * Useful for embedding into an iframe
 * @param {string} host The IRC host
 * @param {number} port The IRC port
 * @param {boolean} secure Is the IRC port set to accept TLS connections?
 * @return {string} An encoded URL string
 *
 * Example:
 * https://kiwiirc.com/nextclient/#ircs://irc.techtronix.net:6697/?nick=Guest?&channel=#test
 */
function buildKiwiLink(host, port, secure) {
    // Variables
    const baseUrl = 'https://kiwiirc.com/nextclient/#';

    // Get page URL information
    let url = new URL(window.location);

    // Construct the iframe src URL
    let urlString = baseUrl;
    urlString += buildIrcUrl(host, port, secure);
    urlString += '/';
    // If a hash e.g. #lounge is specified, include it
    if (url.hash !== '') {
        urlString += url.hash;
    }
    // If parameters were provided, include it
    if (url.search !== '') {
        urlString += url.search;
    } else {
        // Only include this if there was no hash
        if (url.hash === '') {
            urlString += '?nick=Guest?&channel=#lounge';
        }
    }
    return encodeURI(urlString);
}

/** Change embed iframe dimensions on window resize
 */
function changeChatFrameDimensions() {
    let embed = document.getElementById('chat-iframe');
    embed.setAttribute('height', window.innerHeight);
    embed.setAttribute('width', window.innerWidth);
}

// Events to attach to
window.addEventListener('load', () => {
    let embed = document.createElement('iframe');
    embed.setAttribute('id', 'chat-iframe');
    embed.setAttribute('frameborder', 0);
    let kiwiUrl = buildKiwiLink(HOST, PORT, SECURE);
    embed.setAttribute('src', kiwiUrl);
    document.getElementById('chat').appendChild(embed);
    console.info('KiwiIRC embed created:', kiwiUrl);
});

// window.addEventListener('load', () => {
//     let url = new URL(window.location);
//     let hash = url.hash;
//     if (hash === '') {
//         hash = '#lounge'
//     }
//     // Not using template strings for now due to compat
//     // document.title = `Techtronix Webchat: ${hash}`;
//     document.title = 'Techtronix Webchat: ' + hash;
// });
