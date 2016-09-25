$(document).ready(function() {
  
  $(window).scroll(function() {
    
    if ($(document.body).hasClass('body-review')) {
      
      var reviewTitlePosY = $('.stage__text__title').offset().top;
      var outine = $('.outine');
      var articleTitle = $('.nav-title');
      
      if ($(window).scrollTop() > reviewTitlePosY){
        outine.addClass('outine-onscroll');
        articleTitle.addClass('title-hide');
        }
      else {
        outine.removeClass('outine-onscroll');
        articleTitle.removeClass('title-hide');
      }  
    }
    
    else if ($(document.body).hasClass('body-index')) {
      var postHeroTitlePosY = $('.stage').offset().top;
      var brandLogo = $('.row.nav');
      var brandBackground = $('.stage-nav');
      
      
      if ($(window).scrollTop() > postHeroTitlePosY){
        brandBackground.removeClass('transparent');
        brandLogo.removeClass('absolute');
      }
      else {
        brandBackground.addClass('transparent');
        brandLogo.addClass('absolute')
      }
    }
  
  });
});


  


