'use strict';

$(document).ready(function() {
  // go-to anchor
  $(".go-to").on('click',function(e){
  
    e.preventDefault();

    var anchor = $(this).attr("href");

    if ($(anchor).length) {
      var run = $(anchor).offset().top;

      if($('body').find(".article-container .nav").length > 0 && $(window).width() > 1024){
        $('body,html').stop().animate({scrollTop: run}, 1500);
      } else {
        let mobileLinks = $('.main-article .nav').height();
        $('body,html').stop().animate({scrollTop: run - mobileLinks + 1}, 1500);
      }


    } else {
      console.warn("ID don't search!")
    }

    // mobile - hide menu
    if (window.screen.width < 1024) {
      if ($('header .menu').hasClass('open-menu')) {
        $('header .menu').removeClass('open-menu')
      }
    }
  });

  // Slider
  var sliderPrevArrow = '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="26.493" height="12.723" viewBox="0 0 26.493 12.723"><defs><style>.a{fill:none;stroke:#030707;stroke-width:2px;}</style></defs><path class="a" d="M-965.567,1592h-24l11.507,11" transform="translate(992.06 -1591)"/></svg></button>';
  var sliderNextArrow = '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="26.493" height="12.723" viewBox="0 0 26.493 12.723"><defs><style>.a{fill:none;stroke:#030707;stroke-width:2px;}</style></defs><path class="a" d="M-989.567,1592h24l-11.507,11" transform="translate(989.567 -1591)"/></svg></button>';
  
  var caseSvg = '<svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">'+
  '<path d="M4.19984 13.2291H27.8665C28.4665 13.2291 28.9998 12.8363 29.1332 12.2472L31.3332 4.5228C30.9998 4.1955 30.5332 3.99912 29.9998 3.99912H22.5332L21.7998 1.05338C21.6665 0.660617 21.3332 0.333313 20.8665 0.333313H11.1332C10.6665 0.333313 10.3332 0.595156 10.1998 1.05338L9.4665 3.99912H1.99984C1.4665 3.99912 0.999837 4.1955 0.666504 4.5228L2.93317 12.3126C3.0665 12.8363 3.59984 13.2291 4.19984 13.2291ZM11.8665 2.16622H20.1332L20.5998 3.93366H11.3998L11.8665 2.16622Z" fill="#36597A"/>' +
  '<path d="M14.8 19.2515H17.2666C17.6666 19.2515 17.9333 18.9897 17.9333 18.5969V14.5383H14.1333V18.5969C14.1333 18.9897 14.4 19.2515 14.8 19.2515Z" fill="#36597A"/>' +
  '<path d="M30.4 12.6399C30.0667 13.7527 29 14.5383 27.8667 14.5383H19.2V18.5968C19.2 19.7097 18.3333 20.5607 17.2 20.5607H14.7333C13.6 20.5607 12.7333 19.7097 12.7333 18.5968V14.5383H4.2C3 14.5383 1.93333 13.7527 1.66667 12.6399L0 7.07574V23.7028C0 24.8156 0.866667 25.6666 2 25.6666H30C31.1333 25.6666 32 24.8156 32 23.7028V7.07574L30.4 12.6399Z" fill="#36597A"/>' +
  '</svg>';
  var bellSvg = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">'+
  '<path d="M4.02755 8.131C4.15482 7.54578 4.33024 6.975 4.55038 6.42229C4.50566 6.53789 4.45751 6.65349 4.41279 6.76909C4.73612 5.97073 5.15576 5.21572 5.65796 4.52573C5.58573 4.62327 5.51349 4.72081 5.44126 4.81835C5.95721 4.12113 6.55228 3.49617 7.21614 2.9543C7.12327 3.03016 7.03039 3.10602 6.93752 3.18189C7.14734 3.01571 7.3606 2.85676 7.58074 2.70504C7.88 2.50274 8.11733 2.21013 8.21365 1.84165C8.30308 1.49485 8.2618 1.03607 8.07606 0.729003C7.88688 0.421941 7.60482 0.147392 7.25397 0.0643048C6.90313 -0.0187825 6.50412 -0.00433254 6.19455 0.208805C5.28647 0.830153 4.44031 1.57794 3.74549 2.45216C3.36713 2.9254 3.0094 3.42392 2.70327 3.95135C2.38682 4.49322 2.13228 5.064 1.89838 5.65283C1.67824 6.20554 1.50282 6.77632 1.37555 7.36154C1.293 7.73724 1.3274 8.13823 1.51314 8.47419C1.68168 8.77403 2.00845 9.05941 2.33522 9.13889C2.68607 9.22197 3.08163 9.20391 3.39465 8.99439C3.68702 8.7957 3.945 8.49948 4.02755 8.131Z" fill="#36597A"/>' +
  '<path d="M24.4317 2.70184C24.6519 2.85357 24.8686 3.01252 25.0784 3.18231C24.9855 3.10644 24.8926 3.03058 24.7998 2.95472C25.4568 3.48937 26.0449 4.11072 26.554 4.80071C26.4818 4.70317 26.4095 4.60563 26.3373 4.50809C26.8464 5.20531 27.2695 5.96393 27.5962 6.77314C27.5515 6.65754 27.5034 6.54193 27.4587 6.42633C27.6788 6.97544 27.8508 7.5426 27.9746 8.12421C28.1328 8.86116 28.9824 9.36691 29.6669 9.1321C30.403 8.88284 30.7986 8.14589 30.6266 7.35475C30.1519 5.15835 29.0203 3.09561 27.4587 1.54945C26.953 1.04732 26.3958 0.599365 25.8145 0.198377C25.2091 -0.217061 24.2666 0.0502641 23.933 0.718577C23.5752 1.4483 23.7851 2.26112 24.4317 2.70184Z" fill="#36597A"/>'+
  '<path d="M29.8562 23.5495C29.8218 22.7656 29.2508 22.1081 28.4803 22.1081H26.4578V13.1022C26.4681 13.0444 26.4715 12.9866 26.4715 12.9252C26.4646 10.8191 25.8627 8.71663 24.7482 6.96457C23.6578 5.25586 22.1409 3.83977 20.3489 2.99806C19.3445 2.52843 18.3263 2.2286 17.2394 2.08048C16.2831 1.95043 15.3372 1.99017 14.3844 2.13467C12.7678 2.38032 11.1855 3.07031 9.87844 4.08542C8.51976 5.14026 7.3709 6.49495 6.62105 8.09528C5.91247 9.60531 5.53755 11.2562 5.53755 12.9396C5.53755 13.4996 5.54442 14.0595 5.54442 14.6194V22.1081H4.54003C4.21326 22.1081 3.88993 22.1009 3.56316 22.1045C3.5494 22.1045 3.53564 22.1009 3.52188 22.1009C2.80299 22.1009 2.11161 22.7692 2.14601 23.5495C2.1804 24.3334 2.75139 24.9981 3.52188 24.9981H27.4621C27.7889 24.9981 28.1122 24.9981 28.439 24.9945C28.4528 24.9945 28.4665 24.9945 28.4803 24.9945C29.2026 24.9945 29.8906 24.3298 29.8562 23.5495ZM15.8222 8.12057C15.6262 8.12057 15.4301 8.13141 15.2375 8.15308C14.8488 8.21811 14.4739 8.32648 14.1058 8.47821C13.8272 8.60826 13.5623 8.76359 13.3078 8.94061C13.239 8.98757 13.1702 9.04176 13.1014 9.09233C13.0877 9.10317 13.0739 9.11762 13.0602 9.12846C12.9329 9.24044 12.8091 9.35604 12.6887 9.48248C12.5648 9.61253 12.4479 9.74619 12.3344 9.88708C12.3206 9.90514 12.3069 9.91959 12.2965 9.93765C12.2553 10.0027 12.2105 10.0605 12.1693 10.1255C11.9973 10.3892 11.8494 10.671 11.7221 10.96C11.5845 11.3249 11.4848 11.7006 11.4229 12.0835C11.3919 12.3869 11.3919 12.6904 11.3919 12.9938V16.7508C11.3919 17.3577 10.9172 17.8093 10.36 17.8346C9.80276 17.8599 9.32809 17.318 9.32809 16.7508V12.8891C9.32809 11.8306 9.52759 10.8263 9.94723 9.8654C10.9791 7.49561 13.3628 5.96391 15.8222 5.95308C16.4001 5.94946 16.8301 6.4516 16.8541 7.03682C16.8817 7.62205 16.3623 8.11696 15.8222 8.12057Z" fill="#36597A"/>' +
  '<path d="M20.2147 27.6064C20.2112 27.5197 20.194 27.4438 20.1665 27.3643C20.0599 27.0573 19.7985 26.8405 19.4648 26.8405H12.6439C12.2415 26.8405 11.8906 27.2018 11.8941 27.628C11.9078 29.4776 13.0154 31.0924 14.6561 31.7427C16.2281 32.364 18.1406 31.8294 19.2137 30.4711C19.8398 29.6799 20.1975 28.7226 20.2181 27.6931C20.2181 27.6714 20.2181 27.6497 20.2181 27.628C20.2181 27.6208 20.2181 27.6136 20.2147 27.6064Z" fill="#36597A"/>' +
  '</svg>';
  var campSvg = '<svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M31.9997 19.5833C31.9997 19.5943 31.9942 19.6035 31.9933 19.6143C31.9867 19.6681 31.972 19.7207 31.9498 19.7702C31.9224 19.8172 31.8881 19.86 31.8479 19.897C31.8398 19.9039 31.8356 19.9136 31.8269 19.9198C31.8096 19.9302 31.7916 19.9393 31.7729 19.947C31.758 19.9558 31.7425 19.9636 31.7266 19.9705C31.6797 19.989 31.6298 19.999 31.5792 20H25.0543L20.0844 13.3366L23.4491 8.77521C23.4824 8.74774 23.5131 8.71739 23.541 8.6845C23.5464 8.68058 23.553 8.68013 23.5585 8.6765C23.583 8.66211 23.6089 8.6503 23.6358 8.64125C23.6599 8.63001 23.6849 8.62104 23.7107 8.61446C23.7637 8.61075 23.817 8.61091 23.87 8.61492C23.8933 8.62112 23.916 8.62927 23.9379 8.63929C23.9668 8.64872 23.9945 8.66129 24.0206 8.67679C24.0259 8.68025 24.0321 8.68067 24.0374 8.68442C24.0653 8.71728 24.096 8.74763 24.1293 8.77512L31.9188 19.3376C31.926 19.3511 31.9325 19.365 31.9381 19.3793C31.9679 19.4276 31.9858 19.4821 31.9906 19.5385C31.9945 19.5533 31.9975 19.5682 31.9997 19.5833ZM12.2076 4.17937L24.0077 20H0.422356C0.3446 20 0.268358 19.9787 0.202081 19.9385C0.135804 19.8982 0.0820824 19.8406 0.0468698 19.772C0.0116572 19.7034 -0.00367022 19.6265 0.00258598 19.5498C0.00884218 19.4731 0.0364376 19.3996 0.082314 19.3375L11.3681 4.03075V0.416667C11.3681 0.30616 11.4124 0.200179 11.4914 0.122039C11.5704 0.0438984 11.6775 0 11.7891 0H16.4207C16.4969 3.80273e-06 16.5717 0.0204755 16.6371 0.0592319C16.7025 0.0979883 16.756 0.153576 16.7919 0.220068C16.8279 0.28656 16.8449 0.361463 16.8413 0.43679C16.8376 0.512117 16.8133 0.585043 16.771 0.647792L16.0846 1.66667L16.7709 2.68554C16.8132 2.74828 16.8374 2.8212 16.8411 2.89651C16.8448 2.97183 16.8278 3.04672 16.7918 3.11321C16.7559 3.1797 16.7024 3.23529 16.637 3.27405C16.5717 3.31282 16.4969 3.33331 16.4207 3.33333H12.2102V4.16667C12.2102 4.17117 12.2077 4.175 12.2076 4.17937ZM15.2283 1.43554L15.6339 0.833333H12.2102V2.5H15.6339L15.2283 1.89779C15.1821 1.82937 15.1575 1.74894 15.1575 1.66667C15.1575 1.58439 15.1821 1.50397 15.2283 1.43554Z" fill="#36597A"/>'+
  '</svg>';
  var analysisSvg = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M4.08928 18.9393C4.86393 18.9393 5.60685 18.6373 6.15461 18.0997C6.70237 17.5621 7.0101 16.8329 7.0101 16.0726C7.01353 15.4518 6.8082 14.8472 6.42594 14.3525L10.2873 9.97784C10.8232 10.2821 11.4451 10.4081 12.06 10.3368C12.6749 10.2654 13.2498 10.0008 13.6988 9.58223L17.2038 12.0534C17.0372 12.416 16.9478 12.8081 16.9409 13.2058C16.9351 13.2917 16.9351 13.3779 16.9409 13.4638C17.4155 13.2261 17.9124 13.0341 18.4247 12.8905C19.14 12.7096 19.8767 12.6228 20.6153 12.6325H21.0301C21.6224 12.6563 22.2102 12.7448 22.7825 12.8962C22.72 12.2837 22.4554 11.7079 22.029 11.2564L26.2875 5.49422C26.8647 5.74146 27.5079 5.79896 28.1211 5.65816C28.7344 5.51736 29.2848 5.18579 29.6904 4.7129C30.0959 4.24001 30.3349 3.65112 30.3716 3.03405C30.4084 2.41698 30.241 1.80478 29.8943 1.28873C29.5476 0.77268 29.0403 0.380427 28.448 0.17046C27.8556 -0.0395077 27.21 -0.0559431 26.6074 0.123604C26.0048 0.303151 25.4774 0.669064 25.1039 1.16678C24.7305 1.6645 24.5309 2.26736 24.535 2.88547C24.5388 3.60222 24.816 4.29158 25.312 4.81767L21.0651 10.5913C20.6864 10.4255 20.2764 10.3395 19.8617 10.3391C19.1226 10.3385 18.4108 10.6131 17.8697 11.1073L14.3647 8.6362C14.5281 8.26941 14.6098 7.87258 14.6042 7.47229C14.6042 6.71198 14.2965 5.9828 13.7488 5.44518C13.201 4.90756 12.4581 4.60553 11.6834 4.60553C10.9088 4.60553 10.1658 4.90756 9.61809 5.44518C9.07033 5.9828 8.7626 6.71198 8.7626 7.47229C8.76753 8.09646 8.98325 8.70139 9.37597 9.19235L5.51464 13.567C5.07873 13.3292 4.58803 13.2048 4.08928 13.2058C3.31463 13.2058 2.57171 13.5078 2.02395 14.0455C1.47619 14.5831 1.16846 15.3123 1.16846 16.0726C1.16846 16.8329 1.47619 17.5621 2.02395 18.0997C2.57171 18.6373 3.31463 18.9393 4.08928 18.9393Z" fill="#36597A"/>' +
  '<path d="M25.7035 11.4857C25.5486 11.4857 25.4 11.5461 25.2905 11.6536C25.1809 11.7612 25.1194 11.907 25.1194 12.0591V13.9282C26.0465 14.5087 26.8474 15.2636 27.4758 16.1493C28.1042 17.0351 28.5477 18.0343 28.7807 19.0891C29.0137 20.144 29.0315 21.2337 28.8332 22.2954C28.635 23.357 28.2245 24.3697 27.6255 25.2749L28.2096 25.8482C28.762 25.8813 29.2823 26.1142 29.67 26.5018L30.3769 27.1956V12.0591C30.3769 11.907 30.3153 11.7612 30.2058 11.6536C30.0962 11.5461 29.9476 11.4857 29.7927 11.4857H25.7035Z" fill="#36597A"/>' +
  '<path d="M27.1052 30.4065L26.3984 29.7127C26.0075 29.3294 25.771 28.8203 25.7325 28.2793L25.1483 27.706V30.4065H22.7824V28.738C21.0437 29.2043 19.1974 29.0996 17.5249 28.4399V30.4065H15.1883V27.0466C13.6919 25.7952 12.6951 24.0644 12.3744 22.1608C12.0536 20.2572 12.4296 18.3036 13.4358 16.646H10.515C10.36 16.646 10.2114 16.7064 10.1019 16.8139C9.99234 16.9215 9.9308 17.0673 9.9308 17.2193V30.4065H7.59414V21.8062C7.59414 21.6541 7.53259 21.5083 7.42304 21.4007C7.31349 21.2932 7.16491 21.2328 7.00998 21.2328H2.92082C2.76589 21.2328 2.61731 21.2932 2.50776 21.4007C2.3982 21.5083 2.33666 21.6541 2.33666 21.8062V30.4065H0.584165C0.429235 30.4065 0.28065 30.4669 0.171098 30.5744C0.0615459 30.6819 0 30.8278 0 30.9798C0 31.1319 0.0615459 31.2777 0.171098 31.3852C0.28065 31.4928 0.429235 31.5532 0.584165 31.5532H28.2736L27.6894 30.9798L27.1052 30.4065Z" fill="#36597A"/>' +
  '<path d="M31.7959 30.2057L28.875 27.3389C28.7291 27.2005 28.5489 27.1018 28.3522 27.0525C28.1555 27.0032 27.9491 27.0051 27.7534 27.058C27.7296 27.0143 27.7002 26.9738 27.6658 26.9376L26.1178 25.4124C27.3212 24.0211 27.9297 22.2269 27.8161 20.4053C27.7025 18.5836 26.8755 16.8757 25.5082 15.6389C24.1408 14.402 22.3391 13.7321 20.48 13.7693C18.6209 13.8065 16.8486 14.5479 15.5337 15.8384C14.2189 17.1289 13.4635 18.8685 13.4256 20.6932C13.3877 22.5179 14.0702 24.2862 15.3304 25.6283C16.5906 26.9703 18.3307 27.782 20.1867 27.8935C22.0427 28.005 23.8707 27.4077 25.2883 26.2266L26.8421 27.746C26.8791 27.7797 26.9203 27.8086 26.9648 27.832C26.911 28.0241 26.9091 28.2266 26.9593 28.4196C27.0095 28.6127 27.11 28.7895 27.2511 28.9328L30.1719 31.7996C30.3968 31.9506 30.6684 32.0198 30.9397 31.995C31.2111 31.9703 31.4651 31.8532 31.6578 31.6641C31.8505 31.4749 31.9698 31.2256 31.995 30.9593C32.0202 30.693 31.9497 30.4264 31.7959 30.2057Z" fill="#36597A"/>' +
  '</svg>';
  var suiteSvg = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M15.2934 16.0289L11.7751 1.20837L11.2065 2.48784L4.63208 5.04678L4.95192 5.57989C5.80482 6.96598 6.51558 8.45869 7.0131 10.0225C7.61724 11.8351 7.97262 13.7543 8.0437 15.6735V15.709L7.11972 29.4278V31.2759C7.11972 31.6668 7.43956 31.9867 7.83047 31.9867H15.2934V16.0289Z" fill="#36597A"/>' +
  '<path d="M7.19071 15.6735C7.0841 13.861 6.76426 12.0484 6.19566 10.3069C5.69813 8.81417 5.05845 7.39254 4.20555 6.04199L3.92124 5.57996C3.92124 5.6155 3.88571 5.65104 3.88571 5.72212L0.0121017 30.1742C-0.0589737 30.5296 0.18979 30.885 0.580704 30.9916L5.12953 31.9512C5.30721 31.9868 5.52044 31.9512 5.69813 31.8446C5.87582 31.738 5.98243 31.5603 5.98243 31.3826L6.16012 30.1031L7.19071 15.6735Z" fill="#36597A"/>' +
  '<path d="M15.9327 12.8658L18.9889 0H12.9475L13.0541 0.568652L15.9327 12.8658Z" fill="#36597A"/>' +
  '<path d="M31.9965 30.1386L28.1229 5.61541C28.1229 5.57987 28.0874 5.54433 28.0874 5.50879L27.732 6.0419C26.9146 7.39245 26.2394 8.81408 25.7419 10.3068C25.1733 12.0483 24.8534 13.8609 24.7468 15.6735L25.7419 29.4988L26.0262 31.3825C26.0617 31.5602 26.1683 31.7379 26.3105 31.88C26.4882 31.9867 26.6659 32.0222 26.8791 31.9867L31.4279 30.9204C31.8188 30.8494 32.032 30.494 31.9965 30.1386Z" fill="#36597A"/>' +
  '<path d="M23.8935 15.709V15.6735C23.9645 13.7543 24.3199 11.8706 24.924 10.0225C25.4216 8.45869 26.1323 6.96598 26.9852 5.57989L27.3761 4.9757L20.8017 2.48784L20.2331 1.20837L16.7148 16.0644V31.9867H24.1778C24.5687 31.9867 24.8885 31.6668 24.8885 31.2759V29.9964L23.8935 15.709ZM23.1116 11.0176H19.2025C18.9182 11.0176 18.6694 10.7688 18.6694 10.4845C18.6694 10.2002 18.9182 9.95141 19.2025 9.95141H23.1116C23.3959 9.95141 23.6447 10.2002 23.6447 10.4845C23.6447 10.7688 23.3959 11.0176 23.1116 11.0176Z" fill="#36597A"/>' +
  '</svg>'

  function slider_button_html(text, svgImage) {
    return '<p>'+
      text+
    '</p>'+
    '<div class="outer">'+
      '<div class="inner">'+
      svgImage +
      '</div>'+
    '</div>'
  }

  $('.slider-section .slider').slick({
    dots: true,
    infinite: false,
    fade: true,
    slidesToShow: 1,
    adaptiveHeight: false,
    arrows: false,
    appendDots: $('.slider-section .dots'),
    customPaging : function(slider, i) {
      var thumb = $(slider.$slides[i]).data();

      if (i === 0) {
        return slider_button_html('Equity management', caseSvg)
      }
      if (i === 1) {
        return slider_button_html('Risk assessment', bellSvg)
      }
      if (i === 2) {
        return slider_button_html('Goal Setting', campSvg)
      }
      if (i === 3) {
        return slider_button_html('Analysis and Performance', analysisSvg)
      }
      if (i === 4) {
        return slider_button_html('Built for you', suiteSvg)
      }
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          dots: true,
        }
      },
      {
        breakpoint: 530,
        settings: {
          adaptiveHeight: true,
        }
      },
    ]
  });

  // inputRequireValidation
  function inputRequireValidation(inputWrapSelector) {
    if ($(inputWrapSelector).find('input').val().length > 0) {
      $(inputWrapSelector).addClass('valid');
      if ($(inputWrapSelector).hasClass('is-required')) {
        $(inputWrapSelector).removeClass('is-required');
        $(inputWrapSelector).addClass('valid');
        if ($(inputWrapSelector + ' .required-msg')) {
          $(inputWrapSelector + ' .required-msg').remove();
        }
      }
    } else {
      $(inputWrapSelector).addClass('is-required');
      if (document.querySelector(inputWrapSelector + ' .required-msg')) {
        return;
      } else {
        $(inputWrapSelector).append('<div class="required-msg">This field is required</div>');
      }
      if ($(inputWrapSelector).hasClass('valid')) {
        $(inputWrapSelector).removeClass('valid');
      }
    }
  }

  // emailValidation
  var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,10})$/;
  function emailValidation(emailWrapperSelector) {
    // is required validation
    if ($(emailWrapperSelector + ' input').val().length > 0) {
      $(emailWrapperSelector).addClass('valid');
      if ($(emailWrapperSelector).hasClass('is-required')) {
        $(emailWrapperSelector).removeClass('is-required');
        $(emailWrapperSelector).addClass('valid');
        if ($(emailWrapperSelector + ' .required-msg')) {
          $(emailWrapperSelector + ' .required-msg').remove();
        }
      }
      // email regexp validation
      if (regEmail.test($(emailWrapperSelector + ' input').val()) === false) {
        $(emailWrapperSelector).addClass('is-required');
        if ($(emailWrapperSelector).hasClass('valid')) {
          $(emailWrapperSelector).removeClass('valid');
        }
        if ($(emailWrapperSelector + ' .required-msg')) {
          $(emailWrapperSelector + ' .required-msg').remove();
        }
        $(emailWrapperSelector + ' .required-msg').remove();

        if (document.querySelector(emailWrapperSelector + ' .email-err-msg')) {
          return;
        } else {
          $(emailWrapperSelector).append('<div class="email-err-msg">Enter valid email</div>');
          $(emailWrapperSelector).addClass('is-required');
        }
      } else {
        if ($(emailWrapperSelector + ' .email-err-msg')) {
          $(emailWrapperSelector + ' .email-err-msg').remove();
        }
      }
      // end email regexp validation
    } else {
      $(emailWrapperSelector).addClass('is-required');
      if ($(emailWrapperSelector + ' .email-err-msg')) {
        $(emailWrapperSelector + ' .email-err-msg').remove();
      }
      if (document.querySelector(emailWrapperSelector + ' .required-msg')) {
        return;
      } else {
        $(emailWrapperSelector).append('<div class="required-msg">This field is required</div>');
      }
      if ($(emailWrapperSelector).hasClass('valid')) {
        $(emailWrapperSelector).removeClass('valid');
      }
    }
  }

  // init validation


  // download booklet block - open popup
  $('#download_booklet_popup').click(function() {
    $('.popup.download-form').removeClass('hidden');
    $('.popup.download-form .wrap').removeClass('hidden-popup');
      
    $('body').addClass('overflow-hidden');
    setTimeout(function() {
      $('.popup.download-form .wrap').addClass('opened-popup');
    }, 50)
  })

  // close popup
  function closePopup(elem) {
    $('body').removeClass('overflow-hidden');
    $($(elem).closest('.popup .wrap')).removeClass('opened-popup');
    $($(elem).closest('.popup .wrap')).addClass('hidden-popup');

    setTimeout(function() {
      $($(elem).closest('.popup')).addClass('hidden');
    }, 300)
  }

  $('.close').click(function() {
    var elem = this;
    closePopup(elem);
  })
  
  // download booklet popup
  $('#download_booklet').click(function(e) {
    e.preventDefault();

    inputRequireValidation('.popup.download-form .name');
    emailValidation('.popup.download-form .email');

    // if form is valid
    if (!$('.popup.download-form .name').hasClass('is-required') &&
    !$('.popup.download-form .email').hasClass('is-required')) {

      // hide download booklet popup
      var elem = this;
      $($(elem).closest('.popup .wrap')).removeClass('opened-popup');
      $($(elem).closest('.popup .wrap')).addClass('hidden-popup');
  
      setTimeout(function() {
        $($(elem).closest('.popup')).addClass('hidden');
      }, 300)

      // open Thank you! popup
      $('.popup.thank-you').removeClass('hidden');
      $('.popup.thank-you .wrap').removeClass('hidden-popup');
      
      setTimeout(function() {
        $('.popup.thank-you .wrap').addClass('opened-popup');
      }, 50)

      // start download
      downloadFile('Odore_Sanitizer.pdf');
      
      // pushState
      var state = { 'email': $('.popup.download-form .email input').val(), name: $('.popup.download-form .name input').val()};
      var url = 'https://finalyze.syntech.info/registration';

      history.pushState(state, url);
    }
  })

  $('.popup.download-form .name').keyup(function() {
    inputRequireValidation('.popup.download-form .name');
  })

  $('.popup.download-form .email').keyup(function() {
    emailValidation('.popup.download-form .email');
  })
  
  $('#skip_start').click(function() {
    var elem = this;
    closePopup(elem);
  })
  
  // show-alert-cookie
  if (localStorage.getItem('cookie_displayed') !== 'true') {
    $('body').append('<div class="cookie-msg">' +
      '<p>' +
        'This website uses cookies. By accepting cookies you can optimise your browsing experience.' +
      '</p>' +
      '<button class="btn-orange" id="show-alert-cookie" onClick="removeCookiesMsg()">Accept cookies</button>' +
    '</div>'
    )
  }

  // top signup - push state
  $('#signup').click(function(e) {
    e.preventDefault();

    emailValidation('header form .email');

    if (!$('header form .email').hasClass('is-required')) {
      var state = { 'email': $('header form .email input').val()};
      var url = 'https://finalyze.syntech.info/registration';

      history.pushState(state, url);
      window.open(url,'_blank');
    }
    
  })
  
  // menu open
  $('header .menu-icon').click(function() {
    $('header .menu').addClass('open-menu');
  })

  // menu close
  $('header .menu ,close').click(function() {
    $('header .menu').removeClass('open-menu');
  })
  

  // end document ready
});

window.downloadFile = function(sUrl) {
  //If in Chrome or Safari - download via virtual link click
  if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
      //Creating new link node.
      var link = document.createElement('a');
      link.href = sUrl;

      if (link.download !== undefined){
          //Set HTML5 download attribute. This will prevent file from opening if supported.
          var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
          link.download = fileName;
      }

      //Dispatching click event.
      if (document.createEvent) {
          var e = document.createEvent('MouseEvents');
          e.initEvent('click' ,true ,true);
          link.dispatchEvent(e);
          return true;
      }
  }

  // Force file download (whether supported by server).
  var query = '?download';

  window.open(sUrl + query);
}

window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') ; -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') ; -1;

// show-alert-cookie
function removeCookiesMsg() {
  $('.cookie-msg').remove();
  
  localStorage.setItem('cookie_displayed', true);
}