/* Techtronix Webchat
 *
 * Embed helper script
 */

'use strict';

/** Build iframe src for embedding
 * @return A URL string
 *
 * Example:
 * https://kiwiirc.com/nextclient/irc.techtronix.net:+6697/#test
 */
function build_embed_src() {
    // Variables
    const base_url = 'https://kiwiirc.com/nextclient/';
    const server_url = 'irc.techtronix.net';
    const server_port = 6697;
    const server_use_tls = true;

    // Get page URL information
    let url = new URL(window.location);

    // Construct the iframe src URL
    let src = base_url;
    src += server_url
    if (server_use_tls) {
        src += ':+' + server_port;
    } else {
        src += ':' + server_port;
    }
    src += '/' + url.hash;

    return src;
}

/** Change embed iframe dimensions on window resize
 */
function change_embed_dimensions() {
    let embed = document.getElementById('chat-iframe');
    embed.setAttribute('height', window.innerHeight);
    embed.setAttribute('width', window.innerWidth);
}
