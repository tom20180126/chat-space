$(function(){
  function buildHTML(message){
    if (message.image) {
      let html = 
        `<div class="MainChat__Messages__message">
          <div class="MainChat__Messages__message__info">
            <div class="MainChat__Messages__message__info--User">
              ${message.user_name}
            </div>
            <div class="MainChat__Messages__message__info--Time">
              ${message.created_at}
            </div>
          </div>
          <div class="Messages">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="input-box__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="MainChat__Messages__message">
            <div class="MainChat__Messages__message__info">
              <div class="MainChat__Messages__message__info--User">
                ${message.user_name}
              </div>
              <div class="MainChat__Messages__message__info--Time">
                ${message.created_at}
              </div>
            </div>
            <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
            </div>
          </div>`
          return html;
    };
  }
  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MainChat__Messages').append(html);
      $('form')[0].reset();
      $('.MainChat__Messages').animate({ scrollTop: $('.MainChat__Messages')[0].scrollHeight});
      $('.submit-btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});