import * as bootstrap from 'bootstrap'

document.addEventListener('DOMContentLoaded', () => {
  const popoverButton = document.getElementById('popoverButton')

  if (popoverButton) {
    new bootstrap.Popover(popoverButton)
  }
})

window.bootstrap = bootstrap
