/* eslint-disable  no-var, vars-on-top, no-undef */
var store = Storages.initNamespaceStorage('leetcode_todo').localStorage

var SITE_SWITCH = {
  'leetcode.com': { label: 'Cn', host: 'leetcode-cn.com' },
  'leetcode-cn.com': { label: 'En', host: 'leetcode.com' },
}

var htmlTxt = `
<div class="leetcode-todo-wrapper">
    <div class="toolbar">
      <button class="pure-button btn-md switch-lang" title="Switch language">Switch language</button>
      <button class="pure-button btn-md copy-url" title="Copy current URL">Copy</button>
      <button class="pure-button btn-md save-question" title="Collect this question to store">Collect</button>
      <button class="pure-button btn-md remove-question" title="Remove this question from store">Uncollect</button>
      <button class="pure-button btn-md get-all-questions" title="Copy all collected questions from store">Get collected</button>
    </div>
</div>
`

function openInNewTab(url) {
  window.open(url, '_blank').focus()
}

function copyToClipboard(txt) {
  var temp = $('<textarea>')
  temp.appendTo($('body'))
  temp.val(txt).select()
  document.execCommand('copy')
  temp.remove()
}

function getQtnId(url = window.location.href) {
  var arr = url.split('/')
  return arr.length >= 5 ? arr[4] : null
}

function getAllQtn() {
  return store.get('questions')
}

function saveQtn(id, data = {}) {
  if (id == null) return null

  return store.set(`questions.${id}`, { ...data, id })
}

function deleteQtn(id) {
  return store.remove(`questions.${id}`)
}

function isQtnCollected(id) {
  return store.isSet(`questions.${id}`)
}

function updateText({
  self, beforeTxt, afterTxt, ms = 5000,
}) {
  $(self).text(beforeTxt)
  setTimeout(() => $(self).text(afterTxt), ms)
}

setTimeout(() => {
  var container = $('[class*="navbar-left-container"], ul[class*="NavbarList"]')
  if (!container) {
    console.error('No container `TabViewHeader` found!')
    return
  }
  $(htmlTxt).appendTo(container)

  var url = new URL(window.location.href)
  var { label: nextLangLabel, host } = SITE_SWITCH[url.host]
  url.host = host
  var nextUrl = url.href

  $('.switch-lang')
    .text(nextLangLabel)
    .on('click', () => openInNewTab(nextUrl))

  $('.copy-url')
    .on('click', function () {
      copyToClipboard(window.location.href)
      updateText({ self: this, beforeTxt: 'Copied URL!', afterTxt: 'Copy' })
    })

  $('.save-question')
    .on('click', function () {
      var id = getQtnId()
      saveQtn(id, { id, url: window.location.href })
      updateText({ self: this, beforeTxt: 'Collected!', afterTxt: 'Collect' })
    })

  $('.remove-question')
    .on('click', function () {
      deleteQtn(getQtnId())
      updateText({ self: this, beforeTxt: 'Uncollected!', afterTxt: 'Uncollect' })
    })

  $('.get-all-questions')
    .on('click', function () {
      var questions = getAllQtn()
      console.log({ questions })
      copyToClipboard(JSON.stringify(questions, null, 2))
      updateText({ self: this, beforeTxt: 'Copied!', afterTxt: 'Get collected' })
    })
}, 2000)
