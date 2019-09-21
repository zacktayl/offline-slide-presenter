let currentSlide = 1;
let triggerMouseEvent = (node, eventType) => {
  var clickEvent = document.createEvent('MouseEvents');
  clickEvent.initEvent(eventType, true, true);
  node.dispatchEvent(clickEvent);
}


setInterval(() => {
  let nextButton = document.querySelector('iframe.punch-present-iframe').contentWindow.document.body.querySelector('.punch-viewer-nav-v2 .punch-viewer-nav-rounded-container div:nth-child(4)');
  if (!nextButton) return;
  let xhr = new XMLHttpRequest();

  xhr.onload = () => {
    console.log('xhr status:', xhr.status, 'xhr response', xhr.response);
    let responseNumber = parseInt(xhr.response);
    if (responseNumber > currentSlide) {
      triggerMouseEvent(nextButton, "mouseover");
      triggerMouseEvent(nextButton, "mousedown");
      triggerMouseEvent(nextButton, "mouseup");
      triggerMouseEvent(nextButton, "click");
      currentSlide = responseNumber;
    } else if (responseNumber < currentSlide) {
      let prevButton = document.querySelector('iframe.punch-present-iframe').contentWindow.document.body.querySelector('.punch-viewer-nav-v2 .punch-viewer-nav-rounded-container div:nth-child(1)');
      console.log('prevButton:', prevButton);
      triggerMouseEvent(prevButton, "mouseover");
      triggerMouseEvent(prevButton, "mousedown");
      triggerMouseEvent(prevButton, "mouseup");
      triggerMouseEvent(prevButton, "click");
    }
    currentSlide = responseNumber;
  }

  xhr.open('GET', 'http://localhost:3000/pageToTurnTo');

  xhr.send();
}, 1000)
