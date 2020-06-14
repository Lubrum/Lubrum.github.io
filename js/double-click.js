// sourcecode : https://activebridge.org/blog/image-zoom-on-pure-css //
$("a").on("click", function(event) {
  if ($(this).hasClass('clicked')) { 
      event.preventDefault();
      return false;
  } else {
      $(this).addClass('clicked').trigger('click');
  }
});