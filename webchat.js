/* Techtronix Webchat
 *
 * Embed helper script
 */

'use strict';

/** Build KiwiIRC link
 *
 * Useful for embedding into an iframe
 * @return {string} A URL string
 *
 * Example:
 * https://kiwiirc.com/nextclient/irc.techtronix.net:+6697/#test
 */
function buildKiwiLink() {
    // Variables
    const baseUrl = 'https://kiwiirc.com/nextclient/';
    const ircHost = 'irc.techtronix.net';
    const ircPort = 6697;
    const useTls = true;

    // Get page URL information
    let url = new URL(window.location);

    // Construct the iframe src URL
    let str = baseUrl;
    str += ircHost;
    if (useTls) {
        str += ':+';
    } else {
        str += ':';
    }
    str += ircPort;
    str += '/';
    if (url.hash === '') {
        str += '#lounge';
    } else {
        str += url.hash;
    }
    return str;

    // For now, we are not returning the template version of this for compat
    // return `${baseUrl}${ircHost}${useTls ? ':+' : ':'}${ircPort}/${url.hash === '' ? '#lounge' : url.hash}`;
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
    embed.setAttribute('src', buildKiwiLink());
    document.getElementById('chat').appendChild(embed);
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
