/* eslint-disable  no-var, vars-on-top, no-undef */

var SITE_SWITCH = {
  'leetcode.com': {
    label: 'Cn↗',
    title: 'Switch to Chinese site',
    host: 'leetcode.cn'
  },
  'leetcode.cn': {
    label: 'En↗',
    title: 'Switch to English site',
    host: 'leetcode.com'
  },
}

function getHtmlUi(currentHost, currentUrl) {
  const next = SITE_SWITCH[currentHost]
  const nextUrl = currentUrl.replace(currentHost, next.host)
  return `
  <style type="text/css">
    .language-switcher {
      display: flex; 
      align-items: center; 
      padding: .2rem .2rem;
    }
    .link {
      white-space: nowrap; 
      border: 1px solid lightblue; 
      border-radius: 1rem;
      padding: .1rem .5rem;
      cursor: pointer;
    }
  </style>
  <a class="link" title="${next.title}" href="${nextUrl}"
      rel="noopener noreferrer" target="_blank"
  >${next.label} 
  </a>
`
}

setTimeout(() => {
  var container = document.querySelector('[class*="NavWrapper"]')
    || document.querySelector('nav')
    || document.querySelector('body')

  if (!container) {
    console.error('No container `NavWrapper` or `nav` found!')
    return
  }
  var fragment = document.createElement('div')
  fragment.classList.add('language-switcher')
  fragment.innerHTML = getHtmlUi(location.host, location.href)
  container.appendChild(fragment)
}, 4000)
