/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

function testStyles(rule, callback) {
  const mod = 'modernizr';
  let docOverflow;
  const div = document.createElement('div');
  const { body } = document;

  const style = ['&#173;', '<style id="s', mod, '">', rule, '</style>'].join('');
  div.id = mod;

  (!body.fake ? div : body).innerHTML += style;
  body.appendChild(div);
  if (body.fake) {
    // avoid crashing IE8, if background image is used
    body.style.background = '';
    // Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
    body.style.overflow = 'hidden';
    docOverflow = docElement.style.overflow;
    docElement.style.overflow = 'hidden';
    docElement.appendChild(body);
  }

  const ret = callback(div, rule);
  // If this is done after page load we don't want to remove the body so check if body exists
  if (body.fake) {
    body.parentNode.removeChild(body);
    docElement.style.overflow = docOverflow;
    // Trigger layout so kinetic scrolling isn't disabled in iOS6+
    docElement.offsetHeight;
  } else {
    div.parentNode.removeChild(div);
  }

  return !!ret;
}

export default function detectTouchSupport() {
  let supports;
  if (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) {
    supports = true;
  } else {
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    const query = ['@media (', prefixes.join('touch-enabled),('), 'heartz', ')', '{#modernizr{top:9px;position:absolute}}'].join('');
    testStyles(query, (node) => {
      supports = node.offsetTop === 9;
    });
  }
  return supports;
}
