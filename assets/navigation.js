

jQuery(document).ready(function($) {


$('a.on-hover').hover(function(){

$('.on-hover span').each(function( index ) {
  var originalText = $( this ).text();
  var newText = "";
  for( var i = 0; i < originalText.length; i++)
  {
      if (i % 2 === 0)
        newText += "<span>" + originalText.charAt(i) + "</span>";  
      else
        newText += originalText.charAt(i);
  }
  $( this ).html(newText);
});

}, function() {

   $('.on-hover span').each(function( index ) {
  var originalText = $( this ).text();
  var newText = "";
  for( var i = 0; i < originalText.length; i++)
  {
        newText += originalText.charAt(i);
  }
  $( this ).html(newText);
});
   
});

$('.on-hover1').hover(function(){

$('.on-hover1 span').each(function( index ) {
  var originalText = $( this ).text();
  var newText = "";
  for( var i = 0; i < originalText.length; i++)
  {
      if (i % 2 === 0)
        newText += "<span>" + originalText.charAt(i) + "</span>";  
      else
        newText += originalText.charAt(i);
  }
  $( this ).html(newText);
});

}, function() {

   $('.on-hover1 span').each(function( index ) {
  var originalText = $( this ).text();
  var newText = "";
  for( var i = 0; i < originalText.length; i++)
  {
        newText += originalText.charAt(i);
  }
  $( this ).html(newText);
});
   
});


$('.on-hover2').hover(function(){

$('.on-hover2 span').each(function( index ) {
  var originalText = $( this ).text();
  var newText = "";
  for( var i = 0; i < originalText.length; i++)
  {
      if (i % 2 === 0)
        newText += "<span>" + originalText.charAt(i) + "</span>";  
      else
        newText += originalText.charAt(i);
  }
  $( this ).html(newText);
});

}, function() {

   $('.on-hover2 span').each(function( index ) {
  var originalText = $( this ).text();
  var newText = "";
  for( var i = 0; i < originalText.length; i++)
  {
        newText += originalText.charAt(i);
  }
  $( this ).html(newText);
    });
});

$('.on-hover3').hover(function(){

$('.on-hover3 span').each(function( index ) {
  var originalText = $( this ).text();
  var newText = "";
  for( var i = 0; i < originalText.length; i++)
  {
      if (i % 2 === 0)
        newText += "<span>" + originalText.charAt(i) + "</span>";  
      else
        newText += originalText.charAt(i);
  }
  $( this ).html(newText);
});

}, function() {

   $('.on-hover3 span').each(function( index ) {
  var originalText = $( this ).text();
  var newText = "";
  for( var i = 0; i < originalText.length; i++)
  {
        newText += originalText.charAt(i);
  }
  $( this ).html(newText);
});
   
});





});
		