$(function () {

  function buildHTML(message) {
    if (message.image) {
      var html =
        `<div class='comment_box_inner'>
            <div class="comment_box_detail" data-message-id=${message.id}>
              <p class="name">
                ${message.user_name}
              </p>
              <span class="date">
                ${message.created_at}
              </span>
              <div class="comment_text">
                <p class="text">
                <p class="lower-message__content">
                  ${message.content}
                </p>
                <img src=${message.image}>
                </p>
              </div>
            </div>
          </div>`
      return html;
    } else {
      var html =
        `<div class="comment_box_inner">
            <div class="comment_box_detail" data-message-id=${message.id}>
              <p class="name">
                ${message.user_name}
              </p>
              <span class="date">
                ${message.created_at}
              </span>
              <div class="comment_text">
                <p class='text'>
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                </p>
              </div>
            </div>
          </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        var html = buildHTML(data);
        $('.comment_box').append(html);
        $('.comment_box').animate({ scrollTop: $('.comment_box')[0].scrollHeight });
        $('form')[0].reset();
        $('.btn_send').prop("disabled", false);
      })
      .fail(function () {
        alert("メッセージ送信に失敗しました");
      });
  })

  var reloadMessages = function () {
    var last_message_id = $('.comment_box_detail:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })
      .done(function (messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function (i, message) {
            insertHTML += buildHTML(message)
          });
          $('.comment_box').append(insertHTML);
          $('.comment_box').animate({ scrollTop: $('.comment_box')[0].scrollHeight });
        }
      })
      .fail(function () {
        alert('error');
      });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }

});