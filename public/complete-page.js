document.getElementById('copyButton').addEventListener('click', function() {
  const textToCopy = document.getElementById('targetText').value;
  navigator.clipboard.writeText(textToCopy).then(function() {
    const copyModal = new bootstrap.Modal(document.getElementById('copyModal'));
    copyModal.show();
  }, function() {
    alert('コピーに失敗しました');
  });
});

document.getElementById('postButton').addEventListener('click', function() {
  const textToPost = document.getElementById('targetText').value;
  const xUrl = "https://x.com/intent/tweet?text=" + encodeURIComponent(textToPost);
  window.open(xUrl, '_blank');
});